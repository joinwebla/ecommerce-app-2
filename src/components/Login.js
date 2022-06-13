import axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { object, string, number, date, InferType } from 'yup';

let loginSchema = object({
    email: string().required('Required').email().max(251),
    password: string().min(4)
})

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});


    const onChange = (key, value) => {
        setValues({
            ...values,
            [key]: value
        });
    }

    const handleSubmit = () => {
        loginSchema.validate({email: values.email, password: values.password}, {
            abortEarly: false
        }).then((res) => {
            setErrors({})
            console.log("success", res);

            axios({
                method: "POST",
                url: "https://api.backendless.com/F58220C0-A4FF-90CE-FF37-673956D5F600/4ABEC99A-61AA-45E1-9B14-B36B60A1DC68/users/login",
                data: {
                    login: values.email,
                    password: values.password
                }
            }).then((res) => {
                //save the token into local storage
                localStorage.setItem("authToken", res.data["user-token"])
                window.location.href = "/"
            }).catch((error) => {
                alert(error)
            })

        }).catch((err) => {
            let errorsObj = {};
            const allValidations = err.inner;
            
            allValidations.forEach((error) => {
                errorsObj[error.path] = error.message;
            });

            setErrors(errorsObj)
        })
    }

    return (
        <div className="auth-page">
            <div className="singup-section">
                <h1>Login Here</h1>
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
                        <span className='text-danger'>{errors["email"]}</span>
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
                        <span className='text-danger'>{errors["password"]}</span>
                    </div>
                </form>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                <Link to="/signup">Dont have an account? Please register</Link>
            </div>
        </div>
    )
}

export default Login;