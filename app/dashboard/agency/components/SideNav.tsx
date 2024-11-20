'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Building2,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Search,
  BarChart2,
  Briefcase,
  DollarSign,
  Building
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/agency', icon: BarChart2 },
  { name: 'Clients', href: '/dashboard/agency/clients', icon: Building },
  { name: 'Candidates', href: '/dashboard/agency/candidates', icon: Users },
  { name: 'Jobs', href: '/dashboard/agency/jobs', icon: Briefcase },
  { name: 'Talent Search', href: '/dashboard/agency/talent-search', icon: Search },
  { name: 'Messages', href: '/dashboard/agency/messages', icon: MessageSquare },
  { name: 'Documents', href: '/dashboard/agency/documents', icon: FileText },
  { name: 'Billing', href: '/dashboard/agency/billing', icon: DollarSign },
  { name: 'Settings', href: '/dashboard/agency/settings', icon: Settings },
];

export default function AgencySidenav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">Agency Portal</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 text-sm rounded-lg',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
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