import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import {AuthRegister} from "./Validation/AuthRegister.jsx";



export default function LogIn(Email,Password,setEmail,setPass,handleLoggin,handleRegistring,usersData,setIsLoggin){


    function loginhandle() {
        const user = usersData.find((item) => item.email === Email && item.password === Password);

        if(user){
           handleLoggin()
        } else {
            alert("Invalid email or password"); // You can replace this with your desired failure action
        }
    }





    return(
        <section style={{ backgroundColor: '#d0bec3', backgroundSize: 'cover', height: '100vh', overflow: 'auto' }}>
        <Container className="py-5 h-100">
            <Row className="d-flex justify-content-center align-items-center h-100">
                <Col xl={10}>
                    <Card style={{borderRadius: '1rem'}}>
                        <Row className="g-0">
                            <Col md={6} lg={5} className="d-none d-md-block">
                                <Card.Img
                                    src='src/assets/2.jpg'
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
                                            <span className="h1 fw-bold mb-0">Sign In</span>
                                        </div>
                                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>
                                            Sign into your account
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
                                            <input value={Password} type="password" id="form2Example27"
                                                   className="form-control form-control-lg"
                                                   onChange={e=>{setPass(e.target.value)}} />
                                            <label className="form-label" htmlFor="form2Example27">
                                                Password
                                            </label>
                                        </div>
                                        <div className="pt-1 mb-4">
                                            <Button variant="dark" size="lg" onClick={loginhandle}>
                                                Login
                                            </Button>
                                        </div>
                                        <AuthRegister setIsLoggin={setIsLoggin}/>

                                        <a href="#!" className="small text-muted">
                                            Terms of use.
                                        </a>
                                        <a href="#!" className="small text-muted">
                                            Privacy policy
                                        </a>
                                    </form>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    </section>);

}