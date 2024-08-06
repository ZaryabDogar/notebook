'use client';
import React, { useState } from 'react';

import Router from 'next/router';
import Notes from './Pages/Notes/page';
import Alert from './components/Alert';
import Input from './components/Input';

export default function page() {
	const [alert, setalert] = useState({ msg: '', type: '', set: 'hidden' });
	const showalert = (message, type, set) => {
		setalert({ msg: message, type: type, set: set });
		setTimeout(() => {
			setalert({ msg: '', type: '', set: 'hidden' });
		}, 2000);
	};
	return (
		<div>
			<Alert alert={alert} />
			<Input showalert={showalert} />
			<Notes showalert={showalert} />
		</div>
	);
}
