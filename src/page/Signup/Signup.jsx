import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import useAxiosPublic from "../../hook/UseAxiosPublic";

const Signup = () => {
    const axiosPublic = useAxiosPublic();
    const {register,handleSubmit,reset,formState: { errors }} = useForm();
    const {createUser,updateUserProfile}=useContext(AuthContext);
    const navigate =useNavigate();

    const onSubmit = data =>{
        
        createUser(data.email,data.password)
        .then(result=>{
            const loggedUser=result.user;
            //console.log(loggedUser);
            updateUserProfile(data.name,data.photoURL)
            .then(()=>{
              const userInfo = {
                name: data.name,
                email: data.email
            }
            
              axiosPublic.post('/users', userInfo)
                .then(res => {
                  if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'User created successfully.',
                      showConfirmButton: false,
                      timer: 1500
                    });
                    navigate('/');
                  }
                })
            })
            .catch(error => console.log(error))
        })
    } 
  
    return (
        <>
          <div className="flex h-screen items-center justify-center   p-6 md:p-0">
          <div className="w-80 md:w-96 lg:w-[600px] mx-auto bg-white flex items-center relative overflow-hidden shadow-xl">
                {/* register form  */}
                <form onSubmit={handleSubmit(onSubmit)} className={`p-8 w-full mr-0 ml-auto duration-500 $`}>
            <h1 className="text-5xl font-bold text-center">Sign Up!</h1>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text"  {...register("name",{ required: true })} placeholder="name" className="input input-bordered"  />
                {errors.name && <span className=" text-red-600">This field is required</span>}
              </div>
          
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email",{ required: true })} placeholder="email" className="input input-bordered"  />
                {errors.email && <span className=" text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input type="text" placeholder="photoURL" {...register("photoURL",{ required: true })} className="input input-bordered"  />
                {errors.image && <span className=" text-red-600">This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" {...register("password",{ required: true,minLength:6, maxLength: 20,
                pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/})} className="input input-bordered"/>
                {errors.password?.type=='required' && <span className=" text-red-600">password is required</span>}
                {errors.password?.type=='minLength' && <span className=" text-red-600">password must be 6 characters</span>}
                {errors.password?.type=='maxLength' && <span className=" text-red-600">password must be less then 20 characters</span>}
                {errors.password?.type=='pattern' && <span className=" text-red-600">password must have One UpperLetter ,one small letter and one special character</span>}
              </div>
         
              <div className="form-control mt-6">
                <input  type="submit"  className="btn btn-primary" value="Signup" />
                
              </div>
              <p><small>Already have an Account? <Link to='/login'><span className=" text-green-700 text-xl font-semibold">Login </span></Link></small></p>
              {/* <SocialLogin></SocialLogin> */}
            </form>
                {/* img */}
            
                {/* login form */}
             
            </div>
   
      </div>
        </>
      
    );
};

export default Signup;