import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/reducer/User';
import { AppDispatch, RootState } from '../../../redux/store/Store';

import "./Login.scss"

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { inforLogin, successLogin, errLogin } = useSelector((state: RootState) => state.User);

    useEffect(() => {
        localStorage.setItem('token', inforLogin?.token);
        localStorage.setItem('userInfor', inforLogin?.username);
    }, [inforLogin])


    useEffect(() => {
        if (successLogin === true) {
            alert('Login successful')
        }
        if (errLogin !== null) {
            alert("login failed");
        }
    }, [successLogin, errLogin])



    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(login({ username, password }));

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='wrapper-login'>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
