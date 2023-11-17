import "./Register.css"
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Register = () =>{

    const navigate = useNavigate();
    const handleRegister = async (event) => {
        event.preventDefault();

        const name = event.target.elements.name.value;
        const username = event.target.elements.username.value;
        const birthdate = event.target.elements.birthdate.value;
        const password = event.target.elements.password.value;
        const email = event.target.elements.email.value;

        const registrationData = {
            name,
            username,
            birthdate,
            password,
            email,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/register', registrationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                navigate("/login");
            } else {
                console.error(response.data); // Log server error message

                if (response.status === 400 && response.data === 'Username already exists') {
                    alert('Username already exists. Please choose a different username.');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = () => {
      navigate("/login");
    };
   
    return(
        <>
            <h2 className="animate-charcter">Register</h2> 
            <div className="form-login">
                <Form className="login-form" onSubmit={handleRegister}>
                    <div className="input-group">
                        <div className="input-row">
                            <div className="input-item">
                                <label for="name">Họ và tên</label>
                                <input type="text" id="name" name="name" required/>
                            </div>
                            <div className="input-item">
                                <label htmlFor="birthdate">Ngày sinh</label>
                                <input type="date" id="birthdate" name="birthdate" required />
                            </div>
                        </div>
                    </div>
                    <div className="input-group">
                        <label for="username">Tên tài khoản</label>
                        <input type="text" id="username" name="username" required/>
                    </div>
                    <div className="input-group">
                        <div className="input-row">
                            <div className="input-item">
                                <label for="password">Mật khẩu</label>
                                <input type="password" id="password" name="password" required/>
                            </div>
                            <div className="input-item">
                                <label for="pwd">Nhập lại mật khẩu</label>
                                <input type="password" id="pwd" name="pwd" required/>
                            </div>
                        </div>
                    </div>
                    <div className="input-group">
                        <label for="password">Email</label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    <div className="button-group    ">
                        <button type="submit">Register</button>
                        <button type="button" onClick={handleLogin}>Login</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Register;