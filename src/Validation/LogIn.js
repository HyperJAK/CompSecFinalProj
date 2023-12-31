import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Card} from 'react-bootstrap';
import {AuthRegister} from "./AuthRegister.js";
import {DecryptPassword, EncryptPassword} from "../Utilities.js";
import mainPic from '../assets/6.jpeg';




export const LogIn = ({props}) => {


    const {Email, Password, setEmail, setPass, handleLoggin, handleAdminAdd, usersData, setIsLoggin, setRole} = props;
    async function loginhandle() {
        const user = Array.isArray(usersData) ? usersData.find((item) => item.email === Email) ?? null : null;



        if (user) {
            const decryptedPass = await DecryptPassword(user.password);

            if(decryptedPass === Password){
                setRole(user.role)
                handleLoggin()
            }
            else{
                alert("Invalid email or password");
            }

        } else {
            alert("Invalid email or password"); // You can replace this with your desired failure action
        }
    }





    return(
        <section style={{ backgroundColor: '#a8d2f0', backgroundSize: 'cover', height: '100vh', overflow: 'auto' }}>
        <Container className="py-5 h-100">
            <Row className="d-flex justify-content-center align-items-center h-100">
                <Col xl={10}>
                    <Card style={{borderRadius: '1rem'}}>
                        <Row className="g-0">
                            <Col md={6} lg={5} className="d-none d-md-block" >
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
                                            <span className="h1 fw-bold mb-0">Sign In</span>
                                        </div>
                                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>
                                            Sign into your account
                                        </h5>
                                        <div className="form-outline mb-4">
                                            <input value={Email} type="email" id="form2Example17"
                                                   className="form-control form-control-lg"
                                                   onChange={e=>{
                                                       if(e.target.value.length < 100){
                                                           setEmail(e.target.value)
                                                       }}}/>
                                            <label className="form-label" htmlFor="form2Example17">
                                                Email address
                                            </label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input value={Password} type="password" id="form2Example27"
                                                   className="form-control form-control-lg"
                                                   onChange={e=>{
                                                       if(e.target.value.length < 50){
                                                           setPass(e.target.value)
                                                       }}}/>
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