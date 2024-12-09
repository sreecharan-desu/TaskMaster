import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todosAtom, Userusername, updatedUsername, updatedPassword } from '../Dashboard/store/dashboardStore';
import toast, { Toaster } from 'react-hot-toast';
const Navbar = React.lazy(() => import('../Dashboard/Components/Navbar'));

export default function UserProfile() {
    const navigate = useNavigate();
    const [todos,setTodos] = useRecoilState(todosAtom); // Read-only access to todos
    const currentUsername = useRecoilValue(Userusername); // Current username
    const [newUsername, setNewUsername] = useRecoilState(updatedUsername);
    const [password, setPassword] = useRecoilState(updatedPassword);
    const [isLoading, setIsLoading] = useState(false);

    // Calculate stats from todos
    const stats = {
        totalTasks: todos?.length || 0,
        completedTasks: todos?.filter(todo => todo.Completed)?.length || 0,
        pendingTasks: todos?.filter(todo => !todo.Completed)?.length || 0,
        completionRate: todos?.length 
            ? Math.round((todos.filter(todo => todo.Completed).length / todos.length) * 100)
            : 0
    };


    useEffect(() => {
        const fetchTodos = async() => {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/gettodos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            })
            const data = await response.json();
            setTodos(data.todos)
        }
        fetchTodos();
    }, [todos,setTodos])

    const handleUpdate = async () => {
        if (!newUsername || !password) {
            toast.error('Username and password cannot be empty');
            return;
        }

        setIsLoading(true);
        const updateToast = toast.loading('Updating profile...');

        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({ 
                    username: newUsername, 
                    password 
                })
            });
            const data = await response.json();
            
            if (data.success) {
                toast.success('Profile updated successfully', { id: updateToast });
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/user/signin');
                }, 1500);
            } else {
                toast.error(data.msg || 'Update failed', { id: updateToast });
            }
        } catch (error) {
            toast.error('Network error', { id: updateToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Toaster position="top-right" />
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>

            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Profile Overview Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-10">
                            <div className="flex items-center gap-8">
                                <div className="h-24 w-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                    <span className="text-4xl font-bold text-white">
                                        {currentUsername?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div className="text-white">
                                    <h1 className="text-3xl font-bold mb-2">{currentUsername}</h1>
                                    <p className="text-indigo-100 text-lg">Manage your profile settings</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                            <StatCard 
                                title="Total Tasks"
                                value={stats.totalTasks}
                                trend={stats.totalTasks > 0 ? '+' : ''}
                                color="indigo"
                            />
                            <StatCard 
                                title="Completed"
                                value={stats.completedTasks}
                                trend={`${stats.completionRate}%`}
                                color="green"
                            />
                            <StatCard 
                                title="Pending"
                                value={stats.pendingTasks}
                                trend="active"
                                color="yellow"
                            />
                            <StatCard 
                                title="This Week"
                                value={stats.thisWeekTasks}
                                trend="tasks"
                                color="purple"
                            />
                        </div>
                    </div>

                    {/* Update Profile Form */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 hover:shadow-xl transition-all duration-300">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
                                Update Profile
                            </h2>
                            <div className="space-y-8">
                                {/* Current Username Display */}
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100/50">
                                    <label className="block text-sm font-medium text-indigo-600/70 mb-2">Current Username</label>
                                    <p className="text-xl font-semibold text-gray-800">{currentUsername}</p>
                                </div>

                                {/* New Username Input */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        New Username
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
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

                                {/* Password Input */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        New Password
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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

                                {/* Buttons Container */}
                                <div className="flex gap-4 pt-6">
                                    <button
                                        onClick={handleUpdate}
                                        disabled={isLoading}
                                        className="flex-1 relative group overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 
                                            text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:shadow-xl 
                                            transform hover:-translate-y-0.5 transition-all duration-200 
                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none 
                                            disabled:hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 
                                            focus:ring-indigo-500"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Updating...
                                                </>
                                            ) : 'Update Profile'}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 
                                            transform translate-x-[-100%] group-hover:translate-x-[100%] 
                                            transition-transform duration-1000"></div>
                                    </button>
                                    <button
                                        onClick={() => navigate('/user/dashboard')}
                                        className="flex-1 relative overflow-hidden bg-gray-50 text-gray-700 py-4 px-6 rounded-xl 
                                            font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-0.5 
                                            transition-all duration-200 border-2 border-gray-100 hover:bg-gray-100 
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        <span className="relative z-10">Back to Dashboard</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/0 via-gray-200/50 to-gray-200/0 
                                            transform translate-x-[-100%] hover:translate-x-[100%] 
                                            transition-transform duration-1000"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Update StatCard styling
function StatCard({ title, value, trend, color }) {
    const colors = {
        indigo: 'bg-indigo-50/80 text-indigo-600 border-indigo-100',
        green: 'bg-green-50/80 text-green-600 border-green-100',
        yellow: 'bg-yellow-50/80 text-yellow-600 border-yellow-100',
        purple: 'bg-purple-50/80 text-purple-600 border-purple-100'
    };

    return (
        <div className={`${colors[color]} rounded-xl p-6 border backdrop-blur-sm transition-all duration-300 hover:shadow-md`}>
            <p className="text-sm font-semibold mb-2 opacity-80">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && <p className="text-sm mt-2 opacity-75 font-medium">{trend}</p>}
        </div>
    );
}