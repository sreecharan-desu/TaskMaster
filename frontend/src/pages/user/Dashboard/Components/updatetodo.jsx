import { Message } from "../../../signup&signin-comp/Message";
import { messageAtom, todosAtom, updatedDescription, updatedTitle, updateStatus } from "../store/dashboardStore";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';

export default function UpdateTodo() {
    const [updatestatus, setUpdatestatus] = useRecoilState(updateStatus);
    const [title, setTitle] = useRecoilState(updatedTitle);
    const [description, setDescription] = useRecoilState(updatedDescription);
    const [message, setMessage] = useRecoilState(messageAtom);
    const [todos, setTodos] = useRecoilState(todosAtom);

    const closeModal = () => {
        setUpdatestatus([{ request: false, indexes: [] }]);
        setTitle('');
        setDescription('');
    };

    const updateDetails = async () => {
        const loadingToast = toast.loading('Updating todo...');
        try {
            const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/user/updatetodo?todoid=${updatestatus[0].indexes[0]}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update the todos state with the new data
                setTodos(prevTodos => 
                    prevTodos.map(todo => 
                        todo._id === updatestatus[0].indexes[0]
                            ? { ...todo, Title: title, Description: description }
                            : todo
                    )
                );
                toast.success(data.msg, { id: loadingToast });
                closeModal();
            } else {
                toast.error(data.msg || 'Failed to update todo', { id: loadingToast });
            }
        } catch (error) {
            toast.error('Network error. Please try again.', { id: loadingToast });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-xl bg-white">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Update Todo</h3>
                        <button 
                            onClick={closeModal}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="Enter title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[100px]"
                                placeholder="Enter description"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateDetails}
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg transition-all"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {message[0]?.message && (
                        <div className={`p-3 rounded-lg ${
                            message[0].success 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                            {message[0].message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}