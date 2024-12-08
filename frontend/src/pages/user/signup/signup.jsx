import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Heading } from "../../signup&signin-comp/heading";
import { InputBox } from "../../signup&signin-comp/InputBox";
import { Button } from "../../signup&signin-comp/Button";
import { Hr } from "../../signup&signin-comp/Hr";
import { Message } from "../../signup&signin-comp/Message";
import { SigninDialogue } from "../../signup&signin-comp/Dialogue";
import { useRecoilState } from "recoil";
import { usersignupmessageAtom, usersignuppasswordAtom, usersignupusernameAtom } from "./store/signupstore";

export default function UserSignup() {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/user/dashboard')
        }
    }, [])

    const [message, setMessage] = useRecoilState(usersignupmessageAtom);
    const [username, setUsername] = useRecoilState(usersignupusernameAtom);
    const [password, setPassword] = useRecoilState(usersignuppasswordAtom);

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const SignupUser = () => {
        if(username === '' || password === '') {
            alert('Username and password must not be empty')
            return;
        }
        
        const bodyData = JSON.stringify({ username, password });
        const callDB = async() => {
            try {
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: bodyData
                })
                const data = await response.json();
                setMessage([{message: data.msg, success: data.success}])
            } catch(e) {
                setMessage([{
                    message: 'Error connecting server please check your internet connection',
                    success: false
                }])
            }
        }
        callDB();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {message && <Message text={message[0].message} background={message[0].success}/>}
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
                    <Heading title="Sign Up"/>
                    <div className="space-y-6">
                        <InputBox text="Username" type="text" onInputChange={usernameHandler}/>
                        <InputBox text="Password" type="password" onInputChange={passwordHandler}/>
                        <Button text="Sign Up" onclickFn={SignupUser}/>
                    </div>
                    <Hr/>
                    <SigninDialogue 
                        message="Already have an account?" 
                        link="/user/signin" 
                        linkText="Sign In"
                    />
                </div>
            </div>
        </div>
    )
}
