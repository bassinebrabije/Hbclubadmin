import React, { useState, useEffect } from 'react';
import axios from 'axios';
import villesData from './Villes.json';

function Updatem({ isModalOpen, closeModal, memberId }) {
    const [villes, setVilles] = useState([]);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [ville, setVille] = useState('');
    const [sexe, setSexe] = useState('');
    const [subscription, setSubscription] = useState('');
    const [imagemembers, setImagemembers] = useState(null);
    const [createdAt, setCreatedAt] = useState('');




    useEffect(() => {
        setVilles(villesData);
    }, []);

    useEffect(() => {
        if (memberId) {
            axios.get(`http://localhost:8000/api/members/${memberId}`)
                .then(response => {
                    setFname(response.data.fname);
                    setLname(response.data.lname);
                    setPhone(response.data.phone);
                    setVille(response.data.ville);
                    setSexe(response.data.sexe);
                    setSubscription(response.data.subscription);
                    setImagemembers(response.data.imagemembers);
                    const date = new Date(response.data.created_at);
                    const formattedDate = date.toISOString().split('T')[0];
                    setCreatedAt(formattedDate);
                })
                .catch(error => console.error('There was an error!', error));
        }
    }, [memberId]);



    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = {
            fname: fname,
            lname: lname,
            phone: phone,
            ville: ville,
            subscription: subscription,
            sexe: sexe,

        };
        axios.put(`http://localhost:8000/api/members/${memberId}`, formData)
            .then(response => {
                alert('Member updated successfully!');
                window.location.href = '/Members';
                closeModal();
            })
            .catch(error => {
                console.error('There was an error!', error.response.data);
            });
    };






    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative p-4 w-full max-w-3xl max-h-full bg-white rounded-lg shadow-lg z-50">
                        <div className="flex items-center justify-start">
                            <div className="relative pr-2 pb-2 w-36 rounded-full">
                                <img className="h-20 w-20 mx-auto" src={`http://localhost:8000/images/${imagemembers}`} alt={imagemembers} />
                            </div>
                            <div className="relative pr-2  w-96 rounded-full">
                                <p className='font-medium'>Full Name : {fname} {lname}</p>
                                <p className='font-medium'>Joined At : {createdAt}</p>
                                <p className='font-medium'>Subscription : {subscription}</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                                        <input type="text" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="First name" required />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                        <input type="text" name="lname" value={lname} onChange={(e) => setLname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Last name" required />
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="ville">Ville</label>
                                        <select name="ville" value={ville} onChange={(e) => setVille(e.target.value)} className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
                                            <option value="">Select Ville</option>
                                            {villes.map((ville) => (
                                                <option key={ville.ville} value={ville.ville}>{ville.ville}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="Sexe" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                                        <select name="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
                                            <option value="">Select Sexe</option>
                                            <option value="Man">Man</option>
                                            <option value="Women">Women</option>

                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                        <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="123-456-7890" required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subscription" className="block mb-2 text-sm font-medium text-gray-900">Subscription</label>
                                    <select name="subscription"
                                        value={subscription} onChange={(e) => setSubscription(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
                                        <option value="">Select Subscription</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                                <div className="flex space-x-4">
                                    <button type="submit" className="text-white bg-[#008000] w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Updatem;
