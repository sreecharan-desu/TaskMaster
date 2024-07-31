import { useEffect } from "react";
import { useNavigate } from "react-router"
import { Navbar } from "./components/navbar";
import { Users } from "./components/Users";

export default function AdminDashboard(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('Admintoken')){
            alert('You need to signin to acces this page')
          navigate('/admin/signin')
        }
    },[])

    return(<>
        <Navbar/>
        <Users List={['2','sdfsdf','sdfsfsf','sdfsdfds','sdfsfs']}/>
    </>)
}