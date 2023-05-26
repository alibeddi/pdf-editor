import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

export default function PdfViewer({ pdfFile, text }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <div className="pdf-viewer-container">
            <div className="pdf-container">
                <Document
                    file={pdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={{ workerSrc: "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js" }}
                >
                    <Page pageNumber={pageNumber} />
                    {text && (
                        <div className="pdf-text-overlay">
                            <p>{text}</p>
                        </div>
                    )}
                </Document>
                <div className="pdf-pagination">
                    <p>
                        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                    </p>
                    <div className="pdf-buttons">
                        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                            Previous
                        </button>
                        <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}





