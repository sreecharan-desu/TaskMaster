import { useEffect } from "react";
import { useNavigate } from "react-router"
import { Navbar } from "./components/navbar";
import { Users } from "./components/Users";
import { useRecoilState, useRecoilValue } from "recoil";
import { username, UsersList } from "./Dashboardstore/admin-dashboard-store";
import { Wish } from "./components/Wish";

export default function AdminDashboard(){
    const navigate = useNavigate();
    const [Username,setUsername] = useRecoilState(username);
    const [users,setUsers] = useRecoilState(UsersList);

    useEffect(()=>{
        if(!localStorage.getItem('Admintoken')){
            setTimeout(()=>{
                navigate('/admin/signin')
            },1000)
        }
    },[])

    if(localStorage.getItem('Admintoken')){
        useEffect(()=>{
            const fecthUsername = async()=>{
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/details',{
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                        authorization : "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                    }
                });
                const data = await response.json();
                setUsername(data.username);
            }
            fecthUsername();
        },[])
    
    
    
        useEffect(()=>{
            const fetchUsers = async()=>{
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/getusers',{
                    method : 'GET',
                    headers : {
                        "Content-Type" : "application/json",
                        authorization : "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                    }
                })
                const data = await response.json();
                setUsers(data.users);   
            }
            fetchUsers();
        },[])
        return(<>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Navbar Username={Username}/>
                    <div className="mt-8">
                        <Wish/>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <Users UsersList={users}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)    
    }else{
        return(<>
            <Warning/>
        </>)
    }
    

}


function Warning(){
    return(<>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Access Denied
                </h1>
                <p className="text-gray-600">
                    You need to sign in to access this page
                </p>
            </div>
        </div>
    </>)
}
