import { useRecoilValue } from "recoil";
import { username } from "../Dashboardstore/admin-dashboard-store";

export function Wish() {
    const Username = useRecoilValue(username);
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                Welcome back, <span className="text-black">{Username}</span>!
            </h2>
            <p className="mt-2 text-gray-600">Manage your tasks and users from your dashboard.</p>
        </div>
    )
}