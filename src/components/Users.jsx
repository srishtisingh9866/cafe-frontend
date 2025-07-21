import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Users.css"; // Import the CSS file

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users`;
      await axios.post(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User added successfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users/${editId}`;
      await axios.patch(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="users-mgmt-container">
      <h2 className="users-mgmt-title">User Management</h2>
      {error && <div className="cart-error">{error}</div>}
      <form ref={frmRef} className="users-mgmt-form">
        <input
          name="firstName"
          value={form.firstName}
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          value={form.lastName}
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          value={form.email}
          type="text"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          value={form.password}
          type="password"
          placeholder="New Password"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={form.role}
          required
          onChange={handleChange}
        >
          <option value="">--Select Role--</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {editId ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel} type="button">Cancel</button>
          </>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </form>
      <div className="users-mgmt-search">
        <input
          type="text"
          placeholder="Search users..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button onClick={fetchUsers}>Search</button>
      </div>
      <div>
        <table className="users-mgmt-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((value) => (
              <tr key={value._id}>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>
                  <button onClick={() => handleEdit(value)}>Edit</button>
                  <button onClick={() => handleDelete(value._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="users-mgmt-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}