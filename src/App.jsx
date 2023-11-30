import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./HomePage/Home.jsx";
import LogIn from "./LogIn.jsx";
import {Registre} from "./Registre.jsx";
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
    const [role, setRole] = useState("employee"); // or 'employee' based on your authentication logic
    const [isSaving, setisSaving] = useState(false);
    console.log('UserRole in App:', role);
    console.log('UserEamil in App:', Email);
    useEffect(() => {
        // Fetch table data
        axios.get('http://localhost:5174/api/get').then((response) => {
            setTableData(response.data);
        });

        axios.get('http://localhost:5174/api/getUsers').then((response) => {
            setUsersData(response.data);
        });
        

        setisSaving(false)
    }, [isLoggin,isRegistring,isSaving] );


    useEffect(() => {
        // Fetch user role
        axios.get('http://localhost:5174/api/getRole', {
          params: {
            userEmail: Email, // Replace with the actual user's email
          },
        })
          .then(response => {
            const fetchedRole = response.data.role;
            setRole(fetchedRole);
          })
          .catch(error => {
            console.error('Error fetching user role:', error);
          });
      }, [!isLoggin]);




    function handleLoggin() {
setIsLoggin(!isLoggin);
        
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
        return (LogIn(Email, Password, setEmail, setPass, handleLoggin, handleRegistring, usersData, setIsLoggin));
    } else if (isRegistring) {
return (<Registre props={{Email,Password,role,CPassword,setEmail,setPass,setCPass,setRole,handleLoggin,handleRegistring,setIsLoggin}}/>)
    } else {
        return (<>
<Home tableData={tableData} setTableData={setTableData} handleLoggin={handleLoggin} Email={Email }setEmail={setEmail} setPass={setPass} setCPass={setCPass} role={role} setisSaving={setisSaving} handleRegistring={handleRegistring}/>
                <Alert
                    showSessionExpiredModal={showSessionExpiredModal}
                    handleCloseSessionExpiredModal={handleCloseSessionExpiredModal}
                />
            </>
        );
    }
    
}



