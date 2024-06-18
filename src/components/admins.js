import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formadda from './popup/Adda'
import PDFA from './pdf/Adminspdf';
const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);

    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));

    useEffect(() => {
        axios.get('http://localhost:8000/api/admins')
            .then(response => {
                const sortedAdmin = response.data
                    .filter(admin => admin.id !== loggedInAdmin.id && admin.username !== 'admin')
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setAdmins(sortedAdmin);
            })
            .catch(error => console.error('There was an error!', error));
    }, [loggedInAdmin.id]);


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDeleteClick = (id) => {
        setAdminToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8000/api/admins/${adminToDelete}`)
            .then(() => {
                setAdmins(admins.filter(admin => admin.id !== adminToDelete));
                setShowDeleteModal(false);
                adminToDelete(null);
            })
            .catch(error => console.error('There was an error!', error));
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setAdminToDelete(null);
    };


    const searchTerms = searchQuery.toLowerCase().split(' ');
    const filteredTrainers = admins.filter(admin => {
        const username = admin.username.toLowerCase();
        return searchTerms.every(term =>
            username.includes(term)
        );
    });

    return (
        <div className='bg-white'>
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-16">
                    <div>
                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <ol className="flex items-center gap-2">
                                    <li>
                                        <a href='/'>  <svg className="w-5 h-5 text-[#000] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                        </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <p className="text-base font-medium ">/ Dashboard /</p>
                                    </li>
                                    <li className="text-base font-medium text-[#FF0000]"><p>Admins</p></li>
                                </ol>
                            </div>
                        </div>
                        <div className="mt-4 mb-4 flex items-center">
                            <input
                                list="members"
                                className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:border-[#4991cc] p-2.5 flex-grow"
                                placeholder="Search by Username Admin"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                autoComplete="off"
                            />
                            <datalist id="members">
                                {admins.map((admin) => (
                                    <option key={admin.id} >{`${admin.username} `}</option>
                                ))}
                            </datalist>
                            <button onClick={PDFA}
                                className="ml-2 bg-[#FF0000] text-white text-sm p-2.5 rounded-lg"
                            >
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="relative overflow-x-auto rounded-lg bg-white">
                        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">
                            {filteredTrainers.map(admin => (
                                <li key={admin.id} className="col-span-1 divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow">
                                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="truncate text-base font-bold text-[#000]">{admin.username.charAt(0).toUpperCase() + admin.username.slice(1)}</h3>
                                            </div>
                                            <p className="mt-1 truncate text-sm text-gray-500"><span className="text-[#000] font-medium">Email :</span> {admin.email}</p>
                                            <p className="mt-1 truncate text-sm text-gray-500"><span className="text-[#000] font-medium">Full Name :</span> {admin.fname} {admin.lname}</p>
                                            <p className="mt-1 truncate text-sm text-gray-500"><span className="text-[#000] font-medium">Phone :</span>  {admin.phone}</p>
                                            <p className="mt-1 truncate text-sm text-gray-500"><span className="text-[#000] font-medium">Ville : </span> {admin.ville}</p>
                                            <p className="mt-1 truncate text-sm text-gray-500"><span className="text-[#000] font-medium">Gender :</span>  {admin.sexe}</p>
                                            <p className="mt-1 truncate text-sm text-gray-500"><span className="text-[#000] font-medium">Joined At :</span>  {new Date(admin.created_at).toISOString().split('T')[0]}</p>
                                        </div>
                                        <img className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-300" src={`http://localhost:8000/images/${admin.imgadmin}`} alt={admin.imgadmin} />
                                    </div>
                                    <div>
                                        <div className="-mt-px flex divide-x divide-gray-200">
                                            <div className="flex w-0 flex-1 cursor-pointer hover:bg-[#ff0000]">
                                                <button onClick={() => handleDeleteClick(admin.id)} className="relative hover:text-white -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white border border-gray-500 rounded-xl">
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-red-600 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-700">Are you sure you want to delete this member?</h3>
                                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={confirmDelete}>
                                    Yes, I'm sure
                                </button>
                                <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={cancelDelete}>
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Formadda />
        </div>
    );
};

export default Admins;
