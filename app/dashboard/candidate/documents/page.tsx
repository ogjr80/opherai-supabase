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
  Eye
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover_letter' | 'certificate' | 'portfolio' | 'other';
  size: string;
  uploadDate: string;
  lastModified: string;
  status: 'active' | 'archived';
  tags: string[];
  url: string;
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Professional_Resume_2024.pdf',
    type: 'resume',
    size: '245 KB',
    uploadDate: '2024-03-15',
    lastModified: '2024-03-15',
    status: 'active',
    tags: ['current', 'software-engineer'],
    url: '/documents/resume.pdf'
  },
  {
    id: '2',
    name: 'Frontend_Portfolio.pdf',
    type: 'portfolio',
    size: '1.2 MB',
    uploadDate: '2024-03-10',
    lastModified: '2024-03-12',
    status: 'active',
    tags: ['portfolio', 'frontend'],
    url: '/documents/portfolio.pdf'
  }
];

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Implement file upload logic here
    console.log('Uploading files:', files);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Documents</h1>
        <div className="flex gap-2">
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleUpload}
            multiple
          />
          <label htmlFor="file-upload">
            <Button asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </span>
            </Button>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Document Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['all', 'resume', 'cover_letter', 'certificate', 'portfolio', 'other'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedType === type ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;