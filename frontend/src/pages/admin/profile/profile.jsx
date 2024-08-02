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
        <>
            <Navbar Username={Username}/>
            { message ? <Message text={message[0].message} background = {message[0].success}/> : <></>}
            <div className="flex place-content-center mt-28">
                <div className="flex-col justify-center place-content-center bg-white shadow-lg text-center p-5 pb-10 w-96 rounded-sm">
                        <Heading title={'Update Details'}/>
                        <InputBox text = {'Username'} type={'text'} onInputChange = {usernameHadler}/>
                        <InputBox text = {'Password'} type={'password'} onInputChange = {passwordHadler}/>
                        <Button text={'Update'} onclickFn = {UpdateDetails}/>
                </div>
            </div>
        </>
    )
}

