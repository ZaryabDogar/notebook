'use client';
import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Input(props) {
	const context = useContext(noteContext);

	const { addnote } = context;
	const [note, setnote] = useState({ title: '', description: '', tag: '' });
	const { showalert  } = props;
	const handelclick = (e) => {
		e.preventDefault();
		addnote(note.title, note.description, note.tag);
		setnote({ title: '', description: '', tag: '' });
		showalert('Note Added successfully', 'green', 'flex');
	};
	const onchange = (e) => {
		setnote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="  flex z-10 justify-center items-center w-full md:inset-0 h-modal md:h-full sm:mt-[5%] mt-[25%]">
				<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
					<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-900 sm:p-5">
						<form action="#">
							<div className="grid gap-4 mb-4 sm:grid-cols-2">
								<div>
									<label
										htmlFor="title"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Title
									</label>
									<input
										type="text"
										name="title"
										id="title"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="My Life&ldquo;"
										onChange={onchange}
										minLength={3}
										required
										value={note.title}
									/>
								</div>
								<div>
									<label
										htmlFor="tag"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Tag
									</label>
									<input
										type="text"
										name="tag"
										id="tag"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Cricket ,Football"
										onChange={onchange}
										value={note.tag}
									/>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="description"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Description
									</label>
									<textarea
										name="description"
										id="description"
										rows={5}
										className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="Write a description..."
										onChange={onchange}
										minLength={3}
										required
										value={note.description}
									></textarea>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<button
									type="button"
									className={`${
										note.title.length < 3 || note.description.length < 3
											? 'bg-gray-400 text-black inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-cente'
											: 'text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900'
									}  `}
									onClick={handelclick}
									disabled={
										note.title.length < 3 || note.description.length < 3
									}
								>
									<span>ADD Note</span>
									<svg
										className="w-4 h-4 rotate-0 ml-2"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 18 20"
									>
										<path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
									</svg>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
