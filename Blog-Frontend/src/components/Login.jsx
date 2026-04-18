import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import {toast} from 'react-hot-toast'

function Login() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const login=useAuth((state)=>state.login)
  const userAuthenticate=useAuth((state)=>state.userAuthenticate)
  const currentUser=useAuth((state)=>state.currentUser)
  const navigate=useNavigate()
  const redirectedOnce = useRef(false)

  const onLogin = async(userCredObj) => {
    await login(userCredObj)
  };

  useEffect(()=>{
    if(!userAuthenticate || !currentUser || redirectedOnce.current) return

    redirectedOnce.current = true

    if(currentUser.role==="USER"){
      toast.success("Loggedin successfully")
      navigate("/user-dashboard")
      return
    }
    if(currentUser.role==="AUTHOR"){
      navigate("/author-dashboard")
      return
    }
  },[userAuthenticate,currentUser,navigate])
  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit(onLogin)} className="bg-white p-10 w-96">

        <h1 className="text-3xl text-center mb-5">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          {...register("email",{required:true})}
        />
        {errors.email && <p className="text-red-500">Email required</p>}

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-5"
          {...register("password",{required:true})}
        />
        {errors.password && <p className="text-red-500">Password required</p>}

        <button className="bg-sky-500 text-white px-6 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
