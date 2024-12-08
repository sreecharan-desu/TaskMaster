import { useRecoilState } from "recoil";
import { Navbar } from "../dashboard/components/navbar";
import { adminProfilemessageAtom, adminProfilepasswordAtom, adminProfileusernameAtom, username } from "../dashboard/Dashboardstore/admin-dashboard-store";
import { useEffect } from "react";
import {Message}  from '../../signup&signin-comp/Message'
import {Heading}  from '../../signup&signin-comp/heading'
import {InputBox}  from '../../signup&signin-comp/InputBox'
import {Button}  from '../../signup&signin-comp/Button'
import { useNavigate } from "react-router";


export default function AdminProfile(){

    const [Username,setUsername] = useRecoilState(username);
    const [message,setMessage] = useRecoilState(adminProfilemessageAtom);
    const [usernameProfile,setusername] = useRecoilState(adminProfileusernameAtom);
    const [password,setpassword] = useRecoilState(adminProfilepasswordAtom);

    const usernameHadler = (event)=>{
        setusername(event.target.value)
    }
    
    const passwordHadler = (event)=>{
        setpassword(event.target.value)
    }
    const navigate = useNavigate();
    const UpdateDetails = ()=>{
    // https://task-master-api-psi.vercel.app/api/v1/admin/update (PUT) 
    const bodyData = JSON.stringify({username : usernameProfile, password : password });
        const callDB=async()=>{
            try{
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/update',{
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      authorization : 'Bearer ' + JSON.parse(localStorage.getItem('Admintoken'))
                    },
                    body: bodyData
                })
                const data = await response.json();
                setMessage([{message : data.msg,success : data.success}])
                localStorage.removeItem('Admintoken')
                setTimeout(()=>{
                    navigate('/admin/signin')
                },2000)
            }
            catch(e){
                setMessage([{message : 'Error connecting server please check your internet connection',success : 'false'}])
            }
        }
        callDB();
    }
    

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
    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar Username={Username}/>
            {message && <Message text={message[0].message} background={message[0].success}/>}
            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="max-w-lg mx-auto">
                            <Heading title="Update Profile"/>
                            <div className="space-y-6">
                                <InputBox text="Username" type="text" onInputChange={usernameHadler}/>
                                <InputBox text="Password" type="password" onInputChange={passwordHadler}/>
                                <div className="pt-4">
                                    <Button text="Update Details" onclickFn={UpdateDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

