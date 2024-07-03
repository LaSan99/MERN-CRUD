import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './user.css';

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.log("Error in fetching data", error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/delete/user/${userId}`);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            toast.success("User deleted successfully", { position: "top-right" });
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user", { position: "top-right" });
        }
    };

    return (
        <div className='userTable'>
            <Link to="/add" className="btn btn-primary">Add User <i className="fa-solid fa-user-plus"></i></Link>

            {users.length === 0 ? (
                <div className='noData'>
                    <h3>No User Data</h3>
                    <p>Add New User!</p>
                </div>
            ) : (
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th scope='col'>S.No.</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td className='actionButtons'>
                                    <Link to={`/update/${user._id}`} className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button onClick={() => deleteUser(user._id)} className="btn btn-danger">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default User;
