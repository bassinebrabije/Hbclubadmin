import React, { useState, useEffect } from 'react';
import axios from 'axios';
import villesData from './Villes.json';

function Addm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fname, setFname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [ville, setVille] = useState('');
    const [sexe, setSexe] = useState('');
    const [subscription, setSubscription] = useState('');
    const [imagemembers, setImagemembers] = useState(null);
    const [image, setImage] = useState(null);

    const [villes, setvilles] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

    };
    useEffect(() => {
        setvilles(villesData);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lastname);
        formData.append('phone', phone);
        formData.append('ville', ville);
        formData.append('sexe', sexe);
        formData.append('subscription', subscription);
        formData.append('imagemembers', imagemembers);

        axios.post('http://localhost:8000/api/members', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setFname('');
            setLastname('');
            setPhone('');
            setVille('');
            setSexe('');
            setSubscription('');
            setImagemembers(null);
            alert('member added successfully!');
            window.location.href = '/Members';
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    const handleImageUpload = (e) => {
        const uploadedImage = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(uploadedImage);
    };

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-10">
                <button
                    className="flex items-center justify-center bg-red-600 text-white rounded-full p-4 shadow-md"
                    onClick={openModal}
                >
                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-lg z-50">
                        <div className="flex items-left  pl-2 pb-2 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add Member
                            </h3>
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="First name" required />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="Last name" required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="ville" className="block mb-2 text-sm font-medium text-gray-900">Ville</label>
                                    <select
                                        value={ville} onChange={(e) => setVille(e.target.value)}
                                        className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                                        required
                                    >
                                        <option value="">Select Ville </option>
                                        {villes.map((ville) => (
                                            <option key={ville.id} value={ville.ville} className='text-[#000]' >{ville.ville}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="Sexe" className="block mb-2 text-sm font-medium text-gray-900">Sexe</label>
                                        <select
                                            value={sexe} onChange={(e) => setSexe(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                                            required>
                                            <option value="">Select Sexe</option>
                                            <option value="Man">Man</option>
                                            <option value="Women">Women</option>
                                            <option value="Non-binary">Non-binary</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" placeholder="123-456-7890" required />
                                    </div>
                                </div>
                                <div>
                                </div>
                                <div>
                                    <label htmlFor="subscription" className="block mb-2 text-sm font-medium text-gray-900">Subscription</label>
                                    <select
                                        value={subscription} onChange={(e) => setSubscription(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                                        required>
                                        <option value="">Select Subscription</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center w-full">
                                        {image ? (
                                            <div className="w-full flex justify-center">
                                                <img src={image} alt="Uploaded" className="w-28 rounded-lg" />
                                            </div>

                                        ) : (
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[5rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="text-sm text-gray-500 font-semibold">Click to upload</p>
                                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        handleImageUpload(e);
                                                        setImagemembers(e.target.files[0]);
                                                    }}
                                                    accept=".svg, .png, .jpg, .jpeg, .gif"
                                                />

                                            </label>
                                        )}
                                    </div>


                                </div>
                                <button type="submit" className="w-full text-white bg-[#FF0000]  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Addm
