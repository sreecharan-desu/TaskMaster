import { useEffect } from "react"
import { useNavigate } from "react-router"


export default function UserDashboard(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            alert('You need to signin to acces this page')
            navigate('/user/signin')
        }
      },[])

    return(<>

        <h1>
            User Dashboard
        </h1>

    </>)
}

function Warning(){
    return(<>
        <h1 className="flex font-bold text-4xl place-content-center">
            Signin to access this page
        </h1>
    </>)
}