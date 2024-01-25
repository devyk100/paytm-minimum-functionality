import { useNavigate } from "react-router-dom";
import backendURL from "./urls";
import { useState } from "react";
import axios from "axios";

export default function PaymentModal({toSend}){
    if(toSend == null) return null;
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    function doTransaction(amount){
        console.log(toSend._id)
        axios.post(backendURL+"api/v1/account/transfer", {
            "to": toSend._id,
            "amount": parseInt(amount)
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("userId")
            }
        })
        .then((res) => {
            navigate("/success")
        })
        .catch(e => console.log(e))
    }
    return (
        <div className="w-full h-screen flex items-center justify-center shadow-lg ">
        <div className="absolute z-10 bg-gray-200 rounded-lg p-11 w-1/3 h-1/2 flex justify-center items-center flex-col">
          <div className="font-bold text-4xl">Send Money</div>
          <div className="flex flex-row justify-start items-center w-full text-3xl font-semibold mt-16">
            <div className="p-2 text-white bg-green-400 px-4 rounded-full">F</div>
            <div className="p-2">{toSend.firstName + " " + toSend.lastName}</div>
          </div>  
          <div className="text-xl w-full font-semibold">Amount (in Rs)</div>
          <input type="text" name="" id="" placeholder="Enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="bg-gray-200 border-2 border-gray-400 w-full p-2"/>
          <button className="w-full p-2 bg-green-600 my-3" onClick={() => doTransaction(amount)}>Initiate Transfer</button>
        </div>
    </div>
    )
}