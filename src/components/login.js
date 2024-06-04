import React from 'react'
import Image from '../image/logov2.png'
import Heroo from '../image/login.png'
function login() {

    const sectionStyle = {
        backgroundImage: `url(${Heroo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return (
        <div class="flex w-screen flex-wrap text-slate-800">
            <div class="flex w-full flex-col md:w-1/2">
                <div class="flex justify-center pt-6 md:justify-start md:pl-12">
                    <img src={Image} className="w-20" />
                </div>
                <div class="my-auto mx-auto flex flex-col justify-center px-6  md:justify-start lg:w-[28rem]">
                    <p class="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
                        Welcome back
                    </p>
                    <p class="mt-4 text-center font-medium md:text-left">Sign in to your account below.</p>

                    <form class="flex flex-col items-stretch pt-3 md:pt-2">
                        <div class="flex flex-col pt-4">
                            <div class="relative flex overflow-hidden rounded-md border-2 transition ">
                                <input type="email" id="login-email" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 " placeholder="Email" />
                            </div>
                        </div>
                        <div class="mb-4 flex flex-col pt-4">
                            <div class="relative flex overflow-hidden rounded-md border-2 transition ">
                                <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 " placeholder="Password" />
                            </div>
                        </div>
                        <a href="#" class="mb-6 text-center text-sm font-medium text-gray-600 md:text-left">Forgot password?</a>
                        <button type="submit" class="rounded-lg bg-[#FF0000] px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none  ring-offset-2 transition hover:bg-[#eb5656]  md:w-32">Sign in</button>
                    </form>
                </div>
            </div>
            <div class="relative hidden h-screen  md:block md:w-1/2" style={sectionStyle}>

            </div>
        </div>

    )
}

export default login