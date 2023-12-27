import React from "react";
import AuthComponent from "@/components/AuthComponent";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {};

export default async function AuthPage({}: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    return redirect("/");
  }

  if (data) {
    // console.log(data);
  }

  return <AuthComponent />;
}
