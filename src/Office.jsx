import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api/offices";

function Office() {
  const [roomName, setRoomName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [deleteRoomNumber, setDeleteRoomNumber] = useState("");
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState("");

  async function loadOffices() {
    try {
      const response = await axios.get(API_URL + "/all");
      setOffices(response.data);
    } catch (error) {
      alert("Could not load offices. Please check your backend!");
    }
  }

  useEffect(() => {
    loadOffices();
  }, []);

  async function saveOffice() {
    if (roomName.trim() === "" || roomNumber.trim() === "") {
      alert("Please fill in both Room Name and Room Number.");
      return;
    }

    try {
      const response = await axios.post(API_URL + "/save", {
        roomName: roomName,
        roomNumber: roomNumber
      });

      if (response.status === 200) {
        alert("Office saved successfully!");
        setRoomName("");
        setRoomNumber("");
        loadOffices();
      }
    } catch (error) {
      alert("Error saving office. Please check your backend!");
    }
  }

  async function deleteOffice() {
    if (deleteRoomNumber.trim() === "") {
      alert("Please enter a Room Number to delete.");
      return;
    }

    try {
      const response = await axios.delete(API_URL + "/delete-by-room/" + deleteRoomNumber);

      if (response.status === 200 || response.status === 204) {
        alert("Office deleted successfully!");
        setDeleteRoomNumber("");
        loadOffices();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Office not found. Check the Room Number.");
      } else {
        alert("Error deleting office. Please check your backend!");
      }
    }
  }

  async function deleteOfficeById(id, name) {
    const sure = window.confirm("Delete office '" + name + "'?");
    if (!sure) {
      return;
    }

    try {
      const response = await axios.delete(API_URL + "/delete/" + id);

      if (response.status === 200 || response.status === 204) {
        alert("Office deleted successfully!");
        loadOffices();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Office not found. It may already be deleted.");
        loadOffices();
      } else {
        alert("Error deleting office. It may be assigned to a doctor.");
      }
    }
  }

  function updateOffice(office) {
    alert("Update will be covered in the next class.");
  }

  const keyword = search.trim().toLowerCase();
  const filteredOffices = offices.filter(office =>
    (office.roomName || "").toLowerCase().includes(keyword) ||
    (office.roomNumber || "").toLowerCase().includes(keyword)
  );

  const cellStyle = { border: "1px solid #666", padding: "8px 14px" };

  return (
    <div>
      <h1>Save Office</h1>

      <label>Room Name:</label>
      <input
        type="text"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
      />
      <br /><br />

      <label>Room Number:</label>
      <input
        type="text"
        value={roomNumber}
        onChange={e => setRoomNumber(e.target.value)}
      />
      <br /><br />

      <button onClick={saveOffice}>Save</button>

      <hr style={{ margin: "40px 0" }} />

      <h1>Delete Office</h1>

      <label>Room Number:</label>
      <input
        type="text"
        value={deleteRoomNumber}
        onChange={e => setDeleteRoomNumber(e.target.value)}
      />
      <br /><br />

      <button onClick={deleteOffice}>Delete</button>

      <hr style={{ margin: "40px 0" }} />

      <h1>Available Offices</h1>

      <label>Search:</label>
      <input
        type="text"
        placeholder="Room name or room number"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <br /><br />

      <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Room Name</th>
            <th style={cellStyle}>Room Number</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOffices.length === 0 ? (
            <tr>
              <td style={cellStyle} colSpan="3">No offices found.</td>
            </tr>
          ) : (
            filteredOffices.map(office => (
              <tr key={office.id}>
                <td style={cellStyle}>{office.roomName}</td>
                <td style={cellStyle}>{office.roomNumber}</td>
                <td style={cellStyle}>
                  <button onClick={() => updateOffice(office)}>Update</button>
                  {" "}
                  <button onClick={() => deleteOfficeById(office.id, office.roomName)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Office;
