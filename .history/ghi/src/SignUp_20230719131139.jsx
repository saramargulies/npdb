import { useSignupMutation } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AlertError from './AlertError'

const SignUp = () => {
    const navigate = useNavigate()
    const [signup, signupResult] = useSignupMutation();
    // const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('')
    const [full_name, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== passwordConfirmation) {
            // setErrorMessage('Password does not match confirmation')
            return;
        }
        signup({username, password, full_name});
        navigate('/');
    }
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>SignUp</h1>
                <form onSubmit={handleSubmit}>
                    {/* {errorMessage && <AlertError>{errorMessage}</AlertError>} */}
                    <div className="mb-3">
                        <label htmlFor="SignUp__username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SignUp__username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                                        <div className="mb-3">
                        <label htmlFor="SignUp__full_name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SignUp__full_name"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SignUp__password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="SignUp__password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                // setErrorMessage('')
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="SignUp__password_confirmation" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="SignUp__password_confirmation"
                            value={passwordConfirmation}
                            onChange={(e) => {
                                setPasswordConfirmation(e.target.value)
                                // setErrorMessage('')
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
