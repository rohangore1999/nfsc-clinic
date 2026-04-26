# Apps Script Setup — Patient Inquiry Handler

Step-by-step guide to wire `/api/contact` to a real Google Apps Script backend that logs to a Sheet and emails the clinic.

Estimated time: **30 minutes**.

---

## 1. Create the Google Sheet

1. Go to [sheets.new](https://sheets.new) — creates a fresh spreadsheet.
2. Rename the file to **NFSC Inquiries** (or whatever you prefer).
3. Rename the first tab from "Sheet1" to **`Inquiries`** (must match `SHEET_NAME` in the script).
4. In **row 1**, add these column headers:

   | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|
   | Timestamp | Name | Phone | Email | Treatment | Message | Source |

5. Optional polish: freeze row 1 (View → Freeze → 1 row), bold the headers.

## 2. Open Apps Script

1. From the spreadsheet: **Extensions → Apps Script**.
2. A new editor tab opens with `Code.gs` containing a default `function myFunction() {}`.
3. Delete everything in `Code.gs`.
4. Open `apps-script/contact-handler.gs` in this repo, copy the entire file, paste it into `Code.gs`.
5. Update the **CONFIG** block at the top:
   - `NOTIFY_EMAILS` — array of email addresses that get notified. Already pre-populated with `nikhilangre597@gmail.com`. Add more entries to notify multiple inboxes for every submission:
     ```js
     const NOTIFY_EMAILS = [
       'nikhilangre597@gmail.com',
       'reception@nfsc.com',
       'admin@nfsc.com',
     ];
     ```
   - `NOTIFY_CC` / `NOTIFY_BCC` — optional carbon-copy or blind-copy recipients. Useful for forwarding copies without putting everyone in the main To: line.
   - `LOGO_DRIVE_ID` / `LOGO_URL` — optional logo image in the email header. See the [Logo setup](#logo-in-email-header) section below.
6. Save (`Cmd/Ctrl + S`). Name the project something memorable like "NFSC Contact Handler".

## 3. Deploy as a Web App

1. Click **Deploy → New deployment** (top-right).
2. Click the gear ⚙️ next to "Select type" → choose **Web app**.
3. Fill the form:
   - **Description**: "NFSC contact form v1"
   - **Execute as**: **Me** (`<your email>`)
   - **Who has access**: **Anyone**
4. Click **Deploy**.
5. **Authorize**: Google will ask for permission to send email and edit your sheet on your behalf. Click "Authorize access" → choose your account → "Advanced" → "Go to NFSC Contact Handler (unsafe)" → "Allow". (The "unsafe" warning is normal for personal Apps Scripts; it's your code running in your account.)
6. After deployment, copy the **Web app URL** — looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

## 4. Wire the URL into Next.js

### Local development

Create a file named `.env.local` at the project root (NOT `.env`):

```bash
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Restart `npm run dev`. The form now sends real submissions.

### Vercel production

1. Vercel dashboard → your project → **Settings → Environment Variables**.
2. Add:
   - **Name**: `APPS_SCRIPT_URL`
   - **Value**: paste the web-app URL
   - **Environments**: Production, Preview, Development
3. Redeploy (Deployments → ⋯ → Redeploy).

## 5. Test it

1. Open the home page locally (`npm run dev`).
2. Scroll to "Begin Your Aesthetic Journey".
3. Fill the form with test data → submit.
4. Within ~5 seconds you should see:
   - A new row in the Sheet
   - An email at `NOTIFY_EMAIL` with the inquiry details
   - The form switches to the "Thank you" success state

If nothing happens:
- Open browser DevTools → Network → click the `contact` request → check the Response.
- In Apps Script editor: **Executions** (left sidebar, clock icon) shows recent runs and any errors.

---

## Logo in email header

Optional but recommended — adds the circular NFSC medallion above the wordmark in every notification email. Two ways to wire it:

### Option A — Google Drive file (recommended; works immediately)

1. Open [Google Drive](https://drive.google.com/) (signed into the same account that owns the script).
2. Drag `nfsc-logo.jpg` (from `public/images/` in this repo) into Drive — anywhere works.
3. Click the file → **⋮ menu → Share → Copy link**. The link looks like:
   ```
   https://drive.google.com/file/d/1AbCdEf123XYZ.../view?usp=sharing
   ```
4. Copy the **file ID** — the part between `/d/` and `/view`. From the example above, that's `1AbCdEf123XYZ...`.
5. In `Code.gs`, paste it into:
   ```js
   const LOGO_DRIVE_ID = '1AbCdEf123XYZ...';
   ```
6. Save → redeploy (Manage deployments → ✏️ → New version → Deploy).

That's it. The next email includes the logo as an inline attachment — renders inline even without "Show images" being clicked.

### Option B — Public URL (after the site is deployed)

If the website is live on a public domain, just point at the hosted image:

```js
const LOGO_URL = 'https://drnikhilnfsc.com/images/nfsc-logo.jpg';
```

Apps Script fetches the image and inlines it. If both options are set, Drive takes precedence.

### Option C — Skip

Leave both empty. The email header shows just the gold "NFSC" wordmark — also looks clean.

---

## Updating the script later

After any code change in `Code.gs`:
1. Save (`Cmd/Ctrl + S`).
2. **Deploy → Manage deployments → ✏️ edit (pencil icon) → Version: New version → Deploy**.
3. The web-app URL stays the same — no env-var update needed.

If you create a fresh deployment (not "Manage"), you get a new URL — would need to update `APPS_SCRIPT_URL` everywhere.

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Form shows "Network error" | `APPS_SCRIPT_URL` not set, or wrong URL |
| Form shows "Submission failed" | Apps Script threw an error — check Executions panel |
| Sheet doesn't update | Sheet tab name doesn't match `SHEET_NAME` in the script |
| Email doesn't arrive | Check Gmail spam; or typo in `NOTIFY_EMAILS` array |
| 403/Authorization error | Re-deploy and re-authorize from Apps Script editor |
