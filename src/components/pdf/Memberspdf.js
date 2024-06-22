import axios from 'axios';

const downloadMembersPDF = () => {
    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));

    let url;
    if (loggedInAdmin.username === 'admin') {
        url = `http://localhost:8000/api/download-members-pdf`;
    } else {
        const ville = loggedInAdmin.ville;
        url = `http://localhost:8000/api/download-members-pdf?ville=${ville}`;
    }
    axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'members.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch((error) => {
        console.error('Error downloading PDF:', error);
        console.error('Error response:', error.response);
    });
};

export default downloadMembersPDF;
