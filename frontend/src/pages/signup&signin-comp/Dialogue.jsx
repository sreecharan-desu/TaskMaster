import { useNavigate } from "react-router"


export function SigninDialogue({message,link,linkText}){
    
    const navigate = useNavigate();
    const onclickHandler =()=>{
        navigate(link)
    }

    return(<>
        <div className="text-sm text-gray-600">
            {message}{' '}
            <button 
                onClick={() => navigate(link)}
                className="font-medium text-black hover:text-gray-700 underline transition-colors"
            >
                {linkText}
            </button>
            {' '}Now!
        </div>
    </>)
}