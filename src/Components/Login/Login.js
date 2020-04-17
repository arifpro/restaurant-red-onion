import React,{useState} from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import Logo from '../../Images/logo2.png';
import {Link} from 'react-router-dom';
import { useAuth } from './useAuth';
import signInBtn from '../../Images/login-with-google-button.png'
import signOutBtn from '../../Images/logout.jpg'


const Login = () => {
    const [returningUser , setReturningUser] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();

    const auth = useAuth();
    const onSubmit = data => { 
        if(returningUser){
            if(data.email && data.password){
                auth.signIn(data.email, data.password);
                
            }
        }else{
            if(data.name && data.email && data.password && data.confirm_password){
                auth.signUp(data.email, data.confirm_password,data.name)
            }
        }
        
     }
    //  console.log(auth);

    const is_valid_email = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email)
    const hasNumber = input => /\d/.test(input)
    
    const handleChange = event => {
        //perform validation
        let isValid = true
        if (event.target.name === "email") {
            isValid = is_valid_email(event.target.value);
        }
        else if (event.target.name === "password") {
            isValid = event.target.value.length > 8 && hasNumber(event.target.value);
        }
    }


    //google
    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(res => {
                // console.log('redirect now');
                window.location.pathname = '/checkout'
            })
    }

    const handleSignOut = () => {
        auth.signOut()
            .then(res => {
                window.location.pathname = '/'
            })
    }
     

    return (
        <div className="sign-up">
            <div className="container">
                <div className="logo text-center py-4">
                    <Link to="/">
                         <img src={Logo} alt=""/>
                    </Link>
                </div>
                {
                returningUser ? 
                <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                    
                   
                    <div className="form-group">
                        <input type="email" onBlur={handleChange} name="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-danger btn-block" type="submit" onClick="">Sign In</button>
                    </div>
                    <div className="option text-center">
                        <label  onClick={() => setReturningUser(false)}>Create a new Account</label>
                    </div>
                </form>
                :
                <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                    <div className="form-group">
                        <input name="name" className="form-control" ref={register({ required: true })} placeholder="Name" />
                        {errors.name && <span className="error">Name is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="email" onBlur={handleChange} name="email" className="form-control" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" ref={register({ required: true })} placeholder="Password" />
                        {errors.password && <span className="error">Password is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirm_password" className="form-control" ref={register({
                        validate: (value) => value === watch('password')
                        })} placeholder="Confirm Password" />
                        {errors.confirm_password && <span className="error">Password doesn't match.</span>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger btn-block"  type="submit">Sign Up</button>
                    </div>
                    <div className="option text-center">
                        <label onClick={() => setReturningUser(true)}>Already Have an Account?</label>
                    </div>
                </form>
                
                }

                <div className="logo text-center py-4">
                    <br /><h5>Or</h5>
                    {
                        auth.user ?
                            // <button onClick={auth.signOut}>Sign out</button> 
                            <button onClick={handleSignOut}>
                                <img src={signOutBtn} alt="" />
                            </button>
                            :
                            // <button onClick={auth.signInWithGoogle}>Sign in with Google</button>
                            <button onClick={handleSignIn}>w
                                <img src={signInBtn} alt="" />
                            </button>
                    }
                </div>


                
               
            </div>
            {
                errors.error && <p style={{ color: 'red' }}>{errors.error}</p>
            }



            

        </div>
    );
};

export default Login;