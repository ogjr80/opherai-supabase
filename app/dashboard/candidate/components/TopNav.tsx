'use client';   
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function TopNav() {
  return (
    <header className="h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-6">
        <Link href="/dashboard/candidate" className="text-xl font-bold text-gray-900">
          Opher
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search opportunities..."
              className="pl-8"
            />
          </div>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="h-8 w-8 rounded-full bg-gray-200">
            {/* Avatar placeholder */}
          </div>
        </div>
      </div>
    </header>
  );
}
