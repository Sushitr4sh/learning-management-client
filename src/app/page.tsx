import NonDashboardNavbar from "@/components/NonDashboardNavbar";
/* You use () to not include it in the URL. Mainly used for grouping purposes */
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/Footer";

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
