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
            alert('You need to signin to acces this page')
          navigate('/admin/signin')
        }
    },[])

    useEffect(()=>{
        const fecthUsername = async()=>{
            const response = await fetch('http://localhost:5000/api/v1/admin/details',{
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
            const response = await fetch('http://localhost:5000/api/v1/admin/getusers',{
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                    authorization : "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                }
            })
            const data = await response.json();
            console.log(data.users);
            setUsers(data.users);   
        }
        fetchUsers();
    },[])

    return(<>
        <Navbar Username ={Username}/>
        <Wish/>
        <Users UsersList={users}/>
    </>)
}