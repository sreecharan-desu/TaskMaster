import { useEffect, useState, useRef } from "react"
import { useRecoilState } from "recoil"
import { todosAtom, updateStatus } from "../store/dashboardStore";
import { AddTodo } from "./Addtodo";
import UpdateTodo from "./updatetodo";
import toast, { Toaster } from 'react-hot-toast';

export default function Todos({ activeView }) {
    const [todos, setTodos] = useRecoilState(todosAtom);
    const [updatestatus, setUpdatestatus] = useRecoilState(updateStatus);
    const [loadingTodoId, setLoadingTodoId] = useState(null);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const prevTodosLength = useRef(0);

    useEffect(() => {
        const filter = todos.length ? todos.filter(todo => {
            if (activeView === 'completed') {
                return todo.Completed;
            } else if (activeView === 'pending') {
                return !todo.Completed;
            }
            return true; // Show all todos for 'add' view
        }) : [];
        
        setFilteredTodos(filter);
    }, [todos, activeView]);

    useEffect(() => {
        const fetchTodos = async() => {
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
                    if (data.todos.length > prevTodosLength.current) {
                        toast.success('Task created successfully!');
                    }
                    setTodos(data.todos);
                    prevTodosLength.current = data.todos.length;
                }
            } catch (error) {
                toast.error('Error connecting to server');
            }
        }
        fetchTodos();
    }, [setTodos])

    const markAsCompleted = async (todoid) => {
        setLoadingTodoId(todoid);
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
        } finally {
            setLoadingTodoId(null);
        }
    };

    const removeTodo = async (todoid) => {
        setLoadingTodoId(todoid);
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
        } finally {
            setLoadingTodoId(null);
        }
    };

    const updateTodo = (todoindex) => { 
        setUpdatestatus([{
            request: true,
            indexes: [...[todoindex]]
        }]);
    }

    return (
        <>
            <Toaster position="top-right" />
            <AddTodo/>
            <div className="space-y-6 mt-8">
                {filteredTodos && filteredTodos.map((todo) => (
                    <div key={todo._id} 
                        className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-100">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-2 h-2 rounded-full ${todo.Completed ? 'bg-green-400' : 'bg-yellow-400'} ring-4 ${todo.Completed ? 'ring-green-50' : 'ring-yellow-50'}`}></div>
                                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                                        {todo.Title}
                                    </h3>
                                    {todo.Completed && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Completed
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between space-x-6">
                                <div className="flex-1 pl-6">
                                    <p className="text-gray-600 leading-relaxed text-left whitespace-pre-wrap">
                                        {todo.Description || 'No description provided'}
                                    </p>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    {!todo.Completed && (
                                        <>
                                            <button 
                                                onClick={() => updateTodo(todo._id)}
                                                disabled={loadingTodoId === todo._id}
                                                className={`inline-flex items-center px-3 py-1.5 text-sm 
                                                    ${loadingTodoId === todo._id 
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'} 
                                                    rounded-lg transition-colors duration-200`}
                                            >
                                                {loadingTodoId === todo._id ? (
                                                    <svg className="animate-spin h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                )}
                                                {loadingTodoId === todo._id ? 'Updating...' : 'Edit'}
                                            </button>

                                            <button 
                                                onClick={() => markAsCompleted(todo._id)}
                                                disabled={loadingTodoId === todo._id}
                                                className={`inline-flex items-center px-3 py-1.5 text-sm 
                                                    ${loadingTodoId === todo._id
                                                        ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
                                                        : 'text-green-600 bg-green-50 hover:bg-green-100'} 
                                                    rounded-lg transition-colors duration-200`}
                                            >
                                                {loadingTodoId === todo._id ? (
                                                    <svg className="animate-spin h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                                {loadingTodoId === todo._id ? 'Updating...' : 'Complete'}
                                            </button>
                                        </>
                                    )}

                                    <button 
                                        onClick={() => removeTodo(todo._id)}
                                        disabled={loadingTodoId === todo._id}
                                        className={`inline-flex items-center px-3 py-1.5 text-sm 
                                            ${loadingTodoId === todo._id 
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'text-red-600 bg-red-50 hover:bg-red-100'} 
                                            rounded-lg transition-colors duration-200`}
                                    >
                                        {loadingTodoId === todo._id ? (
                                            <svg className="animate-spin h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        )}
                                        {loadingTodoId === todo._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-50">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="inline-flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-medium">
                                            {new Date(todo.Time).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </span>
                                    <span className="inline-flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                        <code className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-md">
                                            {todo._id.slice(-6)}
                                        </code>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {updatestatus[0]?.request && <UpdateTodo />}
        </>
    )
}