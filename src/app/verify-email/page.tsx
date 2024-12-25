import { Utensils } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4">
      <div className="flex justify-center gap-2 mb-8">
        <Link href={"/"} className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-mc-primary text-mc-primary-foreground">
            <Utensils className="size-4" />
          </div>
          MenusCollective
        </Link>
      </div>
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-muted-foreground">
          We&apos;ve sent you a verification link to your email address. Please
          check your inbox and click the link to verify your account.
        </p>
        <p className="text-sm text-muted-foreground">
          After verifying your email, you can{" "}
          <Link href="/login" className="text-mc-primary hover:underline">
            log in to your account
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
