import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import axios from "axios";
import {AuthRegister} from "./Validation/AuthRegister.js";
import mainPic from './assets/6.jpeg';


export const AdminManage=({props})=>{

    const {Email,Password,role,CPassword,setEmail,setPass,setCPass,setRole,handleLoggin,handleAdminManage,setIsLoggin,usersData}=props

    const handleR = () => {

        const user = usersData.find((item) => item.email === Email);

        if (user) {
            const response = axios.post('http://localhost:5174/api/updateUser', {
                mail: Email,
                role: role,
            })

            if(response){
                alert('Successfully updated user')
            }
            setEmail('')

        } else {
            alert('Please fill in all the required fields and make sure that your password is right');
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
                                                <span className="h1 fw-bold mb-0">Admin Manage User</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Update a User
                                            </h5>
                                            <div className="form-outline mb-4">
                                                <input value={Email} type="email" id="form2Example17"
                                                       className="form-control form-control-lg"
                                                       onChange={e=>{setEmail(e.target.value)}}/>
                                                <label className="form-label" htmlFor="form2Example17">
                                                    Email address
                                                </label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example27">
                                                    Role
                                                </label>
                                                <select
                                                    className="form-select form-select-lg"
                                                    id="form2Example27"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <option value="employee">Employee</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>


                                            <div className="pt-1 mb-4">
                                                <Button variant="dark" size="lg" onClick={handleR}>
                                                    Update User
                                                </Button>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <Button variant="dark" size="lg" onClick={handleAdminManage}  style={{color: 'white'}}>
                                                    Go Back
                                                </Button>
                                            </div>


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