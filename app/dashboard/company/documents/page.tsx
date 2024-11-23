'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload, 
  Folder, 
  Download, 
  Trash2, 
  Search,
  Filter,
  Eye,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CompanyDocument {
  id: string;
  name: string;
  type: 'job_description' | 'company_policy' | 'offer_letter' | 'contract' | 'other';
  size: string;
  uploadDate: string;
  lastModified: string;
  status: 'active' | 'archived';
  department: string;
  sharedWith: string[];
  url: string;
}

const companyDocuments: CompanyDocument[] = [
  {
    id: '1',
    name: 'Senior_Frontend_JD_2024.pdf',
    type: 'job_description',
    size: '125 KB',
    uploadDate: '2024-04-01',
    lastModified: '2024-04-10',
    status: 'active',
    department: 'Engineering',
    sharedWith: ['HR Team', 'Engineering Leads'],
    url: '/documents/jd.pdf'
  },
  {
    id: '2',
    name: 'Employee_Handbook_2024.pdf',
    type: 'company_policy',
    size: '2.5 MB',
    uploadDate: '2024-01-15',
    lastModified: '2024-01-15',
    status: 'active',
    department: 'HR',
    sharedWith: ['All Employees'],
    url: '/documents/handbook.pdf'
  },
  {
    id: '3',
    name: 'Standard_Offer_Letter_Template.docx',
    type: 'offer_letter',
    size: '85 KB',
    uploadDate: '2024-03-20',
    lastModified: '2024-03-20',
    status: 'active',
    department: 'HR',
    sharedWith: ['HR Team', 'Hiring Managers'],
    url: '/documents/offer_template.docx'
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

export default function CompanyDocuments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <motion.div 
      className="space-y-8 p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Company Documents</h1>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </motion.div>

      <motion.div variants={containerVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">
                  <Folder className="w-4 h-4 mr-2" />
                  New Folder
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {companyDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Last modified: {doc.lastModified}</span>
                          <Badge variant="secondary">{doc.department}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}