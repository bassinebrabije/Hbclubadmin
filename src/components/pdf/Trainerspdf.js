import axios from 'axios';

const downloadTrainersPDF = () => {
    axios({
        url: 'http://localhost:8000/api/download-trainers-pdf', // Replace with your actual URL
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'trainers.pdf'); // or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up the link after clicking
    }).catch((error) => {
        console.error('Error downloading PDF:', error);
    });
};

export default downloadTrainersPDF;
