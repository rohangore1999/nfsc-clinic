/**
 * NFSC — Patient Inquiry Handler
 *
 * Deploy this as a Google Apps Script Web App. It receives POSTs from
 * the Next.js /api/contact route and:
 *   1. Appends the inquiry as a new row in the inquiry sheet
 *   2. Sends a branded Gmail notification with one-tap actions
 *      (Call / WhatsApp / Email)
 *
 * Setup instructions: see apps-script/README.md
 */

// ── CONFIG — fill these in before deploying ────────────────────────────────

/** Sheet tab name where rows get appended. The sheet must exist. */
const SHEET_NAME = 'Inquiries';

/**
 * Primary inquiry-notification recipients (To: line).
 * Add or remove email addresses freely — all are notified for every submission.
 */
const NOTIFY_EMAILS = [
  'nikhilangre597@gmail.com',
  // 'reception@nfsc.com',
  // 'admin@nfsc.com',
];

/**
 * Optional CC (visible) and BCC (hidden) recipients.
 * Useful for forwarding copies to staff, archive inboxes, or assistants
 * without putting them in the main To: line. Leave empty to skip.
 */
const NOTIFY_CC = [];
const NOTIFY_BCC = [];

/**
 * Logo for the email header. Pick ONE option (Drive takes precedence):
 *
 *   - LOGO_DRIVE_ID: Google Drive file ID for nfsc-logo.jpg. Most reliable;
 *     works before the public website is deployed.
 *     How to get it: upload the logo to your Drive → right-click → "Open in
 *     new tab" → grab the long ID from the URL between /d/ and /view.
 *
 *   - LOGO_URL: Direct URL to the hosted logo image. Use once the site is
 *     deployed (e.g. https://drnikhilnfsc.com/images/nfsc-logo.jpg).
 *
 * Leave both empty to skip the logo and only show the "NFSC" wordmark.
 */
const LOGO_DRIVE_ID = '1-kW7c05tVPzI0Ib5B39j2zMLQSbEW9ge';
const LOGO_URL = '';

// ── BRAND — adjust if visual identity changes ──────────────────────────────

const BRAND = {
  name: 'NFSC',
  navy: '#1A1A2E',
  gold: '#C9A04F',
  goldAccent: '#C9A04F',
  surfaceAlt: '#F9F9F9',
  hairline: '#F0F0F0',
  textDark: '#1A1A2E',
  textMuted: '#999999',
  textBody: '#333333',
};

// ───────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    appendToSheet(data);
    sendEmail(data);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    console.error('contact-handler error:', err);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function appendToSheet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(
      'Sheet "' + SHEET_NAME + '" not found. Create it with headers: ' +
      'Timestamp | Name | Phone | Email | Treatment | Message | Source'
    );
  }
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.treatment || '',
    data.message || '',
    data.source || 'website',
  ]);
}

function sendEmail(data) {
  if (!NOTIFY_EMAILS.length) {
    throw new Error('No NOTIFY_EMAILS configured — at least one is required.');
  }

  const timestamp = Utilities.formatDate(
    new Date(),
    'Asia/Kolkata',
    'd MMM yyyy, h:mm a'
  );
  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();

  const treatment = data.treatment || 'Consultation';
  const name = data.name || 'Unknown';

  const subject = '🔔 [' + treatment + '] New inquiry: ' + name;

  // Try to load the logo blob; if anything fails we silently fall back to
  // the wordmark-only header. We never let a missing logo break submission.
  const logoBlob = getLogoBlob();

  const options = {
    to: NOTIFY_EMAILS.join(','),
    subject: subject,
    // Plain-text fallback for clients that don't render HTML.
    body: buildTextBody(data, timestamp),
    // Branded HTML version with action buttons.
    htmlBody: buildHtmlBody(data, timestamp, sheetUrl, !!logoBlob),
  };
  if (NOTIFY_CC.length) options.cc = NOTIFY_CC.join(',');
  if (NOTIFY_BCC.length) options.bcc = NOTIFY_BCC.join(',');
  if (logoBlob) {
    // Inline attachment referenced via <img src="cid:logo"> in the HTML.
    options.inlineImages = { logo: logoBlob };
  }

  MailApp.sendEmail(options);
}

/**
 * Returns a Blob of the logo image, or null if neither source is configured
 * or both fail. Preference order: Drive file → public URL.
 */
function getLogoBlob() {
  if (LOGO_DRIVE_ID) {
    try {
      return DriveApp.getFileById(LOGO_DRIVE_ID)
        .getBlob()
        .setName('nfsc-logo');
    } catch (err) {
      console.warn('LOGO_DRIVE_ID load failed:', err);
    }
  }
  if (LOGO_URL) {
    try {
      const res = UrlFetchApp.fetch(LOGO_URL, { muteHttpExceptions: true });
      if (res.getResponseCode() === 200) {
        return res.getBlob().setName('nfsc-logo');
      }
      console.warn('LOGO_URL HTTP', res.getResponseCode());
    } catch (err) {
      console.warn('LOGO_URL fetch failed:', err);
    }
  }
  return null;
}

// ── EMAIL BODY BUILDERS ────────────────────────────────────────────────────

function buildTextBody(data, timestamp) {
  const lines = [
    'New consultation request from the NFSC website.',
    '',
    'Name:      ' + (data.name || ''),
    'Phone:     ' + (data.phone || ''),
    'Treatment: ' + (data.treatment || ''),
  ];
  if (data.email) lines.push('Email:     ' + data.email);
  if (data.message) {
    lines.push('');
    lines.push('Message:');
    lines.push(data.message);
  }
  lines.push('');
  lines.push('Received: ' + timestamp);
  return lines.join('\n');
}

function buildHtmlBody(data, timestamp, sheetUrl, hasLogo) {
  const name = escapeHtml(data.name || 'Unknown');
  const phoneRaw = data.phone || '';
  const phoneDisplay = escapeHtml(phoneRaw);
  const phoneTel = phoneRaw.replace(/[^\d+]/g, '');
  const phoneWa = phoneRaw.replace(/[^\d]/g, '');
  const email = escapeHtml(data.email || '');
  const treatment = escapeHtml(data.treatment || 'Consultation');
  const messageHtml = data.message
    ? escapeHtml(data.message).replace(/\n/g, '<br>')
    : '';

  // Circular gold-bordered logo badge. cid:logo references the inlineImages
  // attachment passed by sendEmail. Empty string when no logo is configured.
  const logoImg = hasLogo
    ? '<img src="cid:logo" alt="" width="56" height="56" style="display:block;margin:0 auto 14px auto;width:56px;height:56px;border-radius:50%;background:#fff;border:2px solid ' + BRAND.gold + ';" />'
    : '';

  const waMessage = encodeURIComponent(
    'Hi ' + (data.name || '') +
    ', this is from NFSC regarding your inquiry about ' +
    (data.treatment || 'a consultation') + '.'
  );

  const cellPad = 'padding:0 24px;';
  const cardSide = 'border-left:1px solid ' + BRAND.hairline + ';border-right:1px solid ' + BRAND.hairline + ';';

  const messageBlock = messageHtml
    ? (
        '<tr><td style="background:#fff;padding:0 24px 24px 24px;' + cardSide + '">' +
        '<div style="background:' + BRAND.surfaceAlt + ';border-left:3px solid ' + BRAND.gold + ';border-radius:4px;padding:14px 16px;">' +
        '<div style="color:' + BRAND.textMuted + ';font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Message</div>' +
        '<div style="color:' + BRAND.textBody + ';font-size:14px;line-height:1.6;margin-top:6px;">' + messageHtml + '</div>' +
        '</div></td></tr>'
      )
    : '';

  const emailRow = email
    ? (
        '<tr><td style="padding:14px 0;border-top:1px solid ' + BRAND.hairline + ';">' +
        '<div style="color:' + BRAND.textMuted + ';font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Email</div>' +
        '<a href="mailto:' + email + '" style="color:' + BRAND.textDark + ';font-size:15px;text-decoration:none;display:inline-block;margin-top:4px;">' + email + '</a>' +
        '</td></tr>'
      )
    : '';

  const emailButton = email
    ? (
        '<td style="padding:0 4px;">' +
        '<a href="mailto:' + email + '" style="display:inline-block;padding:12px 22px;background:transparent;color:' + BRAND.textDark + ';border:1px solid #E0E0E0;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;">✉️ Email</a>' +
        '</td>'
      )
    : '';

  return [
    '<!DOCTYPE html>',
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>',
    '<body style="margin:0;padding:0;background:' + BRAND.surfaceAlt + ';font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:' + BRAND.textBody + ';">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + BRAND.surfaceAlt + ';padding:24px 12px;">',
    '<tr><td align="center">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">',

    // ── Header ─────────────
    '<tr><td style="background:' + BRAND.navy + ';padding:28px 24px;text-align:center;border-radius:8px 8px 0 0;">',
    logoImg,
    '<div style="color:' + BRAND.gold + ';font-size:22px;font-weight:700;letter-spacing:0.18em;">' + BRAND.name + '</div>',
    '<div style="color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin-top:6px;">New Patient Inquiry</div>',
    '</td></tr>',

    // ── Patient + treatment ─────────────
    '<tr><td style="background:#fff;padding:32px 24px 18px 24px;' + cardSide + '">',
    '<div style="color:' + BRAND.textMuted + ';font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Patient</div>',
    '<div style="color:' + BRAND.textDark + ';font-size:26px;font-weight:600;margin-top:4px;">' + name + '</div>',
    '<div style="color:' + BRAND.gold + ';font-size:13px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;margin-top:8px;">' + treatment + '</div>',
    '</td></tr>',

    // ── Contact info ─────────────
    '<tr><td style="background:#fff;' + cellPad + 'padding-bottom:24px;' + cardSide + '">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">',
    '<tr><td style="padding:14px 0;border-top:1px solid ' + BRAND.hairline + ';">',
    '<div style="color:' + BRAND.textMuted + ';font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Phone</div>',
    '<a href="tel:' + phoneTel + '" style="color:' + BRAND.textDark + ';font-size:18px;font-weight:600;text-decoration:none;display:inline-block;margin-top:4px;">' + phoneDisplay + '</a>',
    '</td></tr>',
    emailRow,
    '</table></td></tr>',

    // ── Message (optional) ─────────────
    messageBlock,

    // ── Action buttons ─────────────
    '<tr><td style="background:#fff;padding:8px 24px 28px 24px;' + cardSide + 'text-align:center;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>',
    '<td style="padding:0 4px;">',
    '<a href="tel:' + phoneTel + '" style="display:inline-block;padding:12px 22px;background:' + BRAND.gold + ';color:#fff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;">📞 Call</a>',
    '</td>',
    '<td style="padding:0 4px;">',
    '<a href="https://wa.me/' + phoneWa + '?text=' + waMessage + '" style="display:inline-block;padding:12px 22px;background:#25D366;color:#fff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;">💬 WhatsApp</a>',
    '</td>',
    emailButton,
    '</tr></table></td></tr>',

    // ── Footer ─────────────
    '<tr><td style="background:#fff;padding:16px 24px;border:1px solid ' + BRAND.hairline + ';border-top:none;border-radius:0 0 8px 8px;text-align:center;">',
    '<div style="color:' + BRAND.textMuted + ';font-size:11px;">Received ' + escapeHtml(timestamp) + '</div>',
    '<div style="color:' + BRAND.textMuted + ';font-size:11px;margin-top:6px;">View full record on <a href="' + sheetUrl + '" style="color:' + BRAND.gold + ';text-decoration:none;">Google Sheet</a></div>',
    '</td></tr>',

    '</table></td></tr></table></body></html>',
  ].join('');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── TEST HELPERS ───────────────────────────────────────────────────────────

// Lets you test from the Apps Script editor (Run → testDoPost).
function testDoPost() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test Patient',
        phone: '+91 9876543210',
        email: 'test@example.com',
        treatment: 'Rhinoplasty',
        message: 'Hi, I would like to learn more about the procedure timeline and recovery. Please share details.',
        source: 'apps-script-test',
      }),
    },
  });
}
