import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import {EncryptPassword} from "../Utilities.jsx";
import axios from "axios";

export const AuthRegister = ({setIsLoggin}) =>{
    const [isHovered, setIsHovered] = useState(false);
    const [decryptedText, setDecryptedText] = useState(null);

    const { isAuthenticated, user, loginWithPopup } = useAuth0();

    const button_style = {
        width: "100%",
        marginTop: "15px",
        borderRadius: "30px",
        height: "60px",
        color: isHovered ? "white" : "black",
        border: "1px solid red",
        backgroundColor: isHovered ? "#333333" : "transparent",
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuthenticated && user?.sub) {
                    console.log(user?.sub)
                    // Check if process is defined before using it
                    // eslint-disable-next-line no-undef
                    const encryptionKey = 'enc_secret_key';


                    const encrypted = await EncryptPassword(user.sub, encryptionKey);
                    console.log(encrypted);


                    try{

                        axios.post('http://localhost:5174/api/insertUser', {
                            mail: user.email,
                            pass: encrypted,
                            role: 'employee',
                        })

                    }catch(response){
                        alert((await response).data.error);
                    }



                    // Continue with your logic
                    setIsLoggin(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [isAuthenticated, user]);


    return (
        (
            <div className="pt-1 mb-4">
                <Button
                    style={button_style}
                    size="lg"
                    onClick={() => loginWithPopup()}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    External Login
                </Button>
            </div>
        )
    );
};
