"use client"
import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Notes(props) {
	const context = useContext(noteContext);
	const { deletenote, editnote } = context;
	const [note, setnote] = useState({
		id: '',
		title: '',
		description: '',
		tag: '',
	});

	const { notess, showalert } = props;
	const date = new Date(notess.date);
	const handeledit = (e) => {
		e.preventDefault();
		sethide('hidden');
		editnote(note.id, note.title, note.description, note.tag);
		showalert('Note Updated successfully', 'green', 'flex');
	};
	const onchange = (e) => {
		setnote({ ...note, [e.target.name]: e.target.value });
	};
	const [hide, sethide] = useState('hidden');
	const handelhide = () => {
		setnote({
			id: notess._id,
			title: notess.title,
			description: notess.description,
			tag: notess.tag,
		});
		if (hide === 'hidden') {
			sethide('flex');
		} else if (hide === 'flex') {
			sethide('hidden');
		}
	};
	const handeldel = () => {
		deletenote(notess._id);
		showalert('Note Deleted Successfully ', 'green', 'flex');
	};


	return (
		<div>

			<div
				className={`fixed inset-0 flex justify-center items-center backdrop-blur-lg ${hide}`}
			>
				<div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-4 right-4 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white "
						data-modal-hide="defaultModal"
						onClick={handelhide}
					>
						<svg
							className="w-4 h-4 z-10 "
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="#FFFFFF"
							viewBox="0 0 14 14"
						>
							<path
								stroke="#FF0000"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="3"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
					</button>
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
										value={note.title}
										minLength={5}
										required
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
										value={note.description}
										minLength={5}
										required
									></textarea>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<button
									type="button"
									className="text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900 "
									onClick={handeledit}
								>
									<span>UpDate Note</span>
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

			<div className="rounded flex-wrapflex-wrap">
				<div className="w-full flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4 box-border overflow-hidden ">
					<div>
						<h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
							{notess.title}
						</h4>
						<p className="text-gray-800 dark:text-gray-100 text-sm mb-3">
							{notess.description}
						</p>
						<span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-1 rounded dark:bg-indigo-900 dark:text-white ">
							{notess.tag}
						</span>
					</div>
					<div>
						<div className="flex items-center justify-between text-gray-800 dark:text-gray-100 mt-3">
							<div className="flex flex-col">
								<p className="text-sm">{date.toDateString()}</p>
								<p className="text-sm">{date.toLocaleTimeString()}</p>
							</div>
							<div className="flex space-x-2">
								<div
									className="w-8 h-8 rounded-full bg-gray-800 dark:bg-green-500 dark:text-gray-800 text-white flex items-center justify-center hover:bg-green-800 cursor-pointer"
									id="modal-root"
									onClick={handelhide}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="icon icon-tabler icon-tabler-pencil"
										width={20}
										height={20}
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="#ffffff"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" />
										<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
										<line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
									</svg>
								</div>
								<div
									className="w-8 h-8 rounded-full bg-gray-800 dark:bg-red-600 dark:text-gray-800 text-white flex items-center justify-center hover:bg-red-800 cursor-pointer"
									onClick={handeldel}
								>
									<svg
										className=" w-5 h-5"
										fill="#F5F5F5"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
											clipRule="evenodd"
										></path>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
