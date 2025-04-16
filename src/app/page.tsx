import NonDashboardNavbar from "@/components/NonDashboardNavbar";
/* You use () to not include it in the URL. Mainly used for grouping purposes */

import Footer from "@/components/Footer";
import Landing from "@/app/(nondashboard)/landing/page";

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
