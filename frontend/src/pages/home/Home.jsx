import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [secretCode, setSecretCode] = useState('');

    const handleAdminAccess = useCallback((code) => {
        if (code === 'admin') {
            setTimeout(() => navigate('/admin/signin'), 0);
        }
        return code;
    }, [navigate]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            setSecretCode(prev => {
                const newCode = (prev + e.key).slice(-5);
                return handleAdminAccess(newCode);
            });
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [handleAdminAccess]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Navbar - Only show user-related actions */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                TaskMaster
                            </h1>
                        </div>

                        {/* Only User Navigation Links */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button
                                onClick={() => navigate('/user/signin')}
                                className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/user/signup')}
                                className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity shadow-sm hover:shadow-md"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight"
                        >
                            Manage Tasks with 
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}Efficiency
                            </span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto"
                        >
                            TaskMaster helps teams and individuals organize, track, and manage 
                            their work with powerful features and a simple interface.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Task Management */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Task Management</h3>
                            <p className="text-gray-500">Create, organize, and track tasks with ease. Set priorities and deadlines.</p>
                        </motion.div>

                        {/* User Management */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">User Management</h3>
                            <p className="text-gray-500">Manage team members and their access levels with admin controls.</p>
                        </motion.div>

                        {/* Secure & Reliable */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
                            <p className="text-gray-500">Enterprise-grade security with reliable performance and data protection.</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Interactive Animation Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl overflow-hidden"
                    >
                        <div className="px-6 py-12 sm:px-12 sm:py-16 lg:py-20 lg:px-16 relative">
                            {/* Animated Background Elements */}
                            <motion.div 
                                className="absolute inset-0 opacity-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                            >
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-24 h-24 bg-white rounded-full"
                                        initial={{
                                            x: Math.random() * 100 - 50,
                                            y: Math.random() * 100 - 50,
                                            scale: 0
                                        }}
                                        animate={{
                                            x: Math.random() * 200 - 100,
                                            y: Math.random() * 200 - 100,
                                            scale: [0, 1.2, 1],
                                            opacity: [0, 0.2, 0]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 0.4,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </motion.div>

                            {/* Content */}
                            <div className="relative z-10 text-center">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-3xl sm:text-4xl font-bold text-white mb-8"
                                >
                                    Experience the Future of Task Management
                                </motion.div>
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="flex flex-wrap justify-center gap-4 text-white text-lg"
                                >
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Smart Organization</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Real-time Updates</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span>Secure & Reliable</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white/50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="text-gray-500 text-sm">
                            © 2024 TaskMaster. All rights reserved.
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-500">Made with</span>
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{ 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <svg 
                                    className="w-5 h-5 text-red-500" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </motion.div>
                            <span className="text-gray-500">by</span>
                            <a 
                                href="https://github.com/sreecharan-desu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                            >
                                sreecharan
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 