import React from "react";
const Navbar = React.lazy(()=>import('./Components/Navbar'))

export default function UserDashboard(){
    return(<>
        <Navbar/>
    </>)
}