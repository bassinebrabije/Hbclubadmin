import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Request from '../image/Request.jpg';

import { Link } from "react-router-dom";

const Home = () => {

    const [inscriptionsCount, setInscriptionsCount] = useState(0);
    const [trainerCount, setTrainerCount] = useState(0);
    const [membersCount, setMembersCount] = useState(0);
    const [members, setMembers] = useState([]);
    const [inscriptions, setInscriptions] = useState([]);

    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));

    useEffect(() => {
        axios.get('http://localhost:8000/api/trainers')
            .then(response => {
                let alltrainer = response.data;
                if (loggedInAdmin.username !== 'admin') {
                    alltrainer = alltrainer.filter(trainer => trainer.ville === loggedInAdmin.ville);
                }
                setTrainerCount(alltrainer.length);
            })
            .catch(error => console.error('There was an error Trainer!', error));
    }, [loggedInAdmin.ville, loggedInAdmin.username]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/members')
            .then(response => {
                let allMembers = response.data;
                if (loggedInAdmin.username !== 'admin') {
                    allMembers = allMembers.filter(member => member.ville === loggedInAdmin.ville);
                }
                setMembersCount(allMembers.length);
                const lastFiveMembers = allMembers.slice(-5);
                setMembers(lastFiveMembers);
            })
            .catch(error => console.error('There was an error!', error));
    }, [loggedInAdmin.ville, loggedInAdmin.username]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/inscriptions')
            .then(response => {
                let allInscriptions = response.data;
                if (loggedInAdmin.username !== 'admin') {
                    allInscriptions = allInscriptions.filter(inscription => inscription.ville === loggedInAdmin.ville);
                }
                setInscriptionsCount(allInscriptions.length);
                const lastFiveInscriptions = allInscriptions.slice(-5);
                setInscriptions(lastFiveInscriptions);
            })
            .catch(error => console.error('There was an error!', error));
    }, [loggedInAdmin.ville, loggedInAdmin.username]);





    return <div className="p-4 sm:ml-64">
        <div className="p-4 mt-16">
            <div className=" w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-white shadow border border-gray-200 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="font-normal text-gray-500">Total</span><br />
                            <span className="text-2xl sm:text-4xl leading-none font-bold text-gray-900"> {membersCount} </span>
                            <h3 className="text-base font-normal text-gray-500">Members </h3>
                        </div>
                        <div className="ml-5 w-0 flex  items-center cursor-pointer justify-end flex-1 text-green-500 text-base font-bold">
                            <Link to='/Members'>  <svg className="w-10 h-10 text-[#FF0000]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd" />
                            </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-sm border border-gray-200  rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="font-normal text-gray-500">Total</span><br />
                            <span className="text-2xl sm:text-4xl leading-none font-bold text-gray-900">{trainerCount}</span>
                            <h3 className="text-base font-normal text-gray-500">Trainers</h3>
                        </div>
                        <div className="ml-5 w-0 flex items-center cursor-pointer justify-end flex-1 text-green-500 text-base font-bold">
                            <Link to='/Trainers'><svg className="w-10 h-10 text-[#FF0000]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd" />
                            </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow border border-gray-200 rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="font-normal text-gray-500">Total</span><br />
                            <span className="text-2xl sm:text-4xl leading-none font-bold text-gray-900">{inscriptionsCount}</span>
                            <h3 className="text-base font-normal text-gray-500">Request</h3>
                        </div>
                        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                            <Link to='/Request'  >  <svg className="w-10 h-10  text-[#FF0000]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
                            </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                    <div className="bg-white shadow border border-gray-200 rounded-lg p-4 sm:p-6 lg:w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold leading-none text-gray-900">Latest 5 Members</h3>
                            <Link to='/Members' className="text-sm font-medium text-[#FF0000] hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                                View all
                            </Link>
                        </div>
                        <div className="flow-root">
                            <ul className="divide-y divide-gray-200">
                                {members.map(member => (
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full" src={`http://localhost:8000/images/${member.imagemembers}`} alt={member.imagemembers} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {member.fname.charAt(0).toUpperCase() + member.fname.slice(1)} {member.lname}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Email :  {member.email}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Phone :  {member.phone}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    ville :    {member.ville}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {inscriptions.length > 0 && (
                        <div className="bg-white shadow border border-gray-200 rounded-lg p-4 sm:p-6 lg:h-screnn lg:w-1/2">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold leading-none text-gray-900">Latest 5 Request</h3>
                                <Link to='/Request' className="text-sm font-medium text-[#FF0000] hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                                    View all
                                </Link>
                            </div>
                            <div className="flow-root">
                                <ul className="divide-y divide-gray-200">
                                    {inscriptions.map(inscription => (
                                        <li className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-full" src={Request} alt="Request" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {inscription.full_name.charAt(0).toUpperCase() + inscription.full_name.slice(1)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        Email :  {inscription.email}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        Phone :   {inscription.phone_number}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        ville :   {inscription.ville}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>;
};

export default Home;