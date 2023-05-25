import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function PdfViewer() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show first page
    const [pdfFile, setPdfFile] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        setPdfFile(file);

    }

    return (
        <>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            {pdfFile && (
                <>
                    <Document
                        file={pdfFile}

                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <div>
                        <p>
                            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                        </p>
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
                </>
            )}
        </>
    );
}


