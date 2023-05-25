import React from 'react';

const PdfUploader = ({ onPdfUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onPdfUpload(file);
        console.log(file)
    };
    return (
        <div>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>
    );
};

export default PdfUploader;
