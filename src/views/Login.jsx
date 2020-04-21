import React, {useState} from 'react';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import * as axios from "axios";

const Login = (prop) => {
    const [email, setEmail] = useState('prueba');
    const [password, setPassword] = useState('1234');
    const login = () => {
        axios.post("[base_api_url]/Admin/login", {
            email,
            password
        }).then((res) => {
            const {token} = res.data;
            localStorage.setItem('token', token);
            prop.history.push("/admin/tables");
        });
    }
    return (
        <div className="login">
            <div className="content">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4" className="text-center">Login Page</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col className="px-4">
                                    <FormGroup>
                                        <label>Email</label>
                                        <Input
                                            placeholder="Email"
                                            type="text"
                                            value={email}
                                            onChange={(event) => {
                                                setEmail(event.target.value)
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="px-4">
                                    <FormGroup>
                                        <label>Password</label>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                            onChange={(event) => {
                                                setPassword(event.target.value)
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <div className="update ml-auto mr-auto">
                                    <Button
                                        className="btn-round"
                                        color="primary"
                                        onClick={(event) => login(event)}
                                        type="button">
                                        Login
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default Login;
