import { Outlet, Link, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import logo from '../image/logov2.png';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <>
            <div>
                <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 ">
                    <div className="px-3 py-3 lg:px-20 lg:pl-10 ">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start rtl:justify-end">
                                <button onClick={toggleSidebar} aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm   sm:hidden ">
                                    <span className="sr-only">Open sidebar</span>
                                    <svg className="w-8 h-8 text-[#000] hover:text-[#FF0000] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10" />
                                    </svg>
                                </button>
                                <Link to="/" className="flex ms-2 md:me-24">
                                    <img src={logo} className="h-12 pl-5" alt="Logo" />
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <span className="hidden text-right lg:block">
                                    <span className="block text-sm font-medium text-black">CEO</span>
                                    <span className="block text-xs font-medium ">CEO</span>
                                </span>
                                <div className="flex items-center ms-3 tracking-wider ">
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-12 h-12 rounded-full bg-white" src={logo} alt="user photo" />
                                    </button>
                                    <div className="z-50 hidden my-4 text-base list-none bg-white" id="dropdown-user">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900" role="none">
                                                CEO
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                                CEO
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform ${isOpen ? '' : '-translate-x-full'} bg-white border-r border-border-gray-200 sm:translate-x-0`}
                aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white text-sm">
                    <ul className="space-y-7 mt-20 py-2.5 px-6 my-2 font-sans text-base">
                        <li>
                            <Link
                                to="/"
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/') ? 'bg-[#FF0000] text-white' : '  hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-5 h-5 ${isActive('/') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Members"
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Members') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/Members') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Members') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Members</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Trainers"
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Trainers') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/Trainers') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Trainers') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Trainers</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Coachs"
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Coachs') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/Coachs') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Coachs') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Coachs</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/Request"
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Request') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg className={`w-6 h-6 ${isActive('/Request') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.209 3.816a1 1 0 0 0-1.966.368l.325 1.74a5.338 5.338 0 0 0-2.8 5.762l.276 1.473.055.296c.258 1.374-.228 2.262-.63 2.998-.285.52-.527.964-.437 1.449.11.586.22 1.173.75 1.074l12.7-2.377c.528-.1.418-.685.308-1.27-.103-.564-.636-1.123-1.195-1.711-.606-.636-1.243-1.306-1.404-2.051-.233-1.085-.275-1.387-.303-1.587-.009-.063-.016-.117-.028-.182a5.338 5.338 0 0 0-5.353-4.39l-.298-1.592Z" />
                                    <path fill-rule="evenodd" d="M6.539 4.278a1 1 0 0 1 .07 1.412c-1.115 1.23-1.705 2.605-1.83 4.26a1 1 0 0 1-1.995-.15c.16-2.099.929-3.893 2.342-5.453a1 1 0 0 1 1.413-.069Z" clip-rule="evenodd" />
                                    <path d="M8.95 19.7c.7.8 1.7 1.3 2.8 1.3 1.6 0 2.9-1.1 3.3-2.5l-6.1 1.2Z" />
                                </svg>


                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Request') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Request</span>
                            </Link>
                        </li>
                        <li >
                            <Link
                                to="/SignOut"
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/SignOut') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/SignOut') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/SignOut') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Sign out</span>
                            </Link>
                        </li>
                    </ul>
                    <p class="text-center text-xs text-gray-400 mt-3">
                        © 2024 Hamere&BrabijeClub. All rights reserved.
                    </p>
                </div>

            </aside>
            <Outlet />
        </>
    )
};

export default Layout;