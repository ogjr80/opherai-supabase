import CompanySideNav from './components/SideNav';
import CompanyTopNav from './components/TopNav';

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyTopNav />
      <CompanySideNav />
      <div className="pl-64 pt-16">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}