import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from "reactstrap";
import * as axios from "axios";

const TablesMessanger = (prop) => {

    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [percentEarning, setPercentEarning] = useState(50);
    const [photo, setPhoto] = useState('');
    const [ci, setCi] = useState('');
    const [transport, setTransport] = useState();
    const [list, setList] = useState([]);
    const [id, setId] = useState('');

    const toggle = () => {
        setModal(!modal)
    };
    const clearUser = () => {
        setId('');
        setName('');
        setEmail('');
        setPassword('');
        setPercentEarning('');
        setPhone('');
        setPhoto('');
        setCi('');
        setTransport('');
    }
    const modalEdit = (item) => {
        setId(item.id);
        setName(item.name);
        setEmail(item.email);
        setPassword(item.password);
        setPercentEarning(item.percent_earnings);
        setPhone(item.phone);
        setPhoto(item.photo);
        setCi(item.ci);
        setTransport(item.transport);
        toggle();
    }
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const saveUser = () => {
        const action = id ? 'updateMessenger' : 'setMessenger';

        var param = {
            "name": name,
            "email": email,
            "password": password,
            "phone": phone,
            "ci": ci,
            "percent_earnings": percentEarning, // Porcent earnings, Double maximum 100
            "photo": photo,
            "transport": transport // 0 = Moto, 1 = Car, 2 = Truck
        };
        if (id) {
            param.id = id
        }
        axios.post("[base_api_url]/Admin/" + action, param).then((res) => {
            toggle();
            getList();
            clearUser();
        })
    };
    const getList = () => {
        axios.post("[base_api_url]/Admin/getMessengers")
            .then((res) => {
                setList(res.data.messengers);
            })
    }
    useEffect(() => {
        getList();
    }, []);


    return (
        <>
            <div className="content">
                <Button color="primary" onClick={toggle}>CREATE</Button>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{id && 'Edit'} Messenger</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label>Email address</label>
                                        <Input
                                            value={email}
                                            onChange={event => setEmail(event.target.value)}
                                            placeholder="Email"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <FormGroup>
                                        <label>
                                            password
                                        </label>
                                        <Input
                                            value={password}
                                            onChange={event => setPassword(event.target.value)}
                                            placeholder="password" type="text"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label>Name</label>
                                        <Input
                                            value={name}
                                            onChange={event => setName(event.target.value)}
                                            placeholder="name"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <FormGroup>
                                        <label>Phone</label>
                                        <Input
                                            value={phone}
                                            onChange={event => setPhone(event.target.value)}
                                            placeholder="phone"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pl-1" md="6">
                                    <FormGroup>
                                        <label>percent Earning</label>
                                        <Input
                                            value={percentEarning}
                                            onChange={event => setPercentEarning(event.target.value)}
                                            placeholder="Home Address"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label>CI</label>
                                        <Input
                                            value={ci}
                                            onChange={event => setCi(event.target.value)}
                                            placeholder="Contact person phone"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='pl-1'>
                                    <FormGroup tag="fieldset">
                                        <Label>Transport</Label>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio"
                                                       name="radio1"
                                                       value='0'
                                                       onChange={(event) => setTransport(event.target.value)}
                                                       checked={transport == '0'}/>{' '}Moto
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio1"
                                                       value='1'
                                                       onChange={(event) => setTransport(event.target.value)}
                                                       checked={transport == '1'}/>{' '}Car</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio1"
                                                       value='2'
                                                       onChange={(event) => setTransport(event.target.value)}
                                                       checked={transport == '2'}/>{' '}Truck</Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup row>
                                <Label for="exampleFile" sm={2}>Photo</Label>
                                <Col sm={10}>
                                    <Input type="file"
                                           accept="image/*" name="file" id="exampleFile"
                                           onChange={(event) =>
                                               getBase64(event.target.files[0], (file) => setPhoto(file))}
                                    />
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                                    </FormText>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={saveUser}>Save</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>

                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Messanger</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>id</th>
                                        <th>name</th>
                                        <th>email</th>
                                        <th>password</th>
                                        <th>phone</th>
                                        <th>ci</th>
                                        <th>percent_earnings</th>
                                        <th>photo</th>
                                        <th>transport</th>
                                        <th>action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.password}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.ci}</td>
                                            <td>{item.percent_earnings}</td>
                                            <td><img src={'data:image/png;base64,' + item.photo}/></td>
                                            <td>{item.transport}</td>
                                            <td>
                                                <Button color="primary" onClick={() => modalEdit(item)}>update</Button>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default TablesMessanger;
