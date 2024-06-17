import axios from 'axios';

const downloadAdminsPDF = () => {
    axios({
        url: 'http://localhost:8000/api/download-admins-pdf',
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'admins.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch((error) => {
        console.error('Error downloading PDF:', error);
    });
};

export default downloadAdminsPDF;
