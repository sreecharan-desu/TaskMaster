import { useNavigate } from "react-router";
import { Message } from "../../../signup&signin-comp/Message";
import { messageAtom, updatedPassword, updatedUsername } from "../store/dashboardStore";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import {useRecoilState} from 'recoil';

export default function UpdateDetails(){
    const navigate = useNavigate();
    const [username,setUpdatedUsername] = useRecoilState(updatedUsername);
    const [password,setUpdatedPassword] = useRecoilState(updatedPassword);
    const [message,Setmessage] = useRecoilState(messageAtom);

    const setUsername = (event)=>{
        setUpdatedUsername(event.target.value);
    }

    const setPassword = (event)=>{
        setUpdatedPassword(event.target.value);
    }

    const updateDetails =async()=>{
        if(username == '' || password == ''){
            Setmessage([{message : 'Username and password cannot be empty' , success : false}]);
        }else{
            const bodyData = JSON.stringify({ username, password });
            try{
                const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/update',{
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                       authorization : "Bearer " + JSON.parse(localStorage.getItem('token'))
                    },
                    body: bodyData
                })
                const data = await response.json();
                Setmessage([{message : data.msg , success : data.success}])
                if(data.success){
                    localStorage.removeItem('token')
                    setTimeout(()=>{
                        navigate('/user/signin')
                    },1000) 
                }               
            }
            catch(e){
                Setmessage([{message : 'Error connecting server please check your internet connection',success : 'false'}])
            }
        }
    }

    return(<>
    <div className="flex-col place-content-center justify-center">
        { message ? <Message text={message[0].message} background = {message[0].success}/> : <></>}
        <div className="bg-white shadow-2xl mt-48 p-5 w-98">
            <h1 className="text-3xl font-extrabold">
                Update details
            </h1>
            <InputBox Inputtype={'text'} placeholderText={'Enter username'} onchangeFn={setUsername}/>
            <InputBox Inputtype={'password'} placeholderText={'Enter password'} onchangeFn={setPassword}/>
            <Button onclickFn={updateDetails}/>
        </div>
    </div>
    </>)
}