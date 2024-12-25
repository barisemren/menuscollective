import { createClient } from "@/utils/supabase/server";
import { Utensils } from "lucide-react";
import { redirect } from "next/navigation";

import { SignUpForm } from "@/components/signup-form";
import Image from "next/image";
import Link from "next/link";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/explore");
  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href={"/"} className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-mc-primary text-mc-primary-foreground">
              <Utensils className="size-4" />
            </div>
            MenusCollective
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-mc-muted lg:flex items-center justify-center">
        <Image src="/map.svg" alt="Image" width={500} height={500} priority />
      </div>
    </div>
  );
}
