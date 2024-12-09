import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Heading } from "../../signup&signin-comp/heading";
import { InputBox } from "../../signup&signin-comp/InputBox";
import { Button } from "../../signup&signin-comp/Button";
import { Hr } from "../../signup&signin-comp/Hr";
import { Message } from "../../signup&signin-comp/Message";
import { SigninDialogue } from "../../signup&signin-comp/Dialogue";
import { useRecoilState } from "recoil";
import { userSigninmessageAtom, userSigninpasswordAtom, userSigninusernameAtom } from "./store/signinstore";
import toast, { Toaster } from 'react-hot-toast';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function UserSignin() {
    const navigate = useNavigate();
    const [message, setMessage] = useRecoilState(userSigninmessageAtom);
    const [username, setUsername] = useRecoilState(userSigninusernameAtom);
    const [password, setPassword] = useRecoilState(userSigninpasswordAtom);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/user/dashboard')
        }
    }, [navigate])

    const handleSignin = async () => {
        if(username === '' || password === '') {
            toast.error('Username and password must not be empty');
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            
            if(data.token) {
                localStorage.setItem('token', JSON.stringify(data.token));
                navigate('/user/dashboard');
            } else {
                toast.error(data.msg || 'Login failed');
            }
        } catch(e) {
            toast.error('Error connecting to server. Please check your internet connection.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
            <Toaster position="top-right" />
            {isLoading && <LoadingSpinner />}
            
            <motion.div 
                className="sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl border border-gray-100 backdrop-blur-sm bg-white/80 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="mb-8">
                        <Heading title="Sign In"/>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Welcome back to TaskMaster
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <InputBox text="Username" type="text" onInputChange={(e) => setUsername(e.target.value)}/>
                        <InputBox text="Password" type="password" onInputChange={(e) => setPassword(e.target.value)}/>
                        
                        <div className="pt-2">
                            <Button text="Sign In" onclickFn={handleSignin}/>
                        </div>
                    </div>

                    <Hr/>
                    
                    <div className="mt-6">
                        <SigninDialogue 
                            message="Don't have an account?" 
                            link="/user/signup" 
                            linkText="Sign Up"
                        />
                    </div>
                </motion.div>

                <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link 
                        to="/" 
                        className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors group"
                    >
                        <svg 
                            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span>Back to Home</span>
                    </Link>
                </motion.div>
            </motion.div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div 
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div 
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-100/30 to-indigo-100/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </div>
    );
}
