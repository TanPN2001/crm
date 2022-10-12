import './Login.css';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axois from 'axios';
import { useAuthState } from '../../atom';
import { useRecoilState } from 'recoil';
import { auth } from '../../stores';
import WithAuth from '../../withAuth';
function Login() {
    const [authState, setAuthState] = useAuthState();
    const [_auth_, setAuth] = useRecoilState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (_auth_.token) navigate(-1);
    });

    const onFinish = async (values: any) => {
        try {
            let postData = await axois.post('http://localhost:8888/auth/signin', values);
            // const { data } = postData.data;
            if (postData) {
                setAuth(postData.data);
                localStorage.setItem('auth', JSON.stringify(postData.data));
                navigate('/order');
                console.log(postData.data);
            }
        } catch (err) {
            console.log('Error!!! Oh shit');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        navigate('/');
    };
    return (
        <WithAuth>
            
        <div className="WraperLogin">
            <div className="ContainerLogin">
                <div>Login</div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="FormLogin"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </WithAuth>
    );
}

export default Login;
