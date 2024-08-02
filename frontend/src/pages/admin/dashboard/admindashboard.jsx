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
            <Navbar Username ={Username}/>
            <Wish/>
            <Users UsersList={users}/>
        </>)    
    }else{
        return(<>
            <Warning/>
        </>)
    }
    

}


function Warning(){
    return(<>
        <h1 className="flex place-content-center text-3xl">
            You need to Signin to access this page
        </h1>
    </>)
}
