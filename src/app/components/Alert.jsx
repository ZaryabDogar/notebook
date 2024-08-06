import React from 'react';

function Alert(props) {
  const { alert } = props;

  // Define the class names based on the alert type
  const alertClass = alert.type === 'red'
    ? `${alert.set} fixed top-0 right-0 p-4 mt-4 mr-4 text-red-200 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-200 z-50`
    : alert.type === 'green'
    ? `${alert.set} fixed top-0 right-0 p-4 mt-4 mr-4 text-green-200 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-200 z-50`
    : '';

  return (
    <div id="alert-3" className={alertClass} role="alert">
      <svg className={`${alert.set} w-4 h-4 `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ml-3 text-sm font-medium">
        {alert.msg}
      </div>
    </div>
  );
}

export default Alert;
