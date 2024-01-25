import { useNavigate } from "react-router-dom";

export default function Success({amount, toPerson}){
    const navigate = useNavigate();
    return(
        <>
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-full text-center text-2xl"> 
                Transaction Successful
            </div>
            <button className="p-2 bg-red-400 w-1/4 my-10" onClick={() => navigate("/dashboard")}>
                Go to dashboard
            </button>

        </div>
        </>
    )
}