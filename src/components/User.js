import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, logOutUser } from '../redux/userSlice';
import Navbar from './Navbar';

/* eslint-disable */
const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, name, picture, email } = JSON.parse(localStorage.getItem('user'));
    const updatedUser = useSelector((state) => state.user);
    const [user, setUser] = useState({
        id,
        name,
        picture,
    });

    const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);
    const [showPicture, setShowPicture] = useState(false);
    const [showName, setShowName] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        dispatch(updateUser(user));
    };

    const handleShowPicture = () => {
        setShowPicture(!showPicture);
    };

    const handleShowName = () => {
        setShowName(!showName);
    };

    const handleLogoutClick = () => {
        dispatch(logOutUser());
        localStorage.clear();
    };

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (updatedUser.status === 'updated successfully') {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUpdatedSuccessfully(true);
            setShowName(false);
            setShowPicture(false);
        }
    }, [updatedUser]);

    useEffect(() => {
        // If updated successfully, update the user state with the new data
        if (updatedSuccessfully) {
            setUser({
                id,
                name: updatedUser.name,
                picture: updatedUser.picture,
            });
        }
    }, [updatedSuccessfully, id, updatedUser]);

    return (
        <div className="page_container">
            <Navbar />
            <div className="profile-container">
                <div className="profile">
                    <img src={user.picture} alt="profile" />
                    <button type="button" className="edit-btn" onClick={handleShowPicture}>edit</button>
                    {showPicture ? (
                        <form>
                            <label htmlFor="picture">Please enter a valid image URL</label>
                            <input type="text" name='picture' value={user.picture} onChange={handleChange} />
                            <button type="submit" onClick={handleUpdateUser}>Submit</button>
                        </form>
                    ) : null}
                </div>
                <div className="profile">
                    <p className="name">
                        <span>Username: </span>
                        {user.name}
                    </p>
                    <button type="button" className="edit-btn" onClick={handleShowName}>edit</button>
                    {showName ? (
                        <form>
                            <label htmlFor="name">Please enter your desired username</label>
                            <input type="text" name='name' value={user.name} onChange={handleChange} />
                            <button type="submit" onClick={handleUpdateUser}>Submit</button>
                        </form>
                    ) : null}
                </div>
                <p className="profile-email">
                    <span>Email: </span>
                    {email}
                </p>
                <div className="button_wrapper">
                    <button type="button" className="cancel_btn" onClick={handleBack}>
                        Back to home
                    </button>
                    <Link to="/" onClick={handleLogoutClick} className="btn">
                        <MdLogout className="signout-icon" />
                        Log out
                    </Link>
              </div>
            </div>
        </div>
    );
};

export default User;
