import { useNavigate } from "react-router"


export function Navbar({Username}){

    const navigate = useNavigate();

    const logout =()=>{
        localStorage.removeItem('Admintoken')
        navigate('/admin/signin')
    }

    const naviagateToProfile = ()=>{
        navigate('/admin/profile')
    }

    return(<>
        <div className="flex justify-between place-content-center -mt-5 mr-0">
            <h1 className="font-bold text-2xl first-letter:text-4xl shadow-sm">
                TaskMaster
            </h1>
            <div className=" flex justify-around place-content-center ml-">
                <div className="bg-white shadow-lg rounded-full w-10 h-10 text-3xl mr-2 text-black font-bold cursor-pointer shadow-gray-300 hover:shadow-gray-400" title="Account" onClick={naviagateToProfile}>
                    {(Username[0] == '') ?<Profile/> : Username[0]}
                </div>
                <div className="bg-white shadow-lg rounded-full w-10 h-10 text-3xl cursor-pointer place-content-center font-bold shadow-gray-300 hover:shadow-gray-400" title="Logout" onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" strokeWidth={2} stroke="currentColor" className="size-10 pt-2 pl-2 place-content-center">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </div>
            </div>
        </div>
    </>)
}

function Profile(){
    return(<>
      <div class="skeleton-profile-circle-shimmer"></div>
    </>)
  }