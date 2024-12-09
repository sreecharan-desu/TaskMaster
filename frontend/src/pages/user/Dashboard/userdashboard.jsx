import { useState, useEffect, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { todosAtom, Userusername } from "./store/dashboardStore";
import Todos from './Components/Todos';
import { Toolbar } from './Components/Toolbar';
import Navbar from './Components/Navbar';
import { AddTodo } from './Components/Addtodo';
import { useNavigate } from 'react-router-dom';
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function UserDashboard() {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('add');
    const [username, setUsername] = useRecoilState(Userusername);
    const [todos, setTodos] = useRecoilState(todosAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [isStatsLoading, setIsStatsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        todaysTasks: [],
        thisWeekTasks: [],
        todaysCompletedTasks: 0,
        todaysPendingTasks: 0,
        weeklyCompletedTasks: 0,
        completionRate: 0
    });
    const [showCelebration, setShowCelebration] = useState(false);

    const fetchTodos = async () => {
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/gettodos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            });
            const data = await response.json();
            if (data.success) {
                setTodos(data.todos);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 60*1000);

        return () => clearInterval(interval);
    }, []);

    // Combined fetch for username and todos
    useEffect(() => {
        if(!localStorage.getItem('token')){
            setTimeout(() => {
                navigate('/user/signin');
            }, 1000)
            return;
        }
        
        const fetchUserDataAndTodos = async () => {
            setIsLoading(true);
            try {
                // Fetch username
                const usernameResponse = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/getusername', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: "Bearer " + JSON.parse(localStorage.getItem('token'))
                    }
                });
                const usernameData = await usernameResponse.json();
                if (usernameData.username) {
                    setUsername(usernameData.username);
                }

                // Fetch todos
                const todosResponse = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/gettodos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                const todosData = await todosResponse.json();
                if (todosData.success) {
                    setTodos(todosData.todos);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setIsLoading(false);
                setIsStatsLoading(false);
            }
        };

        fetchUserDataAndTodos();
    }, [navigate, setUsername, setTodos]);

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
    }, [setTodos])

    // Refresh todos when switching to manage view
    useEffect(() => {
        if (activeView === 'manage') {
            const fetchTodos = async () => {
                try {
                    const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/gettodos', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                        }
                    });
                    const data = await response.json();
                    if (data.success) {
                        setTodos(data.todos);
                    }
                } catch (error) {
                    console.error('Failed to fetch todos');
                }
            };
            fetchTodos();
        }
    }, [activeView, setTodos]);

    // Calculate stats whenever todos changes
    useEffect(() => {
        const totalTasks = todos?.length || 0;
        const completedTasks = todos?.filter(todo => todo.Completed)?.length || 0;
        const pendingTasks = todos?.filter(todo => !todo.Completed)?.length || 0;
        
        // Today's tasks calculations
        const today = new Date().setHours(0, 0, 0, 0);
        const todaysTasks = todos?.filter(todo => {
            if (!todo.Time) return false;
            const todoDate = new Date(todo.Time);
            return todoDate.setHours(0, 0, 0, 0) === today;
        }) || [];

        // This week's tasks
        const thisWeekStart = new Date();
        thisWeekStart.setHours(0, 0, 0, 0);
        thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
        const thisWeekTasks = todos?.filter(todo => {
            if (!todo.Time) return false;
            const todoDate = new Date(todo.Time);
            return todoDate >= thisWeekStart;
        }) || [];

        // Calculate derived stats
        const todaysCompletedTasks = todaysTasks.filter(todo => todo.Completed).length;
        const todaysPendingTasks = todaysTasks.length - todaysCompletedTasks;
        const weeklyCompletedTasks = thisWeekTasks.filter(todo => todo.Completed).length;
        const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

        setStats({
            totalTasks,
            completedTasks,
            pendingTasks,
            todaysTasks,
            thisWeekTasks,
            todaysCompletedTasks,
            todaysPendingTasks,
            weeklyCompletedTasks,
            completionRate
        });
    }, [todos]);

    // Get productivity message based on completion rate
    const getProductivityMessage = () => {
        if (stats.completionRate >= 80) return "Outstanding productivity! 🌟";
        if (stats.completionRate >= 60) return "Great progress! Keep it up! 💪";
        if (stats.completionRate >= 40) return "You're on the right track! 🎯";
        if (stats.completionRate >= 20) return "Small steps lead to big achievements! 🌱";
        return "Let's start achieving those goals! 🚀";
    };

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 21) return "Good evening";
        return "Good night";
    };

    // Get motivational message based on time and tasks
    const getTimeBasedMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return stats.pendingTasks > 0 
                ? "Start your day strong! 🌅" 
                : "Perfect morning start! ☀️";
        }
        if (hour < 17) {
            return stats.pendingTasks > 0 
                ? "Keep the momentum going! 💪" 
                : "Fantastic progress today! 🌟";
        }
        if (hour < 21) {
            return stats.pendingTasks > 0 
                ? "There's still time to achieve more! 🌙" 
                : "What a productive day! 🌆";
        }
        return stats.pendingTasks > 0 
            ? "Wrap up your day with a final push! ✨" 
            : "Rest well, champion! 🌙";
    };

    // Particles initialization
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    // Check for 100% completion whenever stats change
    useEffect(() => {
        if (stats.totalTasks > 0 && stats.completionRate === 100) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 20000);
        } else {
            setShowCelebration(false);
        }
    }, [stats.completionRate, stats.totalTasks]);

    if(!localStorage.getItem('token')){
        return <div className="text-center py-12">
            <p className="text-red-600">Please login to continue</p>
        </div>;
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Navbar username={username} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Enhanced Welcome Section */}
                <div className="mb-12 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-sm">
                    <div className="flex flex-col space-y-3">
                        <h2 className="text-2xl sm:text-3xl text-gray-700 font-semibold tracking-wide">
                            {getGreeting()},
                        </h2>
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {username || 'User'}
                            </span>
                        </h1>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                        <p className="text-lg text-gray-500 font-medium">
                            <span className="inline-block mr-2"></span>
                            {new Date().toLocaleDateString('en-IN', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </p>
                        <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
                        <p className="text-lg text-indigo-600 font-semibold">
                            {getTimeBasedMessage()}
                        </p>
                    </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Today's Tasks Card */}
                    <div className="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-gray-600 font-semibold tracking-wide">Today's Tasks</h2>
                            <span className="bg-indigo-100 text-indigo-600 py-1.5 px-4 rounded-full text-xs font-medium uppercase tracking-wider">
                                Today
                            </span>
                        </div>
                        {isStatsLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-4xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {stats.todaysTasks.length}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">Completed</p>
                                        <p className="text-sm font-bold text-green-600">{stats.todaysCompletedTasks}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">Pending</p>
                                        <p className="text-sm font-bold text-orange-600">{stats.todaysPendingTasks}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Weekly Progress Card */}
                    <div className="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-green-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-gray-600 font-semibold tracking-wide">Weekly Progress</h2>
                            <span className="bg-green-100 text-green-600 py-1.5 px-4 rounded-full text-xs font-medium uppercase tracking-wider">
                                This Week
                            </span>
                        </div>
                        {isStatsLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-4xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                    {stats.thisWeekTasks.length}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">Completed</p>
                                        <p className="text-sm font-bold text-green-600">{stats.weeklyCompletedTasks}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-500">Pending</p>
                                        <p className="text-sm font-bold text-orange-600">
                                            {stats.thisWeekTasks.length - stats.weeklyCompletedTasks}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Overall Progress Card */}
                    <div className="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-purple-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-gray-600 font-semibold tracking-wide">Overall Progress</h2>
                            <span className="bg-purple-100 text-purple-600 py-1.5 px-4 rounded-full text-xs font-medium uppercase tracking-wider">
                                All Time
                            </span>
                        </div>
                        {isStatsLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-4xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    {stats.completionRate}%
                                </p>
                                <div className="space-y-3">
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div 
                                            className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${stats.completionRate}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <p className="font-medium text-gray-500">
                                            {stats.completedTasks} completed
                                        </p>
                                        <p className="font-medium text-gray-500">
                                            {stats.totalTasks} total
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Productivity Insights Card */}
                    <div className="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-orange-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-gray-600 font-semibold tracking-wide">Productivity</h2>
                            <span className="bg-orange-100 text-orange-600 py-1.5 px-4 rounded-full text-xs font-medium uppercase tracking-wider">
                                Insights
                            </span>
                        </div>
                        {isStatsLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-lg font-semibold text-gray-900 leading-snug">
                                    {getProductivityMessage()}
                                </p>
                                <div className="pt-2 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {stats.pendingTasks === 0 
                                            ? "Incredible! You've completed all your tasks! Time to set new goals and keep the momentum going! 🎉" 
                                            : `You're just ${stats.pendingTasks} task${stats.pendingTasks === 1 ? '' : 's'} away from achieving all your goals! Keep pushing forward! 💪`
                                        }
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Toolbar activeView={activeView} setActiveView={setActiveView} />
                
                {/* Main Content */}
                <div className="mt-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Context Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {activeView === 'completed' && (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Completed Tasks
                                        </span>
                                    )}
                                    {activeView === 'pending' && (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Pending Tasks
                                        </span>
                                    )}
                                    {activeView === 'add' && (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add New Task
                                        </span>
                                    )}
                                    {!activeView && (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add New Task
                                        </span>
                                    )}
                                </h2>
                                <p className="mt-1 text-gray-600">
                                    {activeView === 'completed' && "Here are all your completed tasks"}
                                    {activeView === 'pending' && "Tasks that still need your attention"}
                                    {(activeView === 'add' || !activeView) && "Create a new task to get started"}
                                </p>
                            </div>

                            {activeView ? (
                                activeView === 'add' ? <AddTodo /> : <Todos activeView={activeView} />
                            ) : (
                                <AddTodo />
                            )}
                        </>
                    )}
                </div>
            </div>
            {showCelebration && (
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        fullScreen: {
                            enable: true,
                            zIndex: 1
                        },
                        fpsLimit: 120,
                        particles: {
                            number: {
                                value: 100,
                                density: {
                                    enable: true,
                                    value_area: 1000
                                }
                            },
                            color: {
                                value: ["#FFD700", "#FF69B4", "#4CAF50", "#00BCD4", "#9C27B0"],
                                animation: {
                                    enable: true,
                                    speed: 20,
                                    sync: false
                                }
                            },
                            shape: {
                                type: ["circle", "star"],
                                options: {
                                    star: {
                                        sides: 5
                                    }
                                }
                            },
                            opacity: {
                                value: 0.8,
                                random: true,
                                animation: {
                                    enable: true,
                                    speed: 0.5,
                                    minimumValue: 0.3,
                                    sync: false
                                }
                            },
                            size: {
                                value: 5,
                                random: {
                                    enable: true,
                                    minimumValue: 2
                                },
                                animation: {
                                    enable: true,
                                    speed: 2,
                                    minimumValue: 1,
                                    sync: false
                                }
                            },
                            move: {
                                enable: true,
                                speed: 3,
                                direction: "none",
                                random: false,
                                straight: false,
                                outModes: {
                                    default: "out",
                                    bottom: "out",
                                    left: "out",
                                    right: "out",
                                    top: "out"
                                },
                                attract: {
                                    enable: true,
                                    distance: 200,
                                    rotate: {
                                        x: 600,
                                        y: 1200
                                    }
                                }
                            }
                        },
                        interactivity: {
                            detectsOn: "canvas",
                            events: {
                                onHover: {
                                    enable: true,
                                    mode: ["grab", "bubble"],
                                    parallax: {
                                        enable: true,
                                        force: 60,
                                        smooth: 10
                                    }
                                },
                                onClick: {
                                    enable: true,
                                    mode: "push"
                                }
                            },
                            modes: {
                                grab: {
                                    distance: 200,
                                    links: {
                                        opacity: 0.4
                                    }
                                },
                                bubble: {
                                    distance: 200,
                                    size: 12,
                                    duration: 2,
                                    opacity: 0.8,
                                    speed: 3
                                },
                                push: {
                                    quantity: 6
                                }
                            }
                        },
                        detectRetina: true,
                        background: {
                            color: "transparent",
                            image: "",
                            position: "50% 50%",
                            repeat: "no-repeat",
                            size: "cover",
                            opacity: 0
                        },
                        style: {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            zIndex: 1,
                            top: 0,
                            left: 0,
                            pointerEvents: "none",
                            background: "transparent"
                        }
                    }}
                    style={{
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                        background: "transparent"
                    }}
                />
            )}

            {showCelebration && (
                <div 
                    className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                        bg-white/90 px-8 py-4 rounded-full shadow-lg border border-green-200
                        animate-bounce flex items-center gap-3 transition-all duration-500 ease-in-out"
                >
                    <span className="text-4xl animate-spin-slow">🎉</span>
                    <p className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                        Incredible! All Tasks Completed! 
                    </p>
                    <span className="text-4xl animate-pulse">🏆</span>
                </div>
            )}
        </div>
    );
}