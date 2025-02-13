import React from 'react';

interface FileViewerProps {
  base64Data?: string;
  fileType?: 'pdf' | 'image';
}

export const FileViewer: React.FC<FileViewerProps> = ({ base64Data, fileType }) => {
  if (!base64Data) return <div>No file data provided</div>;

  if (fileType === 'image') {
    return <img src={base64Data} alt="Converted file" />;
  }

  if (fileType === 'pdf') {
    return (
      <iframe
        src={base64Data}
        width="100%"
        height="600px"
        title="PDF Viewer"
      />
    );
  }

  return <div>Unsupported file type</div>;
}; 