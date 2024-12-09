import { useRecoilState } from "recoil";
import { Navbar } from "../dashboard/components/navbar";
import { adminProfilepasswordAtom, adminProfileusernameAtom, username } from "../dashboard/Dashboardstore/admin-dashboard-store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminProfile() {
    const [Username, setUsername] = useRecoilState(username);
    const [usernameProfile, setusername] = useRecoilState(adminProfileusernameAtom);
    const [password, setpassword] = useRecoilState(adminProfilepasswordAtom);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getInitial = (username) => {
        return username && username.length > 0 ? username[0].toUpperCase() : '?';
    };

    const UpdateDetails = async () => {
        if (!usernameProfile || !password) {
            toast.error('Username and password cannot be empty');
            return;
        }

        setIsLoading(true);
        const updateToast = toast.loading('Updating profile...');
        
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Admintoken'))
                },
                body: JSON.stringify({ 
                    username: usernameProfile, 
                    password 
                })
            });
            const data = await response.json();
            
            if (data.success) {
                toast.success(data.msg, { id: updateToast });
                localStorage.removeItem('Admintoken');
                setTimeout(() => {
                    navigate('/admin/signin');
                }, 1500);
            } else {
                toast.error(data.msg, { id: updateToast });
            }
        } catch (e) {
            toast.error('Error connecting to server', { id: updateToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            <Toaster position="top-right" />
            <Navbar Username={Username} />
            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
                    {/* Profile Header */}
                    <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8">
                        <div className="absolute inset-0 bg-grid-white/10"></div>
                        <div className="relative flex flex-col items-center">
                            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl mb-4">
                                <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white">
                                        {getInitial(Username)}
                                    </span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{Username || 'Admin'}</h2>
                            <p className="text-indigo-100">System Administrator</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-8">
                        <div className="max-w-lg mx-auto space-y-6">
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        onChange={(e) => setusername(e.target.value)}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-transparent
                                            bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:outline-none
                                            shadow-sm group-hover:shadow-md transition-all duration-200 text-gray-700 font-medium
                                            placeholder:text-gray-400/80"
                                        placeholder="Enter new username"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        onChange={(e) => setpassword(e.target.value)}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-transparent
                                            bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-indigo-500/20 focus:outline-none
                                            shadow-sm group-hover:shadow-md transition-all duration-200 text-gray-700 font-medium
                                            placeholder:text-gray-400/80"
                                        placeholder="Enter new password"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={UpdateDetails}
                                    disabled={isLoading}
                                    className="w-full px-6 py-3 text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-purple-200 active:scale-[0.98] transition-all duration-200"
                                >
                                    {isLoading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

