import React, { useState } from 'react';
import PdfUploader from './pdfUploader';
import PdfEditor from './pdfEditor';
import PdfViewer from './pdfViewer';
import { PDFDocument, StandardFonts } from 'pdf-lib';

const PdfApp = () => {
    // const [selectedPdf, setSelectedPdf] = useState(null);
    // const [pdfContent, setPdfContent] = useState('');
    // const [modifiedPdfUrl, setModifiedPdfUrl] = useState('');
    // const [numPages, setNumPages] = useState(null);
    // const [currentPage, setCurrentPage] = useState(1);

    // const handlePdfUpload = (file) => {
    //     setSelectedPdf(file);
    //     setModifiedPdfUrl('');
    //     setCurrentPage(1);
    // };

    // const handleAddText = async () => {
    //     try {
    //         const pdfData = await selectedPdf.arrayBuffer();
    //         const pdfDoc = await PDFDocument.load(pdfData);
    //         const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    //         const pages = pdfDoc.getPages();
    //         pages.forEach((page) => {
    //             page.drawText(pdfContent, {
    //                 x: 50,
    //                 y: page.getHeight() - 50,
    //                 font: helveticaFont,
    //                 size: 24,
    //                 color: '#000000',
    //             });
    //         });

    //         const modifiedPdfBytes = await pdfDoc.save();
    //         const modifiedPdfDataUri = URL.createObjectURL(
    //             new Blob([modifiedPdfBytes], { type: 'application/pdf' })
    //         );

    //         setModifiedPdfUrl(modifiedPdfDataUri);
    //         console.log(modifiedPdfDataUri)
    //         setNumPages(pages.length);
    //     } catch (error) {
    //         console.log('Error:', error);
    //     }
    // };
    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    return (
        <div className="pdf-app">
            <h1>PDF Editor App</h1>
            <PdfViewer ></PdfViewer>
            {/* <PdfUploader onPdfUpload={handlePdfUpload} /> */}
            {/* <PdfEditor
                selectedPdf={selectedPdf}
                pdfContent={pdfContent}
                onTextChange={setPdfContent}
                onAddText={handleAddText}
                modifiedPdfUrl={modifiedPdfUrl}
                numPages={numPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            /> */}


        </div>
    );
};

export default PdfApp;
