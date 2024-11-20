import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const onDeleteUser = async (id) => {
    if (
      window.confirm("¿Está seguro de que desea eliminar ese registro de usuario?")
    ) {
      const response = await axios.delete(`http://localhost:5000/user/${id}`);
      if(response.status === 200){
        toast.success(response.data);
        getUsers();
      }
    }
  };
  /* console.log("data=>", data); */

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Nombre</th>
            <th style={{ textAlign: "center" }}>Correo</th>
            <th style={{ textAlign: "center" }}>Contacto</th>
            <th style={{ textAlign: "center" }}>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Editar</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteUser(item.id)}
                    >
                      Eliminar
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">Ver</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
