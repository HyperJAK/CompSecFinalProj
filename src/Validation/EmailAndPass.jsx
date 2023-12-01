import {FloatingLabel, Form} from "react-bootstrap";
import {ValidEmail, ValidPassword} from "../Utilities.jsx";

export const EmailAndPass = ({ email, password, setEmail, setPass }) => {
    return (
        <>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control style={{ border: ValidEmail(email) ? '1px solid black' : '1px solid red' }} type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control style={{ border: ValidPassword(password) ? '1px solid black' : '1px solid red' }} type="password" placeholder="Password" value={password} onChange={e => setPass(e.target.value)} />
            </FloatingLabel>
        </>
    );
};