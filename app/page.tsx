import CreateLog from "@/components/CreateLog";
import LogCalendar from "@/components/LogCalendar";
import LogTable from "@/components/LogTable";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import InitLog from "@/state/InitLog";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/auth");
  }

  const { data: supabaseLogs, error } = await supabase
    .from("logs")
    .select("*")
    .order("date", { ascending: true });

  // if (supabaseLogs) {
  //   console.log(supabaseLogs);
  // }

  return (
    <main className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-8">
          <InitLog logs={supabaseLogs} />
          <CreateLog />
          <LogCalendar />
          <LogTable />
        </div>
      </div>
    </main>
  );
}
