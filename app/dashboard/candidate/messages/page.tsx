'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Search, Filter } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'recruiter' | 'candidate' | 'system';
  content: string;
  timestamp: string;
  read: boolean;
  subject?: string;
  attachments?: string[];
}

interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  lastMessage: Message;
  unreadCount: number;
}

// Add mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: 'current-user-id',
        name: 'Sarah Chen',
        role: 'candidate'
      },
      {
        id: 'recruiter-1',
        name: 'Emily Thompson',
        role: 'recruiter',
        avatar: '/avatars/emily.jpg'
      }
    ],
    lastMessage: {
      id: 'm1',
      senderId: 'recruiter-1',
      senderName: 'Emily Thompson',
      senderRole: 'recruiter',
      content: 'Looking forward to your technical interview next week!',
      timestamp: '2024-04-10T15:30:00Z',
      read: false
    },
    unreadCount: 1
  },
  {
    id: '2',
    participants: [
      {
        id: 'current-user-id',
        name: 'Sarah Chen',
        role: 'candidate'
      },
      {
        id: 'recruiter-2',
        name: 'James Wilson',
        role: 'recruiter',
        avatar: '/avatars/james.jpg'
      }
    ],
    lastMessage: {
      id: 'm2',
      senderId: 'current-user-id',
      senderName: 'You',
      senderRole: 'candidate',
      content: 'Thank you for considering my application',
      timestamp: '2024-04-09T10:15:00Z',
      read: true
    },
    unreadCount: 0
  }
];

const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: 'recruiter-1',
    senderName: 'Emily Thompson',
    senderRole: 'recruiter',
    content: 'Hi Sarah, I hope this message finds you well. We were very impressed with your initial application for the Senior Frontend Developer position.',
    timestamp: '2024-04-10T14:30:00Z',
    read: true
  },
  {
    id: 'm2',
    senderId: 'current-user-id',
    senderName: 'You',
    senderRole: 'candidate',
    content: 'Thank you for reaching out! I m very excited about the opportunity.',
    timestamp: '2024-04-10T14:35:00Z',
    read: true
  },
  {
    id: 'm3',
    senderId: 'recruiter-1',
    senderName: 'Emily Thompson',
    senderRole: 'recruiter',
    content: 'Great! I d like to schedule a technical interview for next week. Would Tuesday at 2 PM PST work for you?',
    timestamp: '2024-04-10T14:40:00Z',
    read: true
  },
  {
    id: 'm4',
    senderId: 'current-user-id',
    senderName: 'You',
    senderRole: 'candidate',
    content: 'Tuesday at 2 PM PST works perfectly for me!',
    timestamp: '2024-04-10T14:45:00Z',
    read: true
  },
  {
    id: 'm5',
    senderId: 'recruiter-1',
    senderName: 'Emily Thompson',
    senderRole: 'recruiter',
    content: 'Looking forward to your technical interview next week!',
    timestamp: '2024-04-10T15:30:00Z',
    read: false
  }
];

const MessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update the mock data fetch
    setConversations(mockConversations);
    setMessages(mockMessages);
    setLoading(false);
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Simulated message sending
    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current-user-id',
      senderName: 'You',
      senderRole: 'candidate',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-12 h-full gap-4">
        {/* Conversations List */}
        <div className="col-span-4 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {conversation.participants
                        .filter((p) => p.id !== 'current-user-id')
                        .map((p) => p.name)
                        .join(', ')}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="secondary">{conversation.unreadCount}</Badge>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Message Thread */}
        <div className="col-span-8 bg-white rounded-lg shadow">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b">
                <h2 className="font-semibold">
                  {conversations
                    .find((c) => c.id === selectedConversation)
                    ?.participants.map((p) => p.name)
                    .join(', ')}
                </h2>
              </div>
              <ScrollArea className="h-[calc(100vh-16rem)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 'current-user-id'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === 'current-user-id'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;