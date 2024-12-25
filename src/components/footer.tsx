import { Utensils } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-mc-primary text-mc-primary-foreground">
              <Utensils className="size-4" />
            </div>
            <span className="font-medium">MenusCollective</span>
          </Link>

          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MenusCollective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
