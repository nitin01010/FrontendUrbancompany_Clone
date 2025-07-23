import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 px-4">
            <div className="text-center text-white">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-2xl mb-2">Oops! Page Not Found</p>
                <p className="text-gray-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                <Link
                    to="/"
                    className="inline-block px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
