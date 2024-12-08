import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { UsersList } from "../Dashboardstore/admin-dashboard-store";


export function Users(){
    // https://task-master-api-psi.vercel.app/api/v1/admin/deleteuser
    const navigate = useNavigate();
    const [users,setUsers] = useRecoilState(UsersList);
    const removeUser = async(userId)=>{
        const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/admin/deleteuser?userId=${userId}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                authorization : 'Bearer ' + JSON.parse(localStorage.getItem('Admintoken'))
            }
        })
        const data  = await response.json();
        if(data.success){
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/getusers',{
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                    authorization : "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                }
            })  
            const data = await response.json();
            setUsers(data.users);  
        }
    }

    return(<>
        <table className="w-full overflow-x-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                </tr>
            </thead>
            {/* {console.log(users[0]==undefined)} */}
            {(users[0] == undefined) ? <tr>
                <td colSpan={4} style={{wordSpacing : '5px'}}>
                    <div className="text-xl text-center flex  justify-center place-content-center"><Skeletons/></div>
                </td>
            </tr>: <tbody>
            {users.map((user,index)=>{
                return<tr className="even:bg-gray-100 hover:bg-white" key={index}>
                    <td>
                        {index+1}
                    </td>
                    <td className="text-sm">
                        {user._id}
                    </td>
                    <td className="capitalize">
                        {user.Username}
                    </td>
                    <td>
                        <input type="button" value={'Remove user'} className="bg-red-600 p-2 rounded-md font-bold text-white hover:bg-red-700 cursor-pointer"  onClick={()=>removeUser(user._id)}/>
                    </td>
                </tr>
            })}            
            </tbody>}
        </table>
    </>)
}



function Skeletons(){
    return(<>
    <div className="skeleton-list-panel-wrapper">
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
        <div className="skeleton-list-panel w-full"></div>
    </div>
    </>)
  }
  