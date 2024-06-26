import { Outlet, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from '../image/logov2.png';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [ville, setVille] = useState('');

    const [imgAdmin, setImgAdmin] = useState('');
    const [emailAdimn, setEmailAdmin] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const loggedInAdmin = JSON.parse(localStorage.getItem('admin'));

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };
    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmToLogout = async () => {
        await axios.post('http://localhost:8000/api/logout');
        localStorage.removeItem('admin');
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('admin'));
        if (adminData) {
            setFname(adminData.fname);
            setLname(adminData.lname);
            setVille(adminData.ville);
            setImgAdmin(adminData.imgadmin);
            setEmailAdmin(adminData.email);
        }
    }, []);
    const closeSidebar = () => {
        setIsOpen(false);
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
                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
                                    </svg>
                                </button>
                                <Link to="/" className="flex ms-2 md:me-24">
                                    <img src={logo} className="h-12 pl-[6rem] sm:pl-[2rem]" alt="Logo" />
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <span className="hidden text-right lg:block">
                                    <span className="block text-xs font-medium "> {emailAdimn}</span>
                                    <span className="block text-xs font-medium "> {fname} {lname}</span>
                                    <span className="block text-xs font-medium ">{ville}</span>
                                </span>
                                <div className="flex items-center ms-3 tracking-wider hidden  sm:block ">
                                    <div type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" >
                                        <img className="w-12 h-12 rounded-full bg-white" src={`http://localhost:8000/images/${imgAdmin}`} alt="userphoto" />
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
                    <ul className="space-y-5 mt-16 py-2.5 px-6 my-2 font-sans text-base">
                        <li>
                            <Link
                                to="/"
                                onClick={closeSidebar}
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
                                onClick={closeSidebar}
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Members') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/Members') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Members') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Members</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Trainers"
                                onClick={closeSidebar}
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Trainers') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/Trainers') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Trainers') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Trainers</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Coaching"
                                onClick={closeSidebar}
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Coaching') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/Coaching') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clipRule="evenodd" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Coaching') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Coaching</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/Request"
                                onClick={closeSidebar}
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/Request') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg className={`w-6 h-6 ${isActive('/Request') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.209 3.816a1 1 0 0 0-1.966.368l.325 1.74a5.338 5.338 0 0 0-2.8 5.762l.276 1.473.055.296c.258 1.374-.228 2.262-.63 2.998-.285.52-.527.964-.437 1.449.11.586.22 1.173.75 1.074l12.7-2.377c.528-.1.418-.685.308-1.27-.103-.564-.636-1.123-1.195-1.711-.606-.636-1.243-1.306-1.404-2.051-.233-1.085-.275-1.387-.303-1.587-.009-.063-.016-.117-.028-.182a5.338 5.338 0 0 0-5.353-4.39l-.298-1.592Z" />
                                    <path fillRule="evenodd" d="M6.539 4.278a1 1 0 0 1 .07 1.412c-1.115 1.23-1.705 2.605-1.83 4.26a1 1 0 0 1-1.995-.15c.16-2.099.929-3.893 2.342-5.453a1 1 0 0 1 1.413-.069Z" clipRule="evenodd" />
                                    <path d="M8.95 19.7c.7.8 1.7 1.3 2.8 1.3 1.6 0 2.9-1.1 3.3-2.5l-6.1 1.2Z" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/Request') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Request</span>
                            </Link>
                        </li>
                        {loggedInAdmin && loggedInAdmin.username.includes('admin') && (
                            <li>
                                <Link
                                    to="/Register"
                                    onClick={closeSidebar}
                                    className={`flex items-center p-2 rounded-lg group ${isActive('/Register') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                    }
                                >
                                    <svg
                                        className={`w-6 h-6 ${isActive('/Register') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clipRule="evenodd" />
                                    </svg>
                                    <span className={`ms-3 tracking-wider font-bold ${isActive('/Register') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Admins</span>
                                </Link>
                            </li>
                        )}

                        <li >
                            <button
                                onClick={handleLogout}
                                className={`flex items-center p-2 rounded-lg  group ${isActive('/SignOut') ? 'bg-[#FF0000] text-white' : 'hover:text-[#FF0000]'}`
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${isActive('/SignOut') ? 'text-white' : 'group-hover:text-[#FF0000]'}`}
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                </svg>
                                <span className={`ms-3 tracking-wider font-bold ${isActive('/SignOut') ? 'text-white' : 'text-[#000] group-hover:text-[#FF0000]'}`}>Sign out</span>
                            </button>
                        </li>

                    </ul>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        © 2024 Hamere&BrabijeClub. All rights reserved.
                    </p>
                </div>

            </aside >
            <Outlet />
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white border border-gray-500 rounded-xl">
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-red-600 w-16 h-16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-base font-normal text-gray-700">Are You Sure You Want To Sign Out?</h3>
                                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={confirmToLogout}>
                                    Yes, I'm sure
                                </button>
                                <button type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={cancelLogout}>
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default Layout;