import { useEffect, Suspense, useState } from "react";
import { useNavigate } from "react-router"
import { Navbar } from "./components/navbar";
import { Users } from "./components/Users";
import { useRecoilState } from "recoil";
import { username, UsersList } from "./Dashboardstore/admin-dashboard-store";
import { Wish } from "./components/Wish";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [Username, setUsername] = useRecoilState(username);
    const [users, setUsers] = useRecoilState(UsersList);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users?.filter(user => {
        if (!searchTerm) return true;
        if (!user || !user.username || !user.email) return false;
        
        const search = searchTerm.toLowerCase().trim();
        return user.username.toLowerCase().includes(search) ||
               user.email.toLowerCase().includes(search);
    }) || [];

    useEffect(() => {
        if (!localStorage.getItem('Admintoken')) {
            toast.error('Please login first');
            setTimeout(() => {
                navigate('/admin/signin')
            }, 1000)
            return;
        }

        const fetchData = async () => {
            const loadingToast = toast.loading('Loading dashboard...');
            try {
                // Fetch username and users in parallel
                const [usernameResponse, usersResponse] = await Promise.all([
                    fetch('https://task-master-api-psi.vercel.app/api/v1/admin/details', {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                        }
                    }),
                    fetch('https://task-master-api-psi.vercel.app/api/v1/admin/getusers', {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                        }
                    })
                ]);

                const [usernameData, usersData] = await Promise.all([
                    usernameResponse.json(),
                    usersResponse.json()
                ]);

                setUsername(usernameData.username);
                setUsers(usersData.users);
                toast.success('Dashboard loaded successfully', { id: loadingToast });
            } catch (error) {
                toast.error('Failed to load dashboard', { id: loadingToast });
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [navigate, setUsername, setUsers]);

    const deleteUser = async (userId) => {
        const loadingToast = toast.loading('Deleting user...');
        try {
            const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/admin/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                toast.success('User deleted successfully', { id: loadingToast });
                // Refresh users list
                setUsers(users.filter(user => user._id !== userId));
            } else {
                toast.error(data.msg || 'Failed to delete user', { id: loadingToast });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user', { id: loadingToast });
        }
    };

    if (!localStorage.getItem('Admintoken')) {
        return <Warning />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Toaster position="top-right" />
            <div className="mb-8">
                <Suspense fallback={<LoadingSpinner />}>
                    <Navbar Username={Username} />
                </Suspense>
            </div>

        
                {/* Welcome Section with Gradient */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 
                    rounded-3xl shadow-lg mb-8 group">
                    <div className="absolute inset-0 bg-grid-white/10 mask-gradient"></div>
                    <div className="relative px-8 py-12">
                        <Wish />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent 
                        via-white/25 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                {/* Quick Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 
                        shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 rounded-2xl">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Users</p>
                                <h3 className="text-2xl font-bold text-gray-900">{users?.length || 0}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 
                        shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-2xl">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active Users</p>
                                <h3 className="text-2xl font-bold text-gray-900">{users?.length || 0}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 
                        shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-2xl">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">System Status</p>
                                <h3 className="text-lg font-semibold text-green-600">Operational</h3>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Users Management Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                            bg-clip-text text-transparent">
                            Manage Users
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div> */}
                                {/* <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search users..."
                                    className="pl-10 pr-4 py-2 w-64 rounded-xl border border-gray-200 
                                        focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                        bg-white/70 backdrop-blur-sm transition-all duration-300"
                                /> */}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 
                        p-8 transition-all duration-300 hover:shadow-xl">
                        <Users UsersList={filteredUsers} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Warning() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 
            flex items-center justify-center px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 
                max-w-md w-full text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                    bg-clip-text text-transparent">
                    Access Denied
                </h1>
                <p className="text-gray-600">
                    Please sign in to access the admin dashboard
                </p>
                <button
                    onClick={() => window.location.href = '/admin/signin'}
                    className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
                        py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl 
                        transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    Go to Sign In
                </button>
            </div>
        </div>
    );
}

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
}
