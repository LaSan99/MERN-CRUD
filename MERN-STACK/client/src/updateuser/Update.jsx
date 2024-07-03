import React, { useEffect, useState } from 'react';
import "./update.css";
import { Link , useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
        const users = {
            name:"",
            email:"",
            address:"",
        };
        const [user,setUser] = useState(users);
        const navigate = useNavigate();
        const {id} = useParams();

        const inputHandler = (e) =>{
            const{name, value} = e.target
            console.log(name,value);

            setUser({...user, [name]:value});
        };

        useEffect(()=>{
            axios.get(`http://localhost:8000/api/user/${id}`)
            .then((Response)=>{
                setUser(Response.data)
            })
           .catch((error)=>{
            console.log(error);
           });
        },[id]);

        const submitForm = async(e)=>{
            e.preventDefault();
            await axios.put(`http://localhost:8000/api/update/user/${id}`,user)
            .then((Response)=>{
                //console.log("User Created!");
                toast.success(Response.data.message,{position:"top-right"});

                navigate("/");
            })


            .catch((error)=>{
                console.log(error);
            })
        }

  return (
    <div className='addUser'>
        <Link to="/" type="button" class="btn btn-secondary"> <i class="fa-solid fa-angles-left"></i> Back</Link>
      <h3>Update User</h3>
      <form action="" className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
            <label htmlFor="name">Name:</label>
            <input type="text" 
            id='name' 
            value={user.name}
            onChange={inputHandler}
            name='name' 
            autoComplete='off' 
            placeholder='Enter Your Name'/>
        </div>
        <div className='inputGroup'>
            <label htmlFor="email">E-mail:</label>
            <input type="text" 
            id='email' 
            value={user.email}
            onChange={inputHandler}
            name='email' 
            autoComplete='off' 
            placeholder='Enter Your Email'/>
        </div>
        <div className='inputGroup'>
            <label htmlFor="address">Address:</label>
            <input type="text" 
            id='address' 
            value={user.address}
            onChange={inputHandler}
            name='address' 
            autoComplete='off' 
            placeholder='Enter Your Address'/>
        </div>
        <div className='inputGroup'>
        <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
