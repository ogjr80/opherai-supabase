'use client';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  LineChart, 
  MessageSquare, 
  Settings, 
  Building,
  FileText,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/company', icon: LayoutDashboard },
  { name: 'Job Postings', href: '/dashboard/company/jobs', icon: Briefcase },
  { name: 'Candidates', href: '/dashboard/company/candidates', icon: Users },
  { name: 'Analytics', href: '/dashboard/company/analytics', icon: LineChart },
  { name: 'Messages', href: '/dashboard/company/messages', icon: MessageSquare },
  { name: 'Company Profile', href: '/dashboard/company/profile', icon: Building },
  { name: 'Documents', href: '/dashboard/company/documents', icon: FileText },
  { name: 'Talent Search', href: '/dashboard/company/search', icon: Search },
  { name: 'Settings', href: '/dashboard/company/settings', icon: Settings },
];

export default function CompanySideNav() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-white h-screen fixed left-0 top-16">
      <nav className="flex flex-col p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}