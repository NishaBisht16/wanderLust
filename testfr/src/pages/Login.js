import React, { useState } from 'react'
import Header from '../components/Header'
import { Post } from '../services/Api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'



const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [emailerror, setemailerror] = useState('')
    const [password, setpassword] = useState('')
    const [passworderror, setpassworderror] = useState('')


    const { login } = useAuth()
    const { currentUser } = useAuth()

    const loginUser = async () => {

        if (email == '' || password == '') {
            toast.warning("Email & Password are required")
            return;
        }

        const data = await Post('auth/login', { email, password })
        console.log("data", data)

        if (data.result > 0) {

            login(data.token)
            currentUser(data.curruser._id)

            toast.success(data.message, {
                autoClose: 1000,
                onClose: () => {
                    navigate('/')

                }
            })


        }
        else {
            if (data.email_error) setemailerror(data.email_error)
            if (data.password_error) setpassworderror(data.password_error)
            if (data.message) toast.error(data.message)


        }
    }


    const googleLogin = async ({ credential }) => {

        try {
            const model = {
                token: credential

            }
            const data = await Post('auth/googlelogin', model)
            if (data.result == 1) {
                login(data.result_value)
                navigate('/')

            }
            toast.error(data.error_value)


        } catch (error) {


        }
    }
    const handleGoogleLoginFailure = (error) => {
        console.error("Google Login Error:", error);
        // setErrors({ general: "Google login failed. Please try again." });
    };

    return (
        <div className='main'>
            <Header />
            <div className='row mt-3'>
                <h1 className='col-5 offset-3'>Login</h1>
                <div className='col-5 offset-3'>
                    <form onSubmit={(e) => e.preventDefault()} className='needs-validation'>
                        <div className='mb-3'>
                            <label for="email" className='form-lable'>Email</label>
                            <input
                                onChange={(e) => {
                                    setemail(e.target.value)
                                    setemailerror("")

                                }}
                                name='email'
                                value={email}
                                type='email'
                                id='email'
                                className='form-control'
                            >
                            </input>
                            {emailerror && <p className='error'>{emailerror}</p>}
                        </div>

                        <div className='mb-3'>
                            <label for="password" className='form-lable'>Password</label>
                            <input
                                onChange={(e) => {
                                    setpassword(e.target.value)
                                    setpassworderror("")
                                }}
                                value={password}
                                name='password'
                                type='text'
                                id='password'
                                className='form-control'
                            >
                            </input>
                            {passworderror && <p className='error'>{passworderror}</p>}
                        </div>
                        <div className='text-center mt-3'>
                            <a href='/forgotpassword' className='text-decoration-none '>Forgot password</a>
                            <p>Don't have an account? <a href='/signup' className='text-decoration-none mt-3'>Create one</a></p>


                        </div>

                        <div className="row justify-content-center">
                            <div className="col-6 d-flex align-items-center justify-content-center gap-2 text-center">
                                <button className="btn btn-success "
                                 style={{ width: "250px",fontSize:"18px" }}
                                 onClick={loginUser}>
                                    Login
                                </button>

                                <GoogleLogin
                                    theme="outline"
                                    size="large"
                                    text="continue_with"
                                    width="200"
                                    onSuccess={googleLogin}
                                    onError={handleGoogleLoginFailure}
                                />
                            </div>
                        </div>



                    </form>
                </div>

            </div>

        </div>
    )
}

export default Login
