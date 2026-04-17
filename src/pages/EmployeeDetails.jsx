import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeDetails.css";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/users/" + id)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // 🔥 LOADING STATE
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // 🔥 ERROR STATE
  if (!employee) {
    return <h2 style={{ textAlign: "center" }}>No Data Found</h2>;
  }

  return (
    <div className="details-container">
      <h1 className="details-title">Employee Details</h1>

      <div className="details-card">
        <p><b>ID:</b> {employee.id}</p>
        <p><b>Name:</b> {employee.name}</p>
        <p><b>Email:</b> {employee.email}</p>

        <p>
          <b>Address:</b>{" "}
          {employee.address?.street || "N/A"},{" "}
          {employee.address?.city || "N/A"}
        </p>

        <p><b>Phone:</b> {employee.phone}</p>

        <p>
          <b>Company:</b> {employee.company?.name || "N/A"}
        </p>
      </div>

      <button onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}

export default EmployeeDetails;