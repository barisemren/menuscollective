"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signInData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error?.message === "Email not confirmed") {
    redirect("/verify-email");
  }

  if (error) {
    redirect("/error");
  }

  if (!signInData.user?.email_confirmed_at) {
    // Sign out the user if they're not verified
    await supabase.auth.signOut();
    redirect("/verify-email");
  }

  revalidatePath("/", "layout");
  redirect("/explore");
}
