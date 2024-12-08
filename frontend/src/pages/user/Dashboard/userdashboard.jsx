import React, { useEffect } from "react";
import { useNavigate } from "react-router";
const Navbar = React.lazy(()=>import('./Components/Navbar'))
const Todos = React.lazy(()=>import('./Components/Todos'))

export default function UserDashboard() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            setTimeout(()=>{
                navigate('/user/signin');
            },1000)
        }
    },[])
    
    if(!localStorage.getItem('token')){
        return(<>
            <Warning/>
        </>)
    }
    else{
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <nav className="bg-white shadow-sm rounded-lg mb-8">
                        {/* User Navigation */}
                    </nav>
                    <main className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                Your Tasks
                            </h1>
                            {/* Task List */}
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

function Warning(){
    return(<>
        <div className="flex justify-center place-content-center text-4xl " >
            <h1 className="text-black">
                You need to signin to acces this page!
            </h1>
        </div>
    </>)
}