import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import {useNavigate} from 'react-router'
import { loadingClass,errorClass } from "../styles/common";

function Register() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const [preview,setPreview]=useState(null)
  const navigate=useNavigate()

  const onRegister = async(newUser) => {
    setLoading(true)
    console.log(newUser);

    //create form data object
     const formData = new FormData();
        //get user object
        let { role, ProfileImageUrl, ...userObj } = newUser;
        //add all fields except profilePic to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profilePic to Formdata object
        formData.append("ProfileImageUrl", ProfileImageUrl[0]);

    try{
      let {role,...userObj}=newUser
  
    //make API req to user/author registration
    if(newUser.role==="user"){
       //make API req to user-api
       let resObj=await axios.post("https://capstone-project-blog-app-46tv.onrender.com/user-api/users",formData,
  { withCredentials: true })
      //  console.log(resObj)
      //  let res=resObj.data;
      //  console.log(res)
      if(resObj.status===201){
        navigate("/login")
      }
    }
    if(newUser.role==="author"){
        let resObj=await axios.post("https://capstone-project-blog-app-46tv.onrender.com/author-api/users",formData,
  { withCredentials: true })
      //  console.log(resObj)
      //  let res=resObj.data;
      //  console.log(res)
      if(resObj.status===201){
        navigate("/login")
      }
    }
  }catch(err){
    setError(err)
  }
  finally{
    setLoading(false)
  }
  };

//loading
if(loading===true){
  return <p className={loadingClass}></p>
}
//error
if(error){
  return <p className={errorClass}>{error.message}</p>
}


  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit(onRegister)} className="bg-white p-10 w-96">

        <h1 className="text-3xl text-center mb-5">Register</h1>

        <p className="text-lg mb-2">Select Role</p>
        <div className="flex gap-5 mb-5">
          <label>
            <input type="radio" value="user" {...register("role",{required:true})}/> User
          </label>
          <label>
            <input type="radio" value="author" {...register("role",{required:true})}/> Author
          </label>
        </div>
        {errors.role && <p className="text-red-500">Role required</p>}

        <input
          type="text"
          placeholder="First name"
          className="border p-2 w-full mb-3"
          {...register("firstName",{required:true})}
        />
        {errors.firstName && <p className="text-red-500">First name required</p>}

        <input
          type="text"
          placeholder="Last name"
          className="border p-2 w-full mb-3"
          {...register("lastName",{required:true})}
        />
        {errors.lastName && <p className="text-red-500">Last name required</p>}

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
          className="border p-2 w-full mb-3"
          {...register("password",{required:true,minLength:6})}
        />
        {errors.password && <p className="text-red-500">Password min 6 chars</p>}

  
          <input
              type="file"
              accept="image/png, image/jpeg"
             {...register("ProfileImageUrl")}
             onChange={(e) => {

            //get image file
            const file = e.target.files[0];
            // validation for image format
            if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG or PNG allowed");
                return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB");
                return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
            }

        }} />
        {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
        
        {errors.ProfileImageUrl && <p className="text-red-500">Upload image</p>}

        <button className="bg-sky-500 text-white px-6 py-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
