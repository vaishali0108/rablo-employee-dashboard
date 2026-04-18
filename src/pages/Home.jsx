import { useEffect, useState } from "react";
import EmployeeCard from "./Card";
import { FiSearch } from "react-icons/fi";
import "./Home.css";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchId, setSearchId] = useState("");

  const DELETED_KEY = "deleted_ids";

  // 🔥 FETCH + APPLY LOCALSTORAGE FILTER
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const deletedIds =
          JSON.parse(localStorage.getItem(DELETED_KEY)) || [];

        const cleanData = data.filter(
          (emp) => !deletedIds.includes(emp.id)
        );

        setEmployees(cleanData);
        setFiltered(cleanData);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔍 REAL-TIME SEARCH (MAIN FIX)
  useEffect(() => {
    if (!searchId) {
      setFiltered(employees);
    } else {
      const result = employees.filter((emp) =>
        emp.id.toString().includes(searchId)
      );
      setFiltered(result);
    }
  }, [searchId, employees]);

  // 🗑️ DELETE (UI + localStorage)
  const handleDelete = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);

    setEmployees(updated);

    const deletedIds =
      JSON.parse(localStorage.getItem(DELETED_KEY)) || [];

    if (!deletedIds.includes(id)) {
      localStorage.setItem(
        DELETED_KEY,
        JSON.stringify([...deletedIds, id])
      );
    }
  };

  return (
    <div className="home-container">
      <h1>Employee Dashboard</h1>

      <p className="description">
        Search, view and manage employees
      </p>

      {/* SEARCH */}
      <div className="search-box">
        <div className="search-input">
          <FiSearch className="search-icon" />

          <input
            type="number"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((emp) => (
            <EmployeeCard
              key={emp.id}
              emp={emp}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No employees found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
