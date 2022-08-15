import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import "./Login.scss"
const Login = () => {
    const [isSignIn, setisSignIn] = useState(true);
    const [isTeacher,setisTeacher]=useState();
    const { register, handleSubmit,reset ,getValues } = useForm();
    const onSubmit = data => {
        // alert(JSON.stringify(data));
        console.log(data)
        reset();
    };
    
const output=()=>{
    const value=getValues("profession")
    console.log('value')

}
    // const o=()=>{
    //     e.targe.value;

    // }
    return (
        <div className=''>
            <div class={isSignIn ? 'containerr mb-0' : 'containerr sign-up-mode mb-0'}>
                <div class="forms-container">
                    <div class="signin-signup">
                        <form action="#" class="sign-in-form">
                            <h2 class="title">Sign in</h2>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" placeholder="Username" />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" class="btnn solid" />
                            <p class="social-text">Or Sign in with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <i class="fab fa-google"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                        <form onSubmit={handleSubmit(onSubmit)} class="sign-up-form">
                            <h2 class="title">Sign up</h2>
                            <div onFocus={output()} class="input-field d-flex text-center justify-content-between">
                            <span className='w-100 d-flex justify-content-between text-center cs  '><i class="fas fa-chalkboard-user ci"></i>
                                <h6 className='  text-nowrap'>sign up as</h6></span> 
                                <span  className='text-center'><select onClick={output()}     {...register("profession")} >
                                    <option   value="teacher">Teacher</option>
                                    <option    value="student">Student</option>
                                </select></span>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" placeholder="Username" {...register('username')} />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" {...register('email')} />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" placeholder="Password" {...register('password')} />
                            </div>
                            <input type="submit" class="btnn" value="Sign up"  />
                            <p class="social-text">Or Sign up with social platforms</p>
                        <div class="social-media">
                            <a href="#" class="social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        </form>
                       
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button onClick={() => setisSignIn(false)} class="btnn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src="../files/login.svg" class="image" alt="" />
                    </div>
                    <div class="panel right-panel">
                        <div class="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button onClick={() => setisSignIn(true)} class="btnn transparent" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src="../files/signup.svg" class="image" alt="" />
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Login;

