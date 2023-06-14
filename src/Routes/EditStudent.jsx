import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/student/${id}`);
        const data = await response.json();
        if (isMounted) {
          setStudent(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchStudent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'programStudy') {
      let faculty = '';

      switch (value) {
        case 'Ekonomi':
        case 'Manajemen':
        case 'Akuntansi':
          faculty = 'Fakultas Ekonomi';
          break;
        case 'Administrasi Publik':
        case 'Administrasi Bisnis':
        case 'Hubungan Internasional':
          faculty = 'Fakultas Ilmu Sosial dan Politik';
          break;
        case 'Teknik Sipil':
        case 'Arsitektur':
          faculty = 'Fakultas Teknik';
          break;
        case 'Matematika':
        case 'Fisika':
        case 'Informatika':
          faculty = 'Fakultas Teknologi Informasi dan Sains';
          break;
        default:
          break;
      }

      setStudent((prevStudent) => ({
        ...prevStudent,
        programStudy: value,
        faculty: faculty,
      }));
    } else {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      navigate('/student');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Edit Student</h2>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={student?.fullname || ''}
                onChange={handleChange}
                data-testid="name"
              />
            </div>
            <div>
              <label htmlFor="faculty">Faculty:</label>
              <input
                type="text"
                id="faculty"
                name="faculty"
                value={student?.faculty || ''}
                onChange={handleChange}
                data-testid="faculty"
                disabled
              />
            </div>
            <div>
              <label htmlFor="prody">Program Study:</label>
              <input
                type="text"
                id="prody"
                name="programStudy"
                value={student?.programStudy || ''}
                onChange={handleChange}
                data-testid="prody"
              />
            </div>
            <div>
              <label>Profile Picture:</label>
              <img src={student?.profilePicture} alt="Profile" />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={student?.address || ''}
                onChange={handleChange}
                data-testid="address"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={student?.phoneNumber || ''}
                onChange={handleChange}
                data-testid="phoneNumber"
              />
            </div>
            <div>
              <label htmlFor="birthDate">Birth Date:</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={student?.birthDate || ''}
                onChange={handleChange}
                data-testid="date"
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={student?.gender || ''}
                onChange={handleChange}
                data-testid="gender"
              />
            </div>
            <button type="submit" data-testid="edit-btn">
              Edit Student
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditStudent;
