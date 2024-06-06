import React, { useState } from 'react';
import Formaddc from './popup/Addt'

const Coachs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const employees = [
        {
            name: 'Shehab Naaaajib', joinDate: '2021-01-01', email: 'howpossible17@example.com', phone: '+1-202-555-0170', imgSrc: 'https://qph.cf2.quoracdn.net/main-thumb-554097988-200-xietklpojlcioqxaqgcyykzfxblvoqrb.jpeg',
        },
        {
            name: 'Brabiej yassine', joinDate: '2021-01-01', email: 'howpossible17@example.com', phone: '+1-202-555-0170', imgSrc: 'https://qph.cf2.quoracdn.net/main-thumb-554097988-200-xietklpojlcioqxaqgcyykzfxblvoqrb.jpeg',
        },
    ];

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return <>
        <div className='bg-white'>
            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-16">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-medium ">Coachs Table</h1>
                        <div>
                            <ol className="flex items-center gap-2">
                                <li>
                                    <a className=" text-2xl font-medium">Dashboard /</a>
                                </li>
                                <li className=" text-2xl font-medium text-[#FF0000]"> <a>Coachs</a>  </li><br />
                            </ol>
                        </div>
                    </div>
                    <div className="mt-4 mb-4 flex items-center">
                        <input
                            type="text"
                            id="search"
                            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:border-[#4991cc] p-2.5 flex-grow"
                            placeholder="search by Full name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="ml-2 bg-[#FF0000]  text-white text-sm p-2.5 rounded-lg"
                        >
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div class="relative overflow-x-auto    rounded-lg bg-white pt-5">
                        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">
                            {filteredEmployees.map((employee, index) => (
                                <li key={index} className="col-span-1 divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow">
                                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="truncate text-sm font-medium text-gray-900">{employee.name}</h3>
                                            </div>
                                            <p className="mt-1 truncate text-sm text-gray-500">Joined At {employee.joinDate}</p>
                                        </div>
                                        <img className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-300" src={employee.imgSrc} alt={employee.name} />
                                    </div>
                                    <div>
                                        <div className="-mt-px flex divide-x divide-gray-200">
                                            <div className="flex w-0 flex-1">
                                                <a href={`tel:${employee.phone}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd"></path>
                                                    </svg>
                                                    Call
                                                </a>
                                            </div>
                                            <div className="-ml-px flex w-0 flex-1">
                                                <a className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                                    More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p class="text-center text-sm  text-gray-500 mt-10">
                        © 2024 Hamere  & Brabije Club. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
        <Formaddc />
    </>;
};

export default Coachs;

