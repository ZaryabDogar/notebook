'use client';

import Notes from '@/app/components/Note';
import noteContext from '@/app/context/notes/noteContext';
import React, { useContext, useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@/app/components/Alert';




export default function Page(props:any) {
	const context = useContext(noteContext); 
	
    if (!context) {
        return <div>Loading...</div>;
    }
	const { notes ,getnotes,editnote,getuser} = context;
	const router=useRouter()
	console.log('Context values:', { notes, getnotes, getuser });
	useEffect(() => {
		const auth = localStorage.getItem('auth');
		if (auth) {
		  console.log('Refreshing and fetching notes/user');
		  router.refresh();
		  if (typeof getnotes === 'function') {
			getnotes();
		  } else {
			console.error('getnotes is not a function or undefined');
		  }
		  if (typeof getuser === 'function') {
			getuser(auth);
		  } else {
			console.error('getuser is not a function or undefined');
		  }
		} else {
		  router.push('/Pages/Signin');
		}
	  }, [getnotes, getuser, router]);
	
	const [alert, setalert] = useState({msg:"",type:"",set:"hidden"})
	const showalert=(message,type,set)=>{
	  setalert({msg:message,type:type,set:set})
	  setTimeout(() => {
		setalert({msg:"",type:"",set:"hidden"})
  
	  }, 2000);
	}
	
	return (

		
		<div>
						      <Alert alert={alert}/>


<h1 className="flex justify-center xl:text-5xl lg:text-lg md:text-lg sm:text-sm my-5">
  {notes.length === 0 ? "No Notes To Display" : "--Your Saved Notes Are Given Below--"}
</h1>

			
			
			<div className="mx-auto container py-2  overflow-hidden">
				<div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					
					{notes.map((note) => {
						return <Notes notess={note} key={note._id} showalert={showalert}/>;
					})}
				</div>
			</div>
		</div>
	);
}
