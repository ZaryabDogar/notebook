"use client"
import Notes from "../Notes/page";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Alert from "../../components/Alert";





function Signup() {
    const [alert, setalert] = useState({msg:"",type:"",set:"hidden"})
    const showalert=(message,type,set)=>{
      setalert({msg:message,type:type,set:set})
      setTimeout(() => {
        setalert({msg:"",type:"",set:"hidden"})
  
      }, 2000);
    }
    const [credentials, setcredentials] = useState({name:"",email:"",password:""})
    const router = useRouter();

	const handelsubmit=async(e)=>{
		e.preventDefault();
		const response = await fetch(`https://note-be-two.vercel.app/api/auth/createuser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				
			},
			body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
			
		});
		const json = await response.json();
		
		if(json.success){
            showalert("Successfully User Created",'green','flex')
			//save the auth token redirect
			localStorage.setItem('auth',json.Auth_token)
            router.push('/Pages/Signin');
		}else {
            if (Array.isArray(json.error)) {
              // If errors is an array, map over it and display each error message
              const errorMsg = json.error.map(err => `${err.path}: ${err.msg}`).join('\n');
              showalert(`Error(s):\n${errorMsg}`, 'red', 'flex');
              console.log('Errors:', json.error);
            } else if (typeof json.error === 'object') {
              // If error is an object, display its properties (for debugging)
              console.error('Unexpected error format:', json.error);
              showalert(`Unexpected error occurred: ${JSON.stringify(json.error)}`, 'red', 'flex');
            } else {
              // If error is neither an array nor an object
              console.error('Unknown error type:', json.error);
              showalert(json.error, 'red', 'flex');
            }
        }
	}
	const onchange=(e)=>{
		setcredentials({...credentials,[e.target.name]:e.target.value})
	
    }
    return (
        <>
              <Alert alert={alert}/>

        <div className="h-full bg-gradient-to-br from-black to-indigo-900 w-full py-16 px-4 ">
            <div className="flex flex-col items-center justify-center h-full">
              
                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                    <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800 mb-4">
                        Sign Up to your account
                    </p>
                    <p className="text-sm mt-4 font-medium leading-none text-gray-500">
						Dont worry! we dont share your email with anyone...
					
					</p>
                  
<form action="#" onSubmit={handelsubmit}>
                    <div className="relative">
                        
                    <div className="mt-6  w-full">
                        <label htmlFor="inputField"  className="text-sm font-medium leading-none text-gray-800">Name</label>
                        <div className="relative flex items-center justify-center">
                            <input aria-label="enter name" role="input" type="name"
                            onChange={onchange}
                            value={credentials.name}
                            name="name"
                            minLength={3}
                            className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                
                            </div>
                        </div>
                    </div>
						<label
							htmlFor="inputField"
							className="text-sm font-medium leading-none text-gray-800"
						>
							Email
						</label>
						<div className="absolute inset-y-0 left-0 top-[6.5rem]  flex items-center pl-2 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 16"
							>
								<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
								<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
							</svg>
						</div>
						<input
							aria-label="enter email adress"
							role="input"
							type="email"
                            onChange={onchange}
							value={credentials.email}
                            name="email"
                            minLength={5}
							className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-8 mt-2"
						/>
					</div>
                    <div className="mt-6  w-full">
                        <label htmlFor="inputField"  className="text-sm font-medium leading-none text-gray-800">Password</label>
                        <div className="relative flex items-center justify-center">
                            <input aria-label="enter Password" role="input" type="password"
                            onChange={onchange}
                            value={credentials.password}
                            name="password"
                            minLength={5}
                            className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button role="button" aria-label="create my account" className={`${credentials.password.length<6||credentials.name.length<3||credentials.email.length<5 ?'focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 text-sm font-semibold leading-none text-gray-400 focus:outline-none bg-indigo-400 border rounded hover:bg-indigo-500 py-4 w-full':'focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full'}`} >
                            Sign Up
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div></>
    );
}

export default Signup;
