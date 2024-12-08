import React from 'react'
const Navbar = React.lazy(()=>import('../Dashboard/Components/Navbar'));
const UpdateDetails = React.lazy(()=>import('../Dashboard/Components/updatedetails'));

export default function UserProfile() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="max-w-lg mx-auto">
                            <Heading title="User Profile"/>
                            <div className="space-y-6">
                                {/* Profile Form Fields */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}