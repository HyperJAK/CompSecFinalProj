import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Card, Form, FloatingLabel} from 'react-bootstrap';
import axios from "axios";
import {AuthRegister} from "./AuthRegister.js";
import {EncryptPassword, ValidEmail} from "../Utilities.js";
import mainPic from '../assets/6.jpeg';
import {EmailAndPass} from "./EmailAndPass.js";
import {useState} from "react";


export const AdminAdd=({props}) =>{

   const {Email,Password,CPassword,setEmail,setPass,setCPass,handleLoggin,handleAdminAdd,setIsLoggin}=props


    const [chosenRole, setChosenRole] = useState('employee');

    const handleR = async () => {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate required fields
        if (!Email || !Password || !CPassword) {
            alert('Please fill in all the required fields.');
            return;
        }

        // Validate password and confirmation match
        if (Password !== CPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Validate password strength (you can customize this rule)
        if (Password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }
        console.log(Password)

        const encrypted = await EncryptPassword(Password)
        setPass(encrypted);

        // Validate role
        if (chosenRole !== 'employee' && chosenRole !== 'admin') {
            alert('Invalid role selected.');
            return;
        }

        // If all validations pass, proceed with registration
        const response = axios.post('http://localhost:5174/api/insertUser', {
            mail: Email,
            pass: encrypted,
            role: chosenRole,
        })
            .catch(error => {
                console.error('Error in registration:', error);
            });

        if (response) {
            // Handle successful registration
            setPass('');
            setCPass('');
            setEmail('');
            alert('Registration successful!');
        }
    };


    return(
        <section style={{ backgroundColor: '#a8d2f0', backgroundSize: 'cover', height: '100vh', overflow: 'auto' }}>
            <Container className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col xl={10}>
                        <Card style={{borderRadius: '1rem'}}>
                            <Row className="g-0">
                                <Col md={6} lg={5} className="d-none d-md-block">
                                    <Card.Img
                                        src={mainPic}
                                        alt="login form"
                                        className="img-fluid"
                                        style={{borderRadius: '1rem 0 0 1rem', height: '700'}}
                                    />
                                </Col>
                                <Col md={6} lg={7} className="d-flex align-items-center">
                                    <Card.Body className="p-4 p-lg-5 text-black">
                                        <form>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3"
                                                   style={{color: '#ff6219'}}></i>
                                                <span className="h1 fw-bold mb-0">Admin Add User</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Add a User
                                            </h5>

                                            <EmailAndPass props={{Email,Password,setEmail,setPass}}/>
                                            <br></br>

                                            <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
                                                <Form.Control style={{ border: Password === CPassword ? '1px solid black' : '1px solid red' }} type="password" value={CPassword} onChange={e => setCPass(e.target.value)} />
                                            </FloatingLabel>


                                            <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example27">
            Role
          </label>
          <select
            className="form-select form-select-lg"
            id="form2Example27"
            value={chosenRole}
            onChange={(e) => setChosenRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
                                                
                                                 

                                                  
                                            <div className="pt-1 mb-4">
                                                <Button variant="dark" size="lg" onClick={handleR}>
                                                    Add User
                                                </Button>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <Button variant="dark" size="lg" onClick={handleAdminAdd}  style={{color: 'white'}}>
                                                    Go Back
                                                </Button>
                                            </div>

                                            <AuthRegister setIsLoggin={setIsLoggin}/>

                                        </form>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );

}