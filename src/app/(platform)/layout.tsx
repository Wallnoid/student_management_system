import SiteNavBar from "@/components/shared/navbar";
import "../globals.css";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  console.log(error)
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
      <div>
        <SiteNavBar/>
        <div className="bg-white">{children}</div>
      </div>
  );
}