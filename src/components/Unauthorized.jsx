import React from 'react';
import { Link } from 'react-router-dom';
// import { ExclamationTriangleIcon } from '@heroicons/react/outline';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>
        <div>
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Unauthorized;