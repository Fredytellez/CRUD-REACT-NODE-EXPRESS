import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
        setUser({ ...response.data[0] });
    }
  };

  return (
    <div style={{marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
            <p>Detalles de usuario</p>
        </div>
        <div className="container">
            <strong>ID: </strong>
            <strong>{user && user.id}</strong>
            <br />
            <br />
            <strong>Nombre: </strong>
            <strong>{user && user.name}</strong>
            <br />
            <br />
            <strong>Correo: </strong>
            <strong>{user && user.email}</strong>
            <br />
            <br />
            <strong>Numero de contacto: </strong>
            <strong>{user && user.contact}</strong>
            <br />
            <br />
            <Link to={"/"}>
            <button className="btn btn-edit">Regresar</button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
