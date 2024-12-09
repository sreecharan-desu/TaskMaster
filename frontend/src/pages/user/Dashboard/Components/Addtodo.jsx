import { useRecoilState } from "recoil";
import { todoDescription, todosAtom, todoTitle, messageAtom } from "../store/dashboardStore";
import { useState } from "react";

export function AddTodo() {
    const [title, setTitle] = useRecoilState(todoTitle);
    const [description, setDescription] = useRecoilState(todoDescription);
    const [todos, setTodos] = useRecoilState(todosAtom);
    const [message, setMessage] = useRecoilState(messageAtom);
    const [isLoading, setIsLoading] = useState(false);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

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

    const addTodo = async () => {
        if (!title.trim()) {
            setMessage([{ message: 'Title cannot be empty', success: false }]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/addtodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({ title, description })
            });
            const data = await response.json();
            
            if (data.success) {
                if (data.todo) {
                    setTodos(prevTodos => [...prevTodos, data.todo]);
                }
                setMessage([{ message: 'Task added successfully!', success: true }]);
                setTitle('');
                setDescription('');
            } else {
                setMessage([{ message: data.msg || 'Failed to add task', success: false }]);
            }
        } catch (error) {
            setMessage([{ message: 'Error connecting to server', success: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addTodo();
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="What's on your mind for today? 🎯"
                        value={title}
                        onChange={handleTitleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Add some details to help you achieve this goal ✨"
                        value={description}
                        onChange={handleDescriptionChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none h-24 placeholder-gray-400"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={addTodo}
                        disabled={isLoading}
                        className={`px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg 
                            hover:from-indigo-600 hover:to-purple-700 transition-all focus:ring-2 focus:ring-indigo-500 
                            focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating magic...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Goal
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}