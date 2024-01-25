import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import backendURL from "./urls"

export default function SignUp(){
    const navigate = useNavigate();
    const passwordRef = useRef();
    const usernameRef = useRef();

    function submit(){
        axios.post(backendURL+'api/v1/user/signin', {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })
        .then((res) => {
            console.log(res.data)
            localStorage.setItem("userId", res.data.token)
            navigate("/dashboard")
        })
    }

    return (
        <>
        <div className="w-full bg-gray-400 h-screen flex items-center justify-center">
            <div className="w-1/4 h-3/5 bg-white rounded-2xl flex flex-col justify-center items-center">
                <div className="text-4xl font-black">
                    Sign Up
                </div>
                <div className="text-2xl text-center my-1 py-1 px-5 font-light text-gray-600">
                    Enter credentials to access your account
                </div>
                <div className="w-full px-10 py-2 text-xl">
                    <div className="py-1 font-normal text-xl">Email</div>
                    <input type="email" name="" id="" className="w-full p-2 border rounded-lg" placeholder="johndoe@example.com" ref={usernameRef} />
                </div>
                <div className="w-full px-10 py-2 text-xl">
                    <div className="py-1 font-normal text-xl">Password</div>
                    <input type="password" name="" id="" className="w-full p-2 border rounded-lg" placeholder="" ref={passwordRef} />
                </div>
                <button className="bg-black text-2xl text-white w-5/6 p-3 my-2 rounded-lg" onClick={() => submit()}>
                    Sign In
                </button>
                <div className="flex flex-row">
                    <div className="mx-1">Don't have an account?</div>
                    <a href="" className="px-1 mx-1 cursor-pointer underline" onClick={() => navigate("/signup")}>Sign Up</a>
                </div>
            </div>
        </div>
        </>
    )
}