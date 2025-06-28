
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download } from 'lucide-react';

export const ProjectFiles = () => {
  const files = [
    { name: 'Architectural Plans.pdf', size: '2.4 MB', date: 'Jul 10, 2024' },
    { name: 'Building Permits.pdf', size: '892 KB', date: 'Jul 8, 2024' },
    { name: 'Material Specifications.docx', size: '1.2 MB', date: 'Jul 5, 2024' },
    { name: 'Progress Photos.zip', size: '15.6 MB', date: 'Jul 3, 2024' }
  ];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-900">Files & Documents</CardTitle>
          <Button size="sm" variant="outline">
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-landify-blue" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                  <p className="text-xs text-gray-600">{file.size} • {file.date}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
