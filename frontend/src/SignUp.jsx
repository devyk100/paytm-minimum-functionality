import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import backendURL from "./urls"

export default function SignUp(){
    const navigate = useNavigate();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    function submit(){
        axios.post(backendURL+'api/v1/user/signup', {
            username: usernameRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            password: passwordRef.current.value
        })
        .then((res) => {
            console.log(res.data)
            localStorage.setItem("userId", res.data.userId)
            navigate("/dashboard")
        })
    }

    return (
        <>
        <div className="w-full bg-gray-400 h-screen flex items-center justify-center">
            <div className="w-1/4 h-4/5 bg-white rounded-2xl flex flex-col justify-center items-center">
                <div className="text-4xl font-black">
                    Sign Up
                </div>
                <div className="text-2xl text-center my-1 py-1 font-light text-gray-600">
                    Enter your information to create an account.
                </div>
                <div className="w-full px-10 py-2 text-xl">
                    <div className="py-1 font-normal text-xl">First Name</div>
                    <input type="text" name="" id="" className="w-full p-2 border rounded-lg" placeholder="John" ref={firstNameRef} />
                </div>
                <div className="w-full px-10 py-2 text-xl">
                    <div className="py-1 font-normal text-xl">Last Name</div>
                    <input type="text" name="" id="" className="w-full p-2 border rounded-lg" placeholder="Doe" ref={lastNameRef} />
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
                    Sign Up
                </button>
                <div className="flex flex-row">
                    <div className="mx-1">Already have an account?</div>
                    <a href="" className="px-1 mx-1 cursor-pointer underline" onClick={() => navigate("/signin")}>Login</a>
                </div>
            </div>
        </div>
        </>
    )
}