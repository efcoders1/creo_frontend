import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="w-screen h-screen flex">
            {/* Left side - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome to our site
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Get started - it's free. No credit card needed.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Google Sign In Button */}
                        <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-600"
                            />
                        </div>

                        {/* Continue Button */}
                        <Link  to="/home">
                        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4">
                            Continue
                        </button>
                        </Link>

                        {/* Terms and Privacy */}
                        <p className="text-xs text-gray-500 text-center">
                            By proceeding, you agree to the{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </a>
                        </p>

                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link  to="/home" className="text-blue-600 hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Illustration */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 to-blue-600 items-center justify-center relative overflow-hidden">
                {/* Illustration placeholder - we'll add the actual illustration elements here */}
                <div className="relative">
                    {/* Main illustration container */}
                    <div className="relative w-96 h-96">
                        {/* Dashboard mockup */}
                        <div className="absolute top-16 left-8 bg-white rounded-lg shadow-lg p-4 w-64 h-48 transform rotate-3">
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                                <div className="space-y-1 mt-4">
                                    <div className="flex space-x-2">
                                        <div className="h-6 bg-blue-500 rounded w-16"></div>
                                        <div className="h-6 bg-green-500 rounded w-16"></div>
                                        <div className="h-6 bg-red-500 rounded w-16"></div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="h-6 bg-yellow-500 rounded w-16"></div>
                                        <div className="h-6 bg-purple-500 rounded w-16"></div>
                                        <div className="h-6 bg-pink-500 rounded w-16"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hand pointing */}
                        <div className="absolute bottom-8 right-8">
                            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center transform -rotate-12">
                                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute top-8 right-16 w-8 h-8 bg-yellow-400 rounded-full"></div>
                        <div className="absolute bottom-32 left-4 w-6 h-6 bg-green-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
