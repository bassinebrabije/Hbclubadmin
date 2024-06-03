import React from 'react';
import axios from 'axios';

const DownloadPDFButton = () => {
    const handleDownload = () => {
        axios({
            url: 'http://localhost:8000/download-pdf', // Your Laravel endpoint
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'example.pdf'); // Specify the file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <button onClick={handleDownload}>Download PDF</button>
    );
};

export default DownloadPDFButton;
