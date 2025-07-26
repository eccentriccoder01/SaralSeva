import React from 'react';


const PDFViewer = ({ pdfUrl }) => (
  <div>
      <iframe
      src={pdfUrl}
      key={pdfUrl}
      title="PDF Viewer"
      width="100%"
      height="600px"
    />
  </div>
);

export default PDFViewer;
