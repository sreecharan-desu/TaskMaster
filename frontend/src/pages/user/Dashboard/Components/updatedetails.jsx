import { Message } from "../../../signup&signin-comp/Message";
import { messageAtom, updatedPassword, updatedUsername } from "../store/dashboardStore";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import {useRecoilState} from 'recoil';

export default function UpdateDetails(){

    const [updateUsername,setUpdatedUsername] = useRecoilState(updatedUsername);
    const [updatePassword,setUpdatedPassword] = useRecoilState(updatedPassword);
    const [message,Setmessage] = useRecoilState(messageAtom);

    const setUsername = (event)=>{
        setUpdatedUsername(event.target.value);
    }

    const setPassword = (event)=>{
        setUpdatedPassword(event.target.value);
    }

    const updateDetails =async()=>{
        const bodyData = JSON.stringify({
            username : updateUsername,
            password : updatedPassword  
        })
        const response = await fetch('http://localhost:5000/api/v1/user/update',{
            method : 'PUT',
            headers : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            body : bodyData
        });
        const data = await response.json();
        Setmessage(data.msg);
    }

    return(<>
    <div className="flex place-content-center">
        { message ? <Message text={message[0].message} background = {message[0].success}/> : <></>}
        <div className="bg-white shadow-2xl mt-48 p-5 w-1/2">
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