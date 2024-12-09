import { useEffect, useState } from 'react';

export function Wish() {
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                setGreeting('Good Morning');
            } else if (hour >= 12 && hour < 17) {
                setGreeting('Good Afternoon');
            } else if (hour >= 17 && hour < 21) {
                setGreeting('Good Evening');
            } else {
                setGreeting('Good Night');
            }
        };

        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            }));
        };

        updateGreeting();
        updateTime();

        const timer = setInterval(() => {
            updateTime();
            updateGreeting();
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Greeting Section with Time */}
                <div className="space-y-3 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        {greeting}, Admin!
                    </h2>
                    <div className="flex items-center gap-2 text-purple-100/80 justify-center md:justify-start">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg tracking-wide">{currentTime}</span>
                    </div>
                    <p className="text-purple-100/80 text-base">
                        Welcome to your dashboard control center
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-purple-500/20 rounded-xl">
                                <svg className="w-5 h-5 text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-purple-100/60">System Load</p>
                                <p className="text-lg font-bold text-white">Optimal</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-indigo-500/20 rounded-xl">
                                <svg className="w-5 h-5 text-indigo-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-indigo-100/60">Security</p>
                                <p className="text-lg font-bold text-white">Protected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}