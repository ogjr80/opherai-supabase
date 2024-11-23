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
import { motion } from 'framer-motion';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export default function CompanySideNav() {
  const pathname = usePathname();

  return (
    <motion.div 
      className="w-64 border-r bg-white h-screen fixed left-0 top-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <nav className="flex flex-col p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.name}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
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
            </motion.div>
          );
        })}
      </nav>
    </motion.div>
  );
}