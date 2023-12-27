"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthComponent() {
  const supabase = createClientComponentClient();

  const handleGithubSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="py-8">
      <div className="container mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold">
          Get your timekeeping journey started!
        </h2>
        <Button onClick={handleGithubSignIn}> Sign In With Google</Button>
      </div>
    </div>
  );
}
