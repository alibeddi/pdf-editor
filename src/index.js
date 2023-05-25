import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PdfApp from './components/pdfApp';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PdfApp />
  </React.StrictMode>
);


