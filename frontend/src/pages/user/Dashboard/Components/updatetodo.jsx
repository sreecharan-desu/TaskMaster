import { Message } from "../../../signup&signin-comp/Message";
import { messageAtom, todosAtom, updatedDescription,updatedTitle, updateStatus} from "../store/dashboardStore";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import {useRecoilState} from 'recoil';

export default function UpdateTodo({TodoId}){
    const [title,setTitle] = useRecoilState(updatedTitle);
    const [description,setDescription] = useRecoilState(updatedDescription);
    const [message,Setmessage] = useRecoilState(messageAtom);
    const [todos,Settodos] = useRecoilState(todosAtom);
    const [updatestatus,setUpdatestatus] = useRecoilState(updateStatus); 


    const setUpdatedTitle = (event)=>{
        setTitle(event.target.value);
    }

    const setUpdatedDescription = (event)=>{
        setDescription(event.target.value);
    }

    const updateTodo =async()=>{
        if(title == '' || description == ''){
            Setmessage([{message : 'Title and Decription cannot be empty' , success : false}]);
        }else{
            try{
                const bodyData = JSON.stringify({
                    title,
                    description
                });
                const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/user/updatetodo?todoid=${TodoId}`,{
                    method  : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json',
                        authorization  : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    },
                    body : bodyData
                })
                const fetchTodos = async()=>{            
                    const response  =await fetch('https://task-master-api-psi.vercel.app/api/v1/user/gettodos',{
                        method : 'GET',
                        headers : {
                            'Content-Type' : 'application/json',
                            authorization : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                        }
                    })
                    const data = await response.json();
                    Settodos(data.todos)
                    setUpdatestatus([{
                        request : false,
                        indexes : []
                    }]);
                }
                fetchTodos();
            }
            catch(e){
                Setmessage([{message : 'Error connecting server please check your internet connection',success : 'false'}])
            }
        }
    }

    return(
    <>
    <div className="flex-col place-content-center justify-center">
        { message ? <Message text={message[0].message} background = {message[0].success}/> : <></>}
        <div className="bg-white shadow-2xl m-3 -mt-20  p-5 w-98 place-content-center">
            <h1 className="text-3xl font-extrabold place-content-center text-center">
                Update Todo
            </h1>
            <div className="place-content-center text-center">
                <InputBox Inputtype={'text'} placeholderText={'Enter Title'} onchangeFn={setUpdatedTitle}/>
                <InputBox Inputtype={'text'} placeholderText={'Enter Description'} onchangeFn={setUpdatedDescription}/>
                <Button onclickFn={updateTodo}/>
            </div>
        </div>
    </div>
    </>)
}