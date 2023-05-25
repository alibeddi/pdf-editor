import React from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

import PdfUploader from './pdfUploader';
import PdfViewer from './pdfViewer';

const PdfEditor = ({
    selectedPdf,
    pdfContent,
    onTextChange,
    onAddText,
    modifiedPdfUrl,
    numPages,
    currentPage,
    onPageChange,
}) => {
    const handleAddText = async () => {
        // Call the provided callback function
        onAddText();
    };

    const handlePageChange = (newPage) => {
        // Call the provided callback function
        onPageChange(newPage);
    };

    return (
        <div className="pdf-editor-container">

            <textarea
                className="pdf-editor-textarea"
                value={pdfContent}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="Enter text to add to the PDF"
            />
            <button
                className="pdf-editor-button"
                onClick={handleAddText}
                disabled={!selectedPdf || !pdfContent}
            >
                Add Text
            </button>


        </div>
    );
};

export default PdfEditor;


