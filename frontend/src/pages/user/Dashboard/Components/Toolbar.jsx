import { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { todosAtom } from '../../../../atoms/todoAtom';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';

export function Toolbar({ activeView, setActiveView }) {
    const [todos, setTodos] = useRecoilState(todosAtom);
    const prevTodosLength = useRef(0);

    const markAsCompleted = async (todoid) => {
        const loadingToast = toast.loading('Updating task...');
        try {
            const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/user/markasdone?todoid=${todoid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            });
            const data = await response.json();
            
            if (data.success) {
                setTodos(prevTodos => 
                    prevTodos.map(todo => 
                        todo._id === todoid ? { ...todo, Completed: true } : todo
                    )
                );
                toast.success(data.msg, { id: loadingToast });
            } else {
                toast.error(data.msg, { id: loadingToast });
            }
        } catch (error) {
            toast.error('Network error. Please try again.', { id: loadingToast });
        }
    };

    const removeTodo = async (todoid) => {
        const loadingToast = toast.loading('Deleting task...');
        try {
            const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/user/removetodo?todoid=${todoid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
            });
            const data = await response.json();
            
            if (data.success) {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoid));
                toast.success(data.msg, { id: loadingToast });
            } else {
                toast.error(data.msg, { id: loadingToast });
            }
        } catch (error) {
            toast.error('Network error. Please try again.', { id: loadingToast });
        }
    };

    const fetchTodos = useCallback(async () => {
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
                prevTodosLength.current = data.todos.length;
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
            // Silently fail for polling to avoid too many error toasts
        }
    }, [setTodos]);

    // Initial fetch on mount
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // Fetch on view change
    useEffect(() => {
        fetchTodos();
    }, [activeView, fetchTodos]);

    // Setup polling every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchTodos();
        }, 5000); // 5000 milliseconds = 5 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [fetchTodos]);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => {
                        setActiveView(activeView === 'add' ? null : 'add');
                    }}
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
                    onClick={() => {
                        setActiveView('completed');
                    }}
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
                    onClick={() => {
                        setActiveView('pending');
                    }}
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