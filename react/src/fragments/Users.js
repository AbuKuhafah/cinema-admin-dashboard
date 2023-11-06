import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getUsers, blockUser, unblockUser } from "../data/repository";
import MessageContext from "../contexts/MessageContext";
import { useUserContext } from '../contexts/UserContext';
import './users.css'


export default function Users() {

  const { state, dispatch } = useUserContext();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // Get users data from db
    const currentUsers = await getUsers();
    dispatch({ type: 'SET_USERS', payload: currentUsers });
  };
  //handle user blocking
  const handleBlock = async (email) => {
    await blockUser({ email });

    await loadUsers();
    dispatch({ type: 'SET_MESSAGE', payload: <><strong>{email}</strong> has been locked successfully.</> });
  };
  //handle user unblocking
  const handleUnblock = async (email) => {
    await unblockUser({ email });

    await loadUsers();
    dispatch({ type: 'SET_MESSAGE', payload: <><strong>{email}</strong> has been unlocked successfully.</> });
  };

  if (state.users === null) return null;

  return (
    <div>
      {state.message && <div className="alert alert-success" role="alert">{state.message}</div>}
      <h1 className="display-4">Users</h1>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Account Locked</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.locked.toString()}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleBlock(user.email)}>Block</button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleUnblock(user.email)}>Unblock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

