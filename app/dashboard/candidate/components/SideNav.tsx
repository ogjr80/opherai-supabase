'use client';
import { 
  LayoutDashboard, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  FileText,
  Brain,
  Code,
  Building
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Overview', href: '/dashboard/candidate', icon: LayoutDashboard },
  { name: 'Jobs', href: '/dashboard/candidate/jobs', icon: Building },
  { name: 'Applications', href: '/dashboard/candidate/applications', icon: Briefcase },
  { 
    name: 'Assessments', 
    href: '/dashboard/candidate/assessments', 
    icon: Brain,
    children: [
      { name: 'Technical Skills', href: '/dashboard/candidate/assessments/technical', icon: Code },
      { name: 'Psychometric', href: '/dashboard/candidate/assessments/psychometric', icon: Brain },
    ]
  },
  { name: 'Learning', href: '/dashboard/candidate/learning', icon: GraduationCap },
  { name: 'Messages', href: '/dashboard/candidate/messages', icon: MessageSquare },
  { name: 'Documents', href: '/dashboard/candidate/documents', icon: FileText },
  { name: 'Settings', href: '/dashboard/candidate/settings', icon: Settings },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-white">
      <nav className="flex flex-col p-4">
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
