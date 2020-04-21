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

const Tables = (prop) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactPersonPhone, setContactPersonPhone] = useState('');
    const [type, setType] = useState('');
    const [messengersList, setMessengersList] = useState([]);
    const [servicesValue, setServicesValue] = useState({'moto': [], 'car': [], 'truck': []});
    const [messangers, setMessangers] = useState([]);
    const [list, setList] = useState([]);
    const [id, setId] = useState('');
    const toggle = () => {
        setModal(!modal)
    };
    const modalEdit = (item) => {
        setId(item.id);
        setName(item.name);
        setEmail(item.email);
        setPassword(item.password);
        setAddress(item.address);
        setPhone(item.phone);
        setContactPerson(item.contact_person);
        setContactPersonPhone(item.contact_person_phone);
        item.services_value && setServicesValue(JSON.parse(item.services_value));
        toggle();
    }
    const clearUser = () => {
        setId('');
        setName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setPhone('');
        setContactPerson('');
        setContactPersonPhone('');
        setServicesValue({'moto': [], 'car': [], 'truck': []});
    }
    const getMList = () => {
        axios.post("[base_api_url]/Admin/getMessengersBase")
            .then((res) => {
                setMessengersList(res.data.messengers);
            })
        axios.post("[base_api_url]/Admin/getClients")
            .then((res) => {
                setList(res.data.clients);
            })
    }
    useEffect(() => {
        getMList()
    }, []);

    const saveUser = () => {
        const action = id ? 'updateClient' : 'setClient';
        var param = {
            "id": id,
            "name": name,
            "email": email,
            "password": password,
            "phone": phone,
            "address": address,
            "contact_person": contactPerson,
            "contact_person_phone": contactPersonPhone,
            "services_value": JSON.stringify(servicesValue),
            "messengers_value": JSON.stringify(messangers),
        };
        if (id) {
            param.id = id
        }
        axios.post("[base_api_url]/Admin/" + action, param).then((res) => {
            clearUser();
            toggle();
            getMList();
        })
    }
    return (
        <>
            <div className="content">
                <Button color="primary" onClick={() => {
                    clearUser();
                    toggle();
                }}>CREATE</Button>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}> {id && 'Edit'} User</ModalHeader>
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
                                <Col md="12">
                                    <FormGroup>
                                        <label>Address</label>
                                        <Input
                                            value={address}
                                            onChange={event => setAddress(event.target.value)}
                                            placeholder="Home Address"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <FormGroup>
                                        <label>Contact person</label>
                                        <Input
                                            value={contactPerson}
                                            onChange={event => setContactPerson(event.target.value)}
                                            placeholder="Contact person"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col className="pl-1" md="6">
                                    <FormGroup>
                                        <label>Contact person phone</label>
                                        <Input
                                            value={contactPersonPhone}
                                            onChange={event => setContactPersonPhone(event.target.value)}
                                            placeholder="Contact person phone"
                                            type="text"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='pl-1' sm='5'>
                                    <FormGroup tag="fieldset">
                                        <Label>Type</Label>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio"
                                                       name="radio1"
                                                       value='default'
                                                       onChange={(event) => setType(event.target.value)}
                                                       checked={type === 'default'}/>{' '}default
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio1"
                                                       value='in-house'
                                                       onChange={(event) => setType(event.target.value)}
                                                       checked={type === 'in-house'}/>{' '}In house</Label>
                                        </FormGroup>
                                    </FormGroup>
                                </Col>
                                <Col sm='5'>
                                    {type === 'in-house' && (<FormGroup className='pl-1'>
                                        <Label for="exampleSelect">Messenger</Label>
                                        <Col>
                                            {messengersList.map((item) => (
                                                <Row><Col>
                                                    <Label check>
                                                        <Input type="checkbox"
                                                               name={item.id}
                                                               onChange={(event) => {
                                                                   if (event.target.checked) {
                                                                       messangers.push(event.target.name);
                                                                   }else {
                                                                       messangers.splice(messangers.indexOf(event.target.name), 1);
                                                                   }
                                                                   setMessangers(messangers);
                                                               }}
                                                        />{' '}{item.name}
                                                    </Label>
                                                </Col></Row>
                                                )
                                            )}
                                        </Col>
                                    </FormGroup>)}
                                </Col>
                            </Row>


                            <Row><Col><h4 className='text-center'> Distances</h4></Col></Row>
                            <Row>
                                <Col>Type of Transportation</Col>
                                <Col>0-7 Km</Col>
                                <Col>8-5 Km</Col>
                                <Col>16-25 km</Col>
                                <Col>26+ km</Col>
                            </Row>
                            <Row>
                                <Col>Moto</Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['moto'][0]}
                                           onChange={(event) => {
                                               servicesValue['moto'][0] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['moto'][1]}
                                           onChange={(event) => {
                                               servicesValue['moto'][1] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['moto'][2]}
                                           onChange={(event) => {
                                               servicesValue['moto'][2] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['moto'][3]}
                                           onChange={(event) => {
                                               servicesValue['moto'][3] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Car</Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['car'][0]}
                                           onChange={(event) => {
                                               servicesValue['car'][0] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['car'][1]}

                                           onChange={(event) => {
                                               servicesValue['car'][1] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['car'][2]}

                                           onChange={(event) => {
                                               servicesValue['car'][2] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['car'][3]}

                                           onChange={(event) => {
                                               servicesValue['car'][3] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Truck</Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['truck'][0]}
                                           onChange={(event) => {
                                               servicesValue['truck'][0] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['truck'][1]}
                                           onChange={(event) => {
                                               servicesValue['truck'][1] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['truck'][2]}
                                           onChange={(event) => {
                                               servicesValue['truck'][2] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                                <Col>
                                    <Input type="text"
                                           value={servicesValue['truck'][3]}
                                           onChange={(event) => {
                                               servicesValue['truck'][3] = event.target.value;
                                               setServicesValue(servicesValue);
                                           }}
                                    />
                                </Col>
                            </Row>
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
                                <CardTitle tag="h4">User</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>name</th>
                                        <th>email</th>
                                        <th>password</th>
                                        <th>phone</th>
                                        <th>address</th>
                                        <th>contact_person</th>
                                        <th>contact_person_phone</th>
                                        <th>action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.map((item) => (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.password}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.address}</td>
                                                <td>{item.contact_person}</td>
                                                <td>{item.contact_person_phone}</td>
                                                <td>
                                                    <Button color="primary"
                                                            onClick={() => modalEdit(item)}>update</Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
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

export default Tables;
