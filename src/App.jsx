import {useState, useEffect, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./HomePage/Home.jsx";
import LogIn from "./LogIn.jsx";
import Registre from "./Registre.jsx";
import {useIdleTimer} from "react-idle-timer"
import Alert from "./HomePage/AlertFunction.jsx";
import axios from "axios";


export default function App() {

    const [isLoggin, setIsLoggin] = useState(true);
    const [Email, setEmail] = useState("");
    const [Password, setPass] = useState("");
    const [CPassword, setCPass] = useState("");
    const [isRegistring, setIsRegistring] = useState(false);
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [usersData, setUsersData] = useState([]);



    useEffect(() => {
        // Fetch table data
        axios.get('http://localhost:5174/api/get').then((response) => {
            setTableData(response.data);
        });

        axios.get('http://localhost:5174/api/getUsers').then((response) => {
            setUsersData(response.data);
        });


    }, [isLoggin,isRegistring] );

    function handleLoggin() {
        if (name === "elie" && Password === "bc") {
            setIsLoggin(!isLoggin);
        } else {
            setIsLoggin(!isLoggin);
        }
    }

    const handleOnIdle = () => {
        if (!isRegistring && !isLoggin) {
            setShowSessionExpiredModal(true);
        }
    };

    const {reset} = useIdleTimer({
        timeout: 60000,
        onIdle: handleOnIdle,
    });

    // Reset the idle timer on component mount and when active state changes
    useEffect(() => {
        reset();

        return () => {
            setShowSessionExpiredModal(false)
        };
    }, [isLoggin, isRegistring, reset]);

    function handleRegistring() {
        setIsRegistring(!isRegistring);
    }

    const handleCloseSessionExpiredModal = () => {
        setIsLoggin(true);
        setIsRegistring(false);
    };


    if (isLoggin && !isRegistring) {
        return (LogIn(Email, Password, setEmail, setPass, handleLoggin, handleRegistring, usersData));
    } else if (isRegistring) {
        return (Registre(Email, Password, CPassword, setEmail, setPass, setCPass, handleLoggin, handleRegistring))
    } else {
        return (<>
                <Home tableData={tableData} setTableData={setTableData} handleLoggin={handleLoggin} setEmail={setEmail} setPass={setPass} setCPass={setCPass}/>
                <Alert
                    showSessionExpiredModal={showSessionExpiredModal}
                    handleCloseSessionExpiredModal={handleCloseSessionExpiredModal}
                />
            </>
        );
    }
}



