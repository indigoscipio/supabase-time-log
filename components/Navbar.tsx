"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { usePathname } from "@/node_modules/next/navigation";

const Navbar = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const path = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isAuthPage = path === "/auth";

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">LOGO</h1>
        {isAuthPage ? (
          <Link href="/auth">
            <Button className="bg-neutral-700">Sign In</Button>
          </Link>
        ) : (
          <Button onClick={handleSignOut} className="bg-neutral-700">
            Sign Out
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
