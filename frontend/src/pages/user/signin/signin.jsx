import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Heading } from "../../signup&signin-comp/heading";
import { InputBox } from "../../signup&signin-comp/InputBox";
import { Button } from "../../signup&signin-comp/Button";
import { Hr } from "../../signup&signin-comp/Hr";
import { Message } from "../../signup&signin-comp/Message";
import { SigninDialogue } from "../../signup&signin-comp/Dialogue";
import { useRecoilState } from "recoil";
import { userSigninmessageAtom, userSigninpasswordAtom, userSigninusernameAtom } from "./store/signinstore";

export default function UserSignin(){
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
          navigate('/user/dashboard')
        }
      },[])

    const [message,setMessage] = useRecoilState(userSigninmessageAtom);
    const [username,setusername] = useRecoilState(userSigninusernameAtom);
    const [password,setpassword] = useRecoilState(userSigninpasswordAtom);


    const usernameHadler = (event)=>{
        setusername(event.target.value)
    }

    const passwordHadler = (event)=>{
        setpassword(event.target.value)
    }

    const SigninUser = ()=>{
        // http://localhost:5000/api/v1/user/signin (POST)
        const bodyData = JSON.stringify({ username, password });
        const callDB=async()=>{
            try{
                const response = await fetch('http://localhost:5000/api/v1/user/signin',{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: bodyData
                })
                const data = await response.json();
                localStorage.setItem('token',JSON.stringify(data.token))
                useEffect(()=>{
                    if(localStorage.getItem('token')){
                      navigate('/user/dashboard')
                    }
                },[data])
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
                    <SigninDialogue message={'Dont have an account ?'} link = {'/user/signup'}  linkText={'Signup'} />
            </div>
        </div>
        </>
    )
}
