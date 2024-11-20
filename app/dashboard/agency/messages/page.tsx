'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Search,
  Filter,
  Users,
  Building2,
  Clock,
  Mail,
  Star,
  Circle
} from 'lucide-react';
import { motion } from 'framer-motion';

const conversations = [
  {
    id: 1,
    type: 'client',
    name: 'TechCorp Solutions',
    avatar: 'TC',
    lastMessage: 'We have reviewed the candidates and would like to...',
    timestamp: '2 hours ago',
    unread: 3,
    priority: 'high',
    status: 'online'
  },
  {
    id: 2,
    type: 'candidate',
    name: 'Sarah Chen',
    avatar: 'SC',
    lastMessage: 'Thank you for the interview preparation tips...',
    timestamp: '5 hours ago',
    unread: 1,
    priority: 'medium',
    status: 'offline'
  },
  // Add more conversations...
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');

  return (
    <motion.div 
      className="h-[calc(100vh-120px)] flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-gray-500">Manage communications with clients and candidates</p>
        </div>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </motion.div>

      <motion.div 
        className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0"
        variants={containerVariants}
      >
        {/* Conversations List */}
        <Card className="lg:col-span-5 flex flex-col">
          <CardHeader className="space-y-4 px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="px-4 space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0 max-w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 max-w-[70%]">
                            <h3 className="font-medium truncate">{conv.name}</h3>
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                              conv.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate pr-4">{conv.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant={conv.type === 'client' ? 'default' : 'secondary'}>
                            {conv.type}
                          </Badge>
                          {conv.unread > 0 && (
                            <Badge variant="destructive" className="rounded-full flex-shrink-0">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Content */}
        <Card className="lg:col-span-7 flex flex-col">
          <CardContent className="flex-1 p-0">
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a conversation to view messages
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}