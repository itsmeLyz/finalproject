import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import './styling.css';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/student")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
      setFilteredStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedFaculty = event.target.value;
    setSelectedFaculty(selectedFaculty);

    if (selectedFaculty === "All") {
      setFilteredStudents(students);
    } else {
      const filteredData = students.filter(
        (student) => student.faculty === selectedFaculty
      );
      setFilteredStudents(filteredData);
    }
  };

  return (
    <>
      <Navbar />
      <label htmlFor="filter">Filter by Faculty:</label>
      <select
        id="filter"
        value={selectedFaculty}
        onChange={handleFilterChange}
        data-testid="filter"
      >
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">
          Fakultas Ilmu Sosial dan Politik
        </option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">
          Fakultas Teknologi Informasi dan Sains
        </option>
      </select>

      {isLoading ? (
        <p className="loading">Loading ...</p>
      ) : (
        <>
          <table id="table-student">
            <thead>
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Faculty</th>
                <th>Program Study</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="student-data-row">
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                  </td>
                  <td>{student.faculty}</td>
                  <td>{student.programStudy}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(student.id)}
                      data-testid={`delete-${student.id}`}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Student;
