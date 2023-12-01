import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {FileUpload} from "../UploadFile.jsx";

export default function Home({tableData,setTableData,handleLoggin,Email,setEmail,setPass,setCPass,role,setisSaving,handleAdminAdd,handleAdminManage}) {


    console.log('UserRole in Home:', role);
    console.log('UserEamil in Home:', Email);
    

    
    const [showInputFields, setShowInputFields] = useState(false);
    const { logout} = useAuth0();

    const handlelogout = () => {
        //To logout properly from Auth if used
        // eslint-disable-next-line react-hooks/rules-of-hooks

        logout({logoutParams: {returnTo: window.location.origin}}).then(r => {setIsLoggin(false);})

        setCPass(''),
        setEmail(''),
        setPass(''),
        handleLoggin()
        //Add here the auth logout
    };

    const handleAddButtonClick = () => {
        setShowInputFields(true);
    };

    const handlesecond = () => {
    setShowInputFields(false);
    setFormData(() => ({
        name: '',
        email: '',
        title: '',
        department: '',
        status: '',
        position: '',
        picture: 'https://mdbootstrap.com/img/new/avatars/8.jpg',
        canDelete: false
    }));}

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        department: '',
        status: '',
        position: '',
        picture: 'https://mdbootstrap.com/img/new/avatars/8.jpg',
        canDelete: false
    });

    const handleSaveButtonClick = async () => {

        if (formData.name && formData.email && formData.title) {
                 axios.post('http://localhost:5174/api/insert', {
                    name: formData.name,
                    email: formData.email,
                    title: formData.title,
                    department: formData.department,
                    status: formData.status,
                    position: formData.position,
                    picture: formData.picture,
                    allowed: formData.canDelete
                });
                setisSaving(true)

        }
         else {
            alert('Please fill in the required fields (Name, Email, Title).');
        }
    };


    const handleDeleteButtonClick = (id) => {
        // Check if the user has the necessary role before making the delete request
        if (role === 'admin') {
          // Make DELETE request to the server
          axios.delete(`http://localhost:5174/api/delete/${id}`)
            .then(() => {
              // If deletion on the server is successful, update the state
              setTableData((prevTableData) => prevTableData.filter((data) => data.id !== id));
            })
            .catch((error) => {
              console.error('Error deleting record:', error);
            });
        } else {
          // User does not have the necessary privileges
          alert('You do not have permission to delete employees.');
        }
      };



    return (
        <>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* eslint-disable-next-line react/prop-types */}
                {Array.isArray(tableData) && tableData.map((data) => (
                    <tr key={data.id}>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src={data.picture}
                                    alt=""
                                    style={{ width: '45px', height: '45px' }}
                                    className="rounded-circle"
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{data.name}</p>
                                    <p className="text-muted mb-0">{data.email}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{data.title}</p>
                            <p className="text-muted mb-0">{data.department}</p>
                        </td>
                        <td>
                                <span className="badge badge-success rounded-pill d-inline">
                                    {data.status}
                                </span>
                        </td>
                        <td>{data.position}</td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-link btn-sm btn-rounded"
                                onClick={() => handleDeleteButtonClick(data.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleAddButtonClick}
            >
                Add
            </button>

            {showInputFields && (
                <div className="mt-3">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Email"
                        name="email"
                        value={formData.Email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Title"
                        name="title"
                        value={formData.Title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Department"
                        name="department"
                        value={formData.Department}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Status"
                        name="status"
                        value={formData.Status}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Position"
                        name="position"
                        value={formData.Position}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            handleSaveButtonClick();
                            handlesecond();
                        }}
                    >
                        Save
                    </button>
                </div>
            )}
            <br/><br/><br/><br/><br/>
            <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handlelogout}
            >
                Log Out
            </button>

            <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleAdminAdd}
                style={{display: role==="admin"? "block":"none"}}
            >
                Add Users
            </button>

            <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleAdminManage}
                style={{display: role==="admin"? "block":"none"}}
            >
                Manage Users
            </button>

            <br></br>

            <FileUpload />

        </>
    );
}
