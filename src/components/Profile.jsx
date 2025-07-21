import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Import the CSS file

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile();
      setError("Data saved successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="profile-container">
      <h3 className="profile-title">My Profile</h3>
      <button className="profile-btn" onClick={logout}>Logout</button>
      {error && <div className="profile-error">{error}</div>}
      <form className="profile-form" onSubmit={e => {e.preventDefault(); handleSubmit();}}>
        <input
          name="firstName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.firstName}
          placeholder="First Name"
        />
        <input
          name="lastName"
          type="text"
          onChange={handleChange}
          defaultValue={profile.lastName}
          placeholder="Last Name"
        />
        <input
          name="email"
          type="text"
          onChange={handleChange}
          defaultValue={profile.email}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          defaultValue={profile.password}
          placeholder="Password"
        />
        <button className="profile-btn" type="submit">Update Profile</button>
      </form>
    </div>
  );
}