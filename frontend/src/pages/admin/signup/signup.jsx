import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Heading } from "../../signup&signin-comp/heading";
import { InputBox } from "../../signup&signin-comp/InputBox";
import { Button } from "../../signup&signin-comp/Button";
import { Hr } from "../../signup&signin-comp/Hr";
import { SigninDialogue } from "../../signup&signin-comp/Dialogue";
import { useRecoilState } from "recoil";
import { adminsignuppasswordAtom, adminsignupusernameAtom } from "./store/signupstore";
import toast, { Toaster } from 'react-hot-toast';

export default function AdminSignup() {
    const navigate = useNavigate();
    const [username, setusername] = useRecoilState(adminsignupusernameAtom);
    const [password, setpassword] = useRecoilState(adminsignuppasswordAtom);

    useEffect(() => {
        if (localStorage.getItem('Admintoken')) {
            navigate('/admin/dashboard')
        }
    }, [navigate])

    const usernameHandler = (event) => {
        setusername(event.target.value)
    }

    const passwordHandler = (event) => {
        setpassword(event.target.value)
    }

    const SignupUser = async () => {
        if (username === '' || password === '') {
            toast.error('Username and password must not be empty');
            return;
        }

        const loadingToast = toast.loading('Creating account...');
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/admin/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            
            if (data.success) {
                toast.success(data.msg, { id: loadingToast });
                setTimeout(() => {
                    navigate('/admin/signin');
                }, 1500);
            } else {
                toast.error(data.msg || 'Signup failed', { id: loadingToast });
            }
        } catch (e) {
            toast.error('Network error. Please check your connection.', { id: loadingToast });
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Toaster position="top-right" />
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl border border-gray-100 backdrop-blur-sm bg-white/80 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center justify-center mb-8 space-x-3">
                        <Heading title="Admin Sign Up"/>
                        <span className="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
                            ADMIN
                        </span>
                    </div>
                    <div className="space-y-6">
                        <InputBox text="Username" type="text" onInputChange={usernameHandler} />
                        <InputBox text="Password" type="password" onInputChange={passwordHandler} />
                        <Button text="Sign Up" onclickFn={SignupUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}
