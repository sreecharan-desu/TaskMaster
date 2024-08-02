import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Heading } from "../../signup&signin-comp/heading";
import { InputBox } from "../../signup&signin-comp/InputBox";
import { Button } from "../../signup&signin-comp/Button";
import { Hr } from "../../signup&signin-comp/Hr";
import { Message } from "../../signup&signin-comp/Message";
import { SigninDialogue } from "../../signup&signin-comp/Dialogue";
import { useRecoilState } from "recoil";
import { adminsignupmessageAtom, adminsignuppasswordAtom, adminsignupusernameAtom} from "./store/signupstore";

export default function AdminSignup(){
    
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('Admintoken')){
          navigate('/admin/dashboard')
        }
    },[])

    const [message,setMessage] = useRecoilState(adminsignupmessageAtom);
    const [username,setusername] = useRecoilState(adminsignupusernameAtom);
    const [password,setpassword] = useRecoilState(adminsignuppasswordAtom);


    const usernameHadler = (event)=>{
        setusername(event.target.value)
    }

    const passwordHadler = (event)=>{
        setpassword(event.target.value)
    }

    const SignupUser = ()=>{
        // https://task-master-api-psi.vercel.app/api/v1/user/signup (POST)
        const bodyData = JSON.stringify({ username, password });
        const callDB=async()=>{
            try{
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/signup',{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: bodyData
                })
                const data = await response.json();
                setMessage([{message : data.msg,success : data.success}])
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
                    <Heading title={'Signup'}/>
                    <InputBox text = {'Username'} type={'text'} onInputChange = {usernameHadler}/>
                    <InputBox text = {'Password'} type={'password'} onInputChange = {passwordHadler}/>
                    <Button text={'Signup'} onclickFn = {SignupUser}/>
                    <Hr/>
                    <br />
                    <SigninDialogue message={'Already have an account ?'} link = {'/admin/signin'}  linkText={'Signin'} />
            </div>
        </div>
        </>
    )
}
