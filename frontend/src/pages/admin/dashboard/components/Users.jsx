import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export function Users({ UsersList }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (userId) => {
        setIsDeleting(true);
        const deleteToast = toast.loading('Deleting user...');

        try {
            const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/admin/deleteuser?userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                }
            });

            const data = await response.json();
            
            if (data.success) {
                toast.success(data.msg, { id: deleteToast });
                window.location.reload();
            } else {
                toast.error(data.msg || 'Failed to delete user', { id: deleteToast });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user. Please try again.', { id: deleteToast });
        } finally {
            setIsDeleting(false);
        }
    };

    const getInitial = (username) => {
        return username && username.length > 0 ? username[0].toUpperCase() : '?';
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="text-sm text-gray-500">
                    Total Users: {UsersList?.length || 0}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {UsersList && UsersList.map((user, index) => (
                    <motion.div
                        key={user._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg shadow-inner">
                                    {getInitial(user.Username)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {user.Username}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        ID: {user._id.slice(-8)}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    disabled={isDeleting}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                >
                                    {isDeleting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            Deleting...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {(!UsersList || UsersList.length === 0) && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
                    <p className="text-gray-500">There are no users registered in the system yet.</p>
                </motion.div>
            )}
        </div>
    );
}