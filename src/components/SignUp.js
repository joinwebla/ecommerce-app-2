import { useState } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const SignUp = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        passwordConf: ""
    })

    const onChange = (key, value) => {
        setValues({
            ...values,
            [key]: value
        });
    }

    const handleSubmit = () => {

        // validations
        axios({
            method: "POST",
            url: "https://api.backendless.com/F58220C0-A4FF-90CE-FF37-673956D5F600/4ABEC99A-61AA-45E1-9B14-B36B60A1DC68/users/register",
            data: {
                name: values.name,
                email: values.email,
                password: values.password        
            }
        }).then((res) => {
            if(res.status){
                window.location.href = "/login"
            }
        }).catch((err) => {
            console.log(err);
            alert("Registration failed! Please retry")
        })
    }

    return (
        <div className="auth-page">
            <div className="singup-section">
                <h1>Register Here</h1>
                <form>
                    <div class="form-group mb-10">
                        <label>Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={(event) => {
                                const value = event.target.value;
                                onChange("email", value)
                            }}
                        />
                    </div>
                    <div class="form-group mb-10">
                        <label>Name</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter name"
                            value={values.name}
                            onChange={(event) => {
                                const value = event.target.value;
                                onChange("name", value)
                            }}
                        />
                    </div>
                    <div class="form-group mb-10">
                        <label>Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Enter password"
                            value={values.password}
                            onChange={(event) => {
                                const value = event.target.value;
                                onChange("password", value)
                            }}
                        />
                    </div>
                    <div class="form-group mb-10">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Confirm password"
                            value={values.passwordConf}
                            onChange={(event) => {
                                const value = event.target.value;
                                onChange("passwordConf", value)
                            }}
                        />
                    </div>
                </form>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                <Link to="/login">already have an account? Please signin</Link>
            </div>
        </div>
    )
}

export default SignUp;