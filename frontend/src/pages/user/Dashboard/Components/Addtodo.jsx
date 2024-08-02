import { useRecoilState } from "recoil";
import { InputBox } from "./InputBox";
import { todoDescription, todosAtom, todoTitle } from "../store/dashboardStore";


export function AddTodo(){


    const [title,setTitle] = useRecoilState(todoTitle);
    const [description,setdescription] = useRecoilState(todoDescription);
    const [todos,Settodos] = useRecoilState(todosAtom);

    const titlesetter = (event)=>{
        setTitle(event.target.value)
    }

    const descriptionsetter = (event)=>{
        setdescription(event.target.value)
    }

    const addTodo = async()=>{
        const bodyData = JSON.stringify({ title,description })
        const resposne = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/addtodo',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                authorization : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            },
            body : bodyData
        })
        const data = await resposne.json();
        console.log(data);
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
        }
        fetchTodos();
    }

    return(<>
        <div className="justify-center place-content-center m-10 p-10 shadow-xl rounded-xl">
            <h1 className="text-xl first-letter:text-2xl font-bold">
                Add a Todo
            </h1>
            <InputBox Inputtype={'text'} placeholderText={'Title'} onchangeFn={titlesetter}/>
            <InputBox Inputtype={'text'} placeholderText={'Description'} onchangeFn={descriptionsetter}/>
            <button className="p-2 m-1 rounded-xl bg-black text-white font-bold hover:bg-white hover:text-black w-20" style={{border : '2px solid black'}} onClick={addTodo}>
                Add
            </button>
        </div>
    </>)
}