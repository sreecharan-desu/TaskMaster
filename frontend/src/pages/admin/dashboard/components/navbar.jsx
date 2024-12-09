import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export function Navbar({ Username }) {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll listener for navbar effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('Admintoken');
        navigate('/');
    };

    const navigateToProfile = () => {
        navigate('/admin/profile');
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            TaskMaster
                        </h1>
                        <span className="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
                            ADMIN
                        </span>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center space-x-4">
                        {/* Profile Button */}
                        <div 
                            onClick={navigateToProfile}
                            className="relative group"
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center 
                                bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold 
                                cursor-pointer transform transition-all duration-200 
                                hover:shadow-lg hover:-translate-y-0.5"
                            >
                                {Username ? (
                                    Username[0].toUpperCase()
                                ) : (
                                    <Profile />
                                )}
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            className="w-10 h-10 rounded-xl flex items-center justify-center 
                                bg-gray-100 hover:bg-gray-200 cursor-pointer transform 
                                transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                                border border-gray-200"
                            title="Logout"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={2} 
                                stroke="currentColor" 
                                className="w-5 h-5 text-gray-600"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" 
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Profile() {
    return (
        <div className="animate-pulse w-6 h-6 rounded-full bg-white/50"></div>
    );
}