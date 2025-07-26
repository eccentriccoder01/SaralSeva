import React from 'react';

const PDFViewer = ({ pdfUrl }) => (
  <div className="w-full h-full">
      <iframe
      src={pdfUrl}
      key={pdfUrl}
      title="PDF Viewer"
      width="100%"
      height="100%"
      className="border-none"
    />
  </div>
);

export default PDFViewer;