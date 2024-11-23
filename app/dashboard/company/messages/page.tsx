'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Send, Star, Clock, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data structure similar to the candidates and jobs
const mockConversations = [
  {
    id: 1,
    candidate: {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      avatar: '/avatars/sarah.jpg',
      status: 'active'
    },
    lastMessage: {
      content: 'Thank you for considering my application...',
      timestamp: '2024-04-10T14:30:00Z',
      unread: true
    },
    jobPosition: 'Senior Frontend Developer',
    stage: 'Interview'
  },
  {
    id: 2,
    candidate: {
      name: 'Michael Brown',
      role: 'DevOps Engineer',
      avatar: '/avatars/michael.jpg',
      status: 'away'
    },
    lastMessage: {
      content: 'Im available for the technical interview next week',
      timestamp: '2024-04-09T11:20:00Z',
      unread: false
    },
    jobPosition: 'DevOps Engineer',
    stage: 'Screening'
  }
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
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);

  return (
    <motion.div 
      className="space-y-8 p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <div className="h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-12 h-full gap-4">
            {/* Conversations List */}
            <div className="col-span-4 bg-white rounded-lg border">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-y-auto h-[calc(100vh-12rem)]">
                {mockConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedConversation.id === conversation.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{conversation.candidate.name}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(conversation.lastMessage.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{conversation.jobPosition}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.content}</p>
                      {conversation.lastMessage.unread && (
                        <Badge variant="default">New</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-8 bg-white rounded-lg border">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold">{selectedConversation.candidate.name}</h2>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.jobPosition} • {selectedConversation.stage}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {/* Messages will be rendered here */}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}