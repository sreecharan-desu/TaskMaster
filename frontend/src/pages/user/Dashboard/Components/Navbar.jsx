import { Suspense } from "react";
import { useNavigate } from "react-router";


export default function Navbar(){
    const navigate = useNavigate();
    const naviagteToAccount = ()=>{
        navigate('/user/profile')
    }
    const logout = ()=>{
        localStorage.removeItem('token')
        navigate('/user/signin')
    }
    return(<>
        <div className="flex w-full bg-white justify-between -m-5 -ml-5 -mr-5">
            <h1 className="text-2xl text-black font-bold">
                TaskMaster
            </h1>
            <div className="flex text-center justify-between">
                <a className="cursor-pointer"  onClick={naviagteToAccount}>
                    <Suspense fallback={''}>
                        <div className="flex justify-center place-content-center w-10 h-10 bg-blue-200 shadow-lg hover:shadow-2xl text-3xl rounded-full ">
                            S
                        </div>
                    </Suspense>
                </a>
                <a className="text-sm cursor-pointer m-2 mt-0"  onClick={logout}>
                    <Suspense fallback={''}>
                        <div className="flex justify-center place-content-center w-10 h-10 bg-red-500 text-3xl shadow-lg hover:shadow-2xl rounded-full text-white">
                            -
                        </div>
                    </Suspense>
                </a>
            </div>
        </div>
    </>)
}