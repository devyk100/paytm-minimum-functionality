
import {BrowserRouter, Route,  Routes, useSearchParams} from "react-router-dom"
import SignUp from "./SignUp"
import axios from "axios"
import SignIn from "./SignIn"
import { useEffect, useState, useRef } from "react"
import backendURL from "./urls"
import PaymentModal from "./PaymentModal"
import Success from "./Success"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </BrowserRouter>
  )
}

function Dashboard(){
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([{}, {}]);
  const [inputValue, setInputValue] = useState("");
  const [userObj, setUserObj] = useState({firstName:""});
  const [toSend, setToSend] = useState(null);
  // const inputRef =  useRef();

  useEffect(() => {
    console.log(localStorage.getItem("userId"))
    axios.get(backendURL+"api/v1/account/balance", {
      headers: {
          authorization: "Bearer "+localStorage.getItem("userId")
      }
    }).then((res) => {
      console.log(res.data)
      setBalance(parseInt(res.data.balance))
    })
    axios.get(backendURL+"api/v1/user/dashboard", {
      headers: {
        authorization: "Bearer "+localStorage.getItem("userId")
      }
    })
    .then((res) => {
      setUserObj(res.data)
    })
  }, [])

  console.log(users)

  useEffect(()=>{
    console.log(localStorage.getItem("userId"))
    axios.get(backendURL+"api/v1/user/bulk?filter="+inputValue, {
      headers: {
          authorization: "Bearer "+localStorage.getItem("userId")
      }
    })
    .then((res) => {
      console.log(res.data.user)
      setUsers(res.data.user)
    })
  }, [inputValue])

  return(
<>
    <PaymentModal toSend={toSend} />
    <div className="bg-white w-full h-screen flex flex-col items-center">
      <div className="w-full flex border-b-orange-950 border border-white flex-row justify-between p-5 py-5 mx-2">
        <div className=" text-3xl font-bold">
          Payments App
        </div>
        <div className="flex  flex-row mx-4 px-3 items-center justify-center">
          <div className="px-2">Hello, {userObj.firstName}</div>
          <div className="p-3 rounded-full bg-gray-400">{userObj.firstName[0]}</div>
        </div>
      </div>

      <div className="w-full text-2xl font-semibold mx-2 px-7 py-5 pt-8">
        
        Your Balance ${balance}
      </div>
      <div className="w-full m-3 px-9">
        <div className="w-full text-2xl font-bold my-3">Users</div>
        <input type="text" name="" id="" placeholder="Search users.." className="w-full p-3 text-xl border rounded-lg" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      </div>

      {
        users.map((value) => {
          console.log(localStorage.getItem("userId") ,"::::" , value._id);
          return (
          <div className="w-full flex flex-row justify-between px-6 m-2 py-2" key={value._id}>
            <div className=" flex flex-row items-center">
              <div className="text-lg bg-gray-300 p-2 rounded-full px-4">{(value.firstName) ? value.firstName[0] : "U"}</div>
              <div className="mx-2 px-2 text-xl font-light">{value.firstName + " "+value.lastName}</div>
            </div>
            <button className="bg-black text-white p-3 mx-2 rounded-lg font-semibold" onClick={()=>setToSend(value)}>Send Money</button>
          </div>
          )
          })

      }

    </div>
    </>
    )
}

export default App
