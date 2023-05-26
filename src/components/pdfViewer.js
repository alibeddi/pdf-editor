import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

export default function PdfViewer({ pdfFile, text }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

    const handleMouseDown = (e) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const y = e.clientY - containerRect.top;
            setPosition({ x, y });
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const renderTextOverlay = () => {
        const overlayStyle = {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };

        const boxStyle = {
            //     background: "rgba(255, 255, 255, 0.8)",
            //     padding: "10px",
            //     border: "1px solid black",
            //     position: "absolute",
            //     left: `${position.x}px`,
            //     top: `${position.y}px`,
        };

        return (
            <div
                className="pdf-text-overlay"
                style={overlayStyle}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <div
                    className="pdf-text-box"
                    style={boxStyle}
                    onMouseDown={handleMouseDown}
                >
                    <p>{text}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="pdf-viewer-container" ref={containerRef}>
            <div className="pdf-container">
                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page
                        pageNumber={pageNumber}
                        className="pdf-page"
                        renderAnnotationLayer={false}
                    />
                    {text && renderTextOverlay()}
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

