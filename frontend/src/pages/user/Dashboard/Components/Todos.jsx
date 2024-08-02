import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { todosAtom, updatedDescription, updatedTitle, updateStatus } from "../store/dashboardStore";
import { AddTodo } from "./Addtodo";
import UpdateTodo from "./updatetodo";

export default function Todos(){
    // https://task-master-api-psi.vercel.app/api/v1/user/gettodos (GET)
    // https://task-master-api-psi.vercel.app/api/v1/user/markasdone?todoid=${todoid}`
    // https://task-master-api-psi.vercel.app/api/v1/user/updatetodo (PUT) Done.

    const [todos,Settodos] = useRecoilState(todosAtom);
    const [updatestatus,setUpdatestatus] = useRecoilState(updateStatus); 

    useEffect(()=>{
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
    },[])


    const markAsCompleted = (todoid)=>{
        const markTodoCompleted = async()=>{
            const response  =await fetch(`https://task-master-api-psi.vercel.app/api/v1/user/markasdone?todoid=${todoid}`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                }
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
            }
            fetchTodos();
        }
        markTodoCompleted();
    }

    const removeTodo = async(todoid)=>{
        const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/user/removetodo?todoid=${todoid}`,{
            method  : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                authorization  : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }
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
        }
        fetchTodos();
    }


    const updateTodo =(todoindex)=>{ 
        setUpdatestatus([{
            request : true,
            indexes : [...[todoindex]]
        }]);
    }

    return(<>
        <AddTodo/>
        {console.log(updatestatus)}
        {todos.map((todo,index)=>{
            return(<>
            <div className="card" key={index}>
                <h5 className="card-header text-left">
                    { todo.Completed ?<> <table><tr><td><a>Status : Completed</a></td><td><svg xmlns="http://www.w3.org/2000/svg" fill="lightgreen" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-1"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></td></tr></table></>:<></>}   {index+1}. TODO_ID : {todo._id} 
                </h5>
                <div className="card-body text-left">
                {(updatestatus[0].request)?
                        <>
                        {(updatestatus[0].indexes)? updatestatus[0].indexes.map((id)=>{
                            {console.log(id)}
                        if(index == id){
                            return(
                                <>
                                <div className="flex place-content-center">
                                    <UpdateTodo TodoId = {todo._id}/>
                                </div>
                                </>
                            )
                        }else{
                            return(<>
                                <h5 className="card-title "> <a className="text-black font-bold">Title :</a>  {todo.Title} </h5>
                                <p className="card-text "><a className="text-black font-bold mb-4">Description : </a>{todo.Description}</p>
                            </>)
                        }
                    }):<>
                    <h5 className="card-title "> <a className="text-black font-bold">Title :</a>  {todo.Title} </h5>
                    <p className="card-text "><a className="text-black font-bold mb-4">Description : </a>{todo.Description}</p>
                </>}
                                </>:
                                <>
                                    <h5 className="card-title "> <a className="text-black font-bold">Title :</a>  {todo.Title} </h5>
                                     <p className="card-text "><a className="text-black font-bold mb-4">Description : </a>{todo.Description}</p>
                                </>
                             
                }
                    { todo.Completed ?<></>:(<a className="btn btn-primary m-2 -ml-2" onClick={()=>updateTodo(index)}> Update Todo </a>)} 
                    <a className="btn btn-primary" onClick={()=>removeTodo(todo._id)}>
                        Remove Todo
                    </a>
                    { todo.Completed ?<></>:(<a className="btn btn-primary m-2" onClick={()=>markAsCompleted(todo._id)}>Mark as Completed</a>)} 
                </div>
            </div>
            <br />
            </>)
        })}
    </>)
}