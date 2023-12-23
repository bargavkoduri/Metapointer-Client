import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "./constants";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [paymentData, setPaymentData] = useState({
    phoneNumber: "",
    amount: "",
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMakePayment = (e) => {
    e.preventDefault();
    const { _id, jwtToken } = JSON.parse(localStorage.getItem("UserData"));
    paymentData.amount = parseInt(paymentData.amount)
    axios
      .post(`${SERVER_URL}/users/${_id}/process-transaction`, paymentData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((resp) => {
        alert("Transaction Successful " + resp.data.cashback);
      })
      .catch(() => {
        alert("Transaction Failed");
      });
  };

  const getInfo = () => {
    const { _id, jwtToken } = JSON.parse(localStorage.getItem("UserData"));
    axios
      .get(`${SERVER_URL}/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((resp) => {
        setInfo(resp.data);
      })
      .catch((err) => {
        alert("Unable to get data");
      });
  };

  const getTransactions = () => {
    const { _id, jwtToken } = JSON.parse(localStorage.getItem("UserData"));
    axios.get(`${SERVER_URL}/users/${_id}/transactions`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then(resp => {
        setTransactions(resp.data)
    })
    .catch((err) => {
        alert("Unable to fetch transactions")
    })
  };

  const Logout = () => {
    localStorage.clear("UserData");
    navigate("/");
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="container mt-5 d-flex">
        <div
          className="card p-3"
          style={{
            maxWidth: "400px",
            margin: "auto",
            border: "1px solid #ccc",
          }}
        >
          <div className="mb-3">
            <img
              src={
                "https://imgs.search.brave.com/eOJZftzbDeDBnwrGYQE39LgqJcwSiurYKPj1aPKD3NQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdC5k/ZXBvc2l0cGhvdG9z/LmNvbS8yMTAxNjEx/LzM5MjUvdi82MDAv/ZGVwb3NpdHBob3Rv/c18zOTI1ODE0My1z/dG9jay1pbGx1c3Ry/YXRpb24tYnVzaW5l/c3NtYW4tYXZhdGFy/LXByb2ZpbGUtcGlj/dHVyZS5qcGc"
              }
              alt="Static"
              className="img-fluid rounded"
            />
          </div>

          <div className="mb-3">
            <p>
              <strong>Phone Number:</strong> {info.phoneNumber}
            </p>
            <p>
              <strong>Balance:</strong> {info.balance}
            </p>
          </div>

          <div className="mb-3">
            <button className="btn btn-danger" onClick={Logout}>
              Logout
            </button>
          </div>
        </div>
        <div
          className="card p-3"
          style={{
            maxWidth: "400px",
            margin: "auto",
            border: "1px solid #ccc",
          }}
        >
          <form onSubmit={handleMakePayment}>
            <div className="mb-3">
              <label htmlFor="paymentPhoneNumber" className="form-label">
                Recipient's Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="paymentPhoneNumber"
                name="phoneNumber"
                value={paymentData.phoneNumber}
                onChange={handlePaymentChange}
                placeholder="Enter recipient's phone number"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="paymentAmount" className="form-label">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="paymentAmount"
                name="amount"
                value={paymentData.amount}
                onChange={handlePaymentChange}
                placeholder="Enter amount"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Make Payment
            </button>
          </form>
        </div>
      </div>
      <div className="container" style={{marginTop: "80px"}}>
      <button onClick={getTransactions} className="btn btn-secondary">
        Fetch Transactions
      </button>
      {
        transactions.length === 0 ?   <></> : <TableComponent data={transactions} />
      }
      </div>
    </>
  );
};

const TableComponent = ({ data }) => {
  return (
    <div className="container mt-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>To/From</th>
            <th>Amount</th>
            <th>Mode</th>
            <th>Previous Balance</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.to_phoneNumber}</td>
              <td>{item.amount}</td>
              <td>{item.mode}</td>
              <td>{item.previousAmount}</td>
              <td>{item.currentAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
