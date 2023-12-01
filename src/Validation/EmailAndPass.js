import {FloatingLabel, Form} from "react-bootstrap";
import {ValidEmail, ValidPassword} from "../Utilities.js";

export const EmailAndPass = ({props}) => {

    const { Email, Password, setEmail, setPass } = props;

    return (
        <>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control style={{ border: ValidEmail(Email) ? '1px solid black' : '1px solid red' }} type="email" placeholder="name@example.com" value={Email} onChange={e =>
                {
                    if(e.target.value.length < 100){
                        setEmail(e.target.value)
                    }

                }}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control style={{ border: ValidPassword(Password) ? '1px solid black' : '1px solid red' }} type="password" placeholder="Password" value={Password} onChange={e => {

                    if(e.target.value.length < 50){
                        setPass(e.target.value)
                    }

                }} />
            </FloatingLabel>
        </>
    );
};