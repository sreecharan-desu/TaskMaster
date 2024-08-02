import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Heading } from "../../signup&signin-comp/heading";
import { InputBox } from "../../signup&signin-comp/InputBox";
import { Button } from "../../signup&signin-comp/Button";
import { Hr } from "../../signup&signin-comp/Hr";
import { Message } from "../../signup&signin-comp/Message";
import { SigninDialogue } from "../../signup&signin-comp/Dialogue";
import { useRecoilState } from "recoil";
import { adminsigninmessageAtom, adminsigninpasswordAtom, adminsigninusernameatom} from "./store/signinstore";

export default function AdminSignin(){

    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('Admintoken')){
          navigate('/admin/dashboard')
        }
    },[])

    const [message,setMessage] = useRecoilState(adminsigninmessageAtom);
    const [username,setusername] = useRecoilState(adminsigninusernameatom);
    const [password,setpassword] = useRecoilState(adminsigninpasswordAtom);


    const usernameHadler = (event)=>{
        setusername(event.target.value)
    }

    const passwordHadler = (event)=>{
        setpassword(event.target.value)
    }

    const SigninUser = ()=>{
        if(username == '' || password == ''){
            alert('Username and password must not be empty')
        }
        const bodyData = JSON.stringify({ username, password });
        const callDB=async()=>{
            try{
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/signin',{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: bodyData
                })
                const data = await response.json();
                if(data.msg){
                    setMessage([{message : data.msg,success : false}])
                }else if(data.token){
                    localStorage.setItem('Admintoken',JSON.stringify(data.token))
<<<<<<< HEAD
                    navigate('/admin/dashboard');
=======
                    navigate('/admin/dashboard')
>>>>>>> 1b97c0047409475ac486d6640dbc3e43ded2d489
                }
            }
            catch(e){
                setMessage([{message : 'Error connecting server please check your internet connection',success : 'false'}])
            }
        }
        callDB();
    }

    return(
    <>
        { message ? <Message text={message[0].message} background = {message[0].success}/> : <></>}
        <div className="flex place-content-center mt-28">
            <div className="flex-col justify-center place-content-center bg-white shadow-lg text-center p-5 pb-10 w-96 rounded-sm">
                    <Heading title={'SignIn'}/>
                    <InputBox text = {'Username'} type={'text'} onInputChange = {usernameHadler}/>
                    <InputBox text = {'Password'} type={'password'} onInputChange = {passwordHadler}/>
                    <Button text={'Signin'} onclickFn = {SigninUser}/>
                    <Hr/>
                    <br />
                    <SigninDialogue message={'Dont have an account ?'} link = {'/admin/signup'}  linkText={'Signup'} />
            </div>
        </div>
        </>
    )
}
