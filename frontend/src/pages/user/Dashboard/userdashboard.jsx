import React, { useEffect } from "react";
import { useNavigate } from "react-router";
const Navbar = React.lazy(()=>import('./Components/Navbar'))
const Todos = React.lazy(()=>import('./Components/Todos'))

export default function UserDashboard(){
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
        return(<>
            <Navbar/>
            <Todos/>
        </>)
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