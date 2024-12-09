import { useState } from 'react';

export function Toolbar({ activeView, setActiveView }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setActiveView(activeView === 'add' ? null : 'add')}
                    className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2
                        ${activeView === 'add' 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Todo
                </button>
                <button
                    onClick={() => setActiveView('completed')}
                    className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2
                        ${activeView === 'completed'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Completed Tasks
                </button>
                <button
                    onClick={() => setActiveView('pending')}
                    className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2
                        ${activeView === 'pending'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pending Tasks
                </button>
            </div>
        </div>
    );
} 