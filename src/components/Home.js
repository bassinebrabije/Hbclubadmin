import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { Link } from "react-router-dom";

const Home = () => {

    const [requestCount, setRequestCount] = useState(0);

    const [trainerCount, setTrainerCount] = useState(0);

    const [membersCount, setMembersCount] = useState(0);

    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/trainers')
            .then(response => {
                setTrainerCount(response.data.length);
            })
            .catch(error => console.error('There was an error Trainer!', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/members')
            .then(response => {
                setMembersCount(response.data.length);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/members')
            .then(response => {
                const allMembers = response.data;
                setMembersCount(allMembers.length);

                const lastFiveMembers = allMembers.slice(-5);
                setMembers(lastFiveMembers);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/inscriptions')
            .then(response => {
                setRequestCount(response.data.length);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);






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
                            <span className="text-2xl sm:text-4xl leading-none font-bold text-gray-900">{requestCount}</span>
                            <h3 className="text-base font-normal text-gray-500">Request</h3>
                        </div>
                        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                            <Link  >  <svg className="w-10 h-10  text-[#FF0000]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
                            </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4  px-4 ">
            <div class="bg-white shadow border border-gray-200 rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold leading-none text-gray-900">Latest 5 Members</h3>
                    <Link to='/Members' class="text-sm font-medium text-[#FF0000] hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                        View all
                    </Link>
                </div>
                <div class="flow-root ">
                    <ul class="divide-y divide-gray-200">
                        {members.map(member => (
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img class="h-8 w-8 rounded-full" src={`http://localhost:8000/images/${member.imagemembers}`} alt={member.imagemembers} />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate">
                                            {member.fname}  {member.lname}
                                        </p>
                                        <p class="text-sm text-gray-500 truncate">
                                            {member.ville}
                                        </p>
                                    </div>
                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        </div>

    </div>;
};

export default Home;