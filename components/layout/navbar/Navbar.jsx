import { Logo } from "@/components/layout/Logo";
import { BookButton } from "@/components/cta/BookButton";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/**
 * Site navbar — sticky, glassmorphism, hairline border.
 * Composition:
 *   [ Logo ] ← justify-between → [ DesktopNav ] [ BookButton (md+) ] [ MobileNav (sm) ]
 *
 * Mostly server-rendered. `DesktopNav` and `MobileNav` are the client islands
 * that need pathname / open state.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 md:px-8">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <BookButton />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
