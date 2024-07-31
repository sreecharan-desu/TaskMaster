

export function Users({UsersList}){
    // http://localhost:5000/api/v1/admin/deleteuser
    const removeUser = async(userId)=>{
        const response = await fetch(`http://localhost:5000/api/v1/admin/deleteuser?userId=${userId}`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                authorization : 'Bearer ' + JSON.stringify(localStorage.getItem('Admintoken'))
            }
        })
        const data  = await response.json();
    }

    return(<>
        <table style={{textAlign : 'center'}} className="w-10/12 md:w-full" cellPadding={15}>
            <tr>
                <th> S.No </th>
                <th> Id </th>
                <th> Username </th>
                <th> Options </th>
            </tr>
            {UsersList.map((user,index)=>{
            return<tr className="even:bg-gray-100 hover:bg-white">
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
        </table>
    </>)
}