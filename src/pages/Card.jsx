import { useNavigate } from "react-router-dom";
import './Card.css'
function EmployeeCard({ emp, handleDelete }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/employee/${emp.id}`)}
    >
      <h3>{emp.name}</h3>

      <p><b>ID:</b> {emp.id}</p>

      <p><b>Email:</b> {emp.email}</p>

      <p>
        <b>Address:</b>{" "}
        {emp.address?.street}, {emp.address?.city}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(emp.id);
        }}
      >
        Delete
      </button>

      <button onClick={(e) => e.stopPropagation()}>
        Edit
      </button>
    </div>
  );
}

export default EmployeeCard;