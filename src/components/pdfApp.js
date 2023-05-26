import React from "react";
import PdfViewer from "./pdfViewer";
import PdfEditor from "./pdfEditor";

const PdfApp = () => {
    const [pdfFile, setPdfFile] = React.useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        setPdfFile(file);
    }

    return (
        <div className="pdf-app">
            <h1>PDF Editor App</h1>
            <React.Fragment>
                <PdfViewer pdfFile={pdfFile} />
                <PdfEditor pdfFile={pdfFile} />
            </React.Fragment>

        </div>
    );
};

export default PdfApp;

