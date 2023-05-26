import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function PdfViewer(pdfFile) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


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
                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <div className="pdf-pagination">
                    <p>
                        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                    </p>
                    <div className="pdf-buttons">
                        <button
                            type="button"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}



