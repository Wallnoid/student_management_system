import SiteNavBar from "@/components/shared/navbar";
import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div>
        <SiteNavBar/>
        <div className="bg-white">{children}</div>
      </div>
  );
}