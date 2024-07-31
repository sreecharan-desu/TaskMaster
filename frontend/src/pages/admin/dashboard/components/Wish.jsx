import { useRecoilValue } from "recoil";
import { username } from "../Dashboardstore/admin-dashboard-store";

export function Wish(){
    const Username = useRecoilValue(username);
    return(
        <>
            <div className="flex capitalize font-bold m-10 ml-0 text-2xl">
                Welcome back ! &nbsp;
                {Username}
            </div>
        </>
    )
}