import React from 'react'
import Error from '../image/404.png'
function Notfound() {
    return (
        <>
            <div className="h-screen w-screen bg-white flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">

                    <div className="max-w-lg">
                        <img src={Error} alt="Error 404" />
                    </div>
                    <div className="pl-10 max-w-md">
                        <p
                            className="text-2xl md:text-3xl font-light leading-normal"
                        >Sorry we couldn't find this page. </p>
                        <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

                        <a href='/' className="px-4 cursor-pointer	 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none  bg-[#FF0000] ">back to homepage</a>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Notfound