import React, { useState } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";

export default function PdfEditor({ pdfFile, updateText }) {
    const [text, setText] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    function addTextToPdf() {
        PDFDocument.load(pdfFile)
            .then((pdfDoc) => {
                const page = pdfDoc.getPages()[pageIndex];
                const font = pdfDoc.embedFont(StandardFonts.Helvetica);
                const fontSize = 20;
                page.drawText(text, {
                    x: position.x,
                    y: page.getSize().height - position.y - fontSize,
                    size: fontSize,
                    font,
                    color: "black",
                });
                return pdfDoc.save();
            })
            .then((newPdfBytes) => {
                const blob = new Blob([newPdfBytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "edited.pdf";
                link.click();
            })
            .catch((error) => {
                console.error("Error editing PDF:", error);
            });
    }

    function handleTextChange(e) {
        const newText = e.target.value;
        setText(newText);
        updateText(newText);
    }

    return (
        <div className="pdf-editor">
            <h2>PDF Editor</h2>
            <div>
                <label htmlFor="text-input">Text:</label>
                <input
                    id="text-input"
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                />
            </div>
            <div>
                <label htmlFor="page-input">Page Index:</label>
                <input
                    id="page-input"
                    type="number"
                    min={0}
                    max={pdfFile.numPages - 1}
                    value={pageIndex}
                    onChange={(e) => setPageIndex(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="x-input">X Position:</label>
                <input
                    id="x-input"
                    type="number"
                    value={position.x}
                    onChange={(e) =>
                        setPosition((prevPosition) => ({
                            ...prevPosition,
                            x: parseInt(e.target.value),
                        }))
                    }
                />
            </div>
            <div>
                <label htmlFor="y-input">Y Position:</label>
                <input
                    id="y-input"
                    type="number"
                    value={position.y}
                    onChange={(e) =>
                        setPosition((prevPosition) => ({
                            ...prevPosition,
                            y: parseInt(e.target.value),
                        }))
                    }
                />
            </div>
            <button onClick={addTextToPdf}>Add Text to PDF</button>
        </div>
    );
}



