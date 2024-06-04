import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Request() {
    const [requests, setrequests] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [requestToDelete, setRequestToDelete] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/inscriptions')
            .then(response => {
                const sortedrequests = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setrequests(sortedrequests);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    const handleDeleteClick = (id) => {
        setRequestToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8000/api/inscriptions/${requestToDelete}`)
            .then(() => {
                setrequests(requests.filter(request => request.id !== requestToDelete));
                setShowDeleteModal(false);
                setRequestToDelete(null);
            })
            .catch(error => console.error('There was an error!', error));
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setRequestToDelete(null);
    };

    return (
        <div>
            <div className='bg-white'>
                <div className="p-4 sm:ml-64">
                    <div className="p-4 mt-16">
                        <div>
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h1 className="text-2xl font-medium">Requests Table</h1>
                                <div>
                                    <ol className="flex items-center gap-2">
                                        <li>
                                            <a className="text-2xl font-medium">Dashboard /</a>
                                        </li>
                                        <li className="text-2xl font-medium text-[#FF0000]"><a>Requests</a></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-x-auto rounded-lg bg-white">
                            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">
                                {requests.map(request => (
                                    <li key={request.id} className="col-span-1 divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow">
                                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                                            <div className="flex-1 truncate">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="truncate text-base font-bold text-[#000]">{request.full_name.charAt(0).toUpperCase() + request.full_name.slice(1)}</h3>
                                                </div>
                                                <p className="mt-1 truncate text-sm text-gray-500">Email  : {request.email}</p>
                                                <p className="mt-1 truncate text-sm text-gray-500">Request At :  {new Date(request.created_at).toISOString().split('T')[0]}</p>
                                                <p className="mt-1 truncate text-sm text-gray-500">Phone Number : {request.phone_number}</p>
                                                <p className="mt-1 truncate text-sm text-gray-500">Ville  : {request.ville}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="-mt-px flex divide-x divide-gray-200">
                                                <div className="flex w-0 flex-1 cursor-pointer hover:bg-[#ff0000]">
                                                    <a onClick={() => handleDeleteClick(request.id)} className="relative hover:text-white -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                                        Delete
                                                    </a>
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
                                    <h3 className="mb-5 text-lg font-normal text-gray-700">Are you sure you want to delete this request?</h3>
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
            </div>
        </div>
    )
}

export default Request;
