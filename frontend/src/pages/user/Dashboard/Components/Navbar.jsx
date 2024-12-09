import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Userusername } from "../store/dashboardStore";

export default function Navbar() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [username, setUsername] = useRecoilState(Userusername);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/user/signin');
            return;
        }

        const fetchUsername = async () => {
            try {
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/getusername', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: "Bearer " + JSON.parse(localStorage.getItem('token'))
                    }
                });
                const data = await response.json();
                if (data.username) {
                    setUsername(data.username);
                }
            } catch (error) {
                console.error('Failed to fetch username');
            }
        };

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        fetchUsername();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigate, setUsername]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const navigateToProfile = () => {
        navigate('/user/profile');
    };

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
            }`}>
                <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        TaskMaster
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity" 
                            title="Account" 
                            onClick={navigateToProfile}
                        >
                            {username ? username[0].toUpperCase() : 'U'}
                        </div>
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors" 
                            title="Logout" 
                            onClick={logout}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={2} 
                                stroke="currentColor" 
                                className="w-6 h-6"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" 
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-20"></div>
        </>
    );
}