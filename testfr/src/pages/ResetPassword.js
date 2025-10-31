import React, { useState } from 'react'
import { Post } from '../services/Api'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [newpassword, setnewpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState('')

    const { token } = useParams()
    const navigate = useNavigate()


    const resetpassword = async () => {
        try {
            if (newpassword !== confirmPassword) {
                toast.error("Password does not match")
                return;
            }
            const data = await Post('auth/resetpassword', { token, newpassword, confirmPassword })
            if (data.result == 1) {
                toast.success(data.message, {
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/login')
                    }

                })
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }

    return (
        <div className='main'>
            <div className='row mt-5'>
                <h3 className='col-5 offset-3 text-center'>Reset your password</h3>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='col-5 offset-3'>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='newpassword'>Enter New Password</label>
                            <input
                                id='newpassword'
                                value={newpassword}
                                onChange={(e) => setnewpassword(e.target.value)}
                                className='form-control'


                            />

                            <label className='form-label mt-3' htmlFor='confirmpassword'>Enter Confirm Password</label>
                            <input
                                className='form-control'
                                value={confirmPassword}
                                onChange={(e) => setconfirmPassword(e.target.value)}
                                id='confirmpassword'

                            />


                        </div>

                        <button
                            className={`btn btn-success text-center col-5 offset-4 mt-3 ${!newpassword || !confirmPassword ? '  btn-disabled' : ''}`}
                            onClick={resetpassword}
                            disabled={!newpassword || !confirmPassword}
                        >
                            Reset Password
                        </button>





                    </div>


                </form>







            </div>

        </div>
    )
}

export default ResetPassword