import React from 'react'
const Navbar = React.lazy(()=>import('../Dashboard/Components/Navbar'));
const UpdateDetails = React.lazy(()=>import('../Dashboard/Components/updatedetails'));

export default function UserProfile(){
    return(<>
        <Navbar/>
        <UpdateDetails/>
    </>)
}