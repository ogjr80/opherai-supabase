import React, { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
}

interface FormDialogProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}

// Enhanced Input Field
 const FormInput = ({ label, required, error, ...props }: FormInputProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      className={`w-full px-3 py-2 border rounded-md shadow-sm transition duration-200
        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
        focus:outline-none focus:ring-2 focus:ring-opacity-50`}
      {...props}
    />
    {error && (
      <p className="text-sm text-red-500 mt-1">{error}</p>
    )}
  </div>
);

// Enhanced Textarea Field
 const FormTextarea = ({ label, required, error, ...props }: FormTextareaProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Textarea
      className={`w-full px-3 py-2 border rounded-md shadow-sm transition duration-200
        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
        focus:outline-none focus:ring-2 focus:ring-opacity-50`}
      {...props}
    />
    {error && (
      <p className="text-sm text-red-500 mt-1">{error}</p>
    )}
  </div>
);

// Enhanced Modal
 const FormDialog = ({ 
  trigger, 
  title, 
  children, 
  onClose, 
  onSubmit 
}: FormDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh] px-1">
        <div className="py-4">
          {children}
        </div>
      </ScrollArea>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Enhanced Table
 const TableView = ({ headers, rows, onEdit, onDelete }) => (
  <Card>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 text-right border-b" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {cell}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(rowIndex)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(rowIndex)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

// Enhanced Skills Badge
 const SkillBadge = ({ skill, level }) => {
  const colors = {
    Beginner: 'bg-gray-100 text-gray-800',
    Intermediate: 'bg-blue-100 text-blue-800',
    Advanced: 'bg-green-100 text-green-800',
    Expert: 'bg-purple-100 text-purple-800'
  };

  return (
    <Badge variant="secondary" className={`${colors[level]} px-3 py-1 rounded-full`}>
      {skill} • {level}
    </Badge>
  );
};

export {
  FormInput,
  FormTextarea,
  FormDialog,
  TableView,
  SkillBadge
};