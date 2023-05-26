import React, { useState } from "react";
import PdfViewer from "./pdfViewer";
import PdfEditor from "./pdfEditor";

const PdfApp = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [text, setText] = useState("");

    function handleFileChange(event) {
        const file = event.target.files[0];
        setPdfFile(file);
    }

    function updateText(newText) {
        setText(newText);
    }

    return (
        <div className="pdf-app">
            <h1>PDF Editor App</h1>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            {pdfFile ? (
                <React.Fragment>
                    <PdfViewer pdfFile={pdfFile} text={text} />
                    <PdfEditor pdfFile={pdfFile} updateText={updateText} />
                </React.Fragment>
            ) : (
                <p>Please upload a PDF file.</p>
            )}
        </div>
    );
};

export default PdfApp;
