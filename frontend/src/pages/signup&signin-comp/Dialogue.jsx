import { useNavigate } from "react-router"


export function SigninDialogue({message,link,linkText}){
    
    const navigate = useNavigate();
    const onclickHandler =()=>{
        navigate(link)
    }

    return(<>
        {message} <a className="underline font-semibold cursor-pointer" onClick={onclickHandler}>{linkText}</a> Now!
    </>)
}