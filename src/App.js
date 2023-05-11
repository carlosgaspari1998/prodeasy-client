import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      description: values.description,
      timeReady: values.timeReady,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        description: values.description,
        timeReady: values.timeReady,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            description: values.description,
            timeReady: values.timeReady,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div>
      <div className="app demand">
        <div className="register-container">
          <h1 className="register-title">CADASTRAR PEDIDO</h1>
          <div className="app field">
            <h3>Descrição: </h3>
            <input
              type="text"
              placeholder="Descrição"
              name="description"
              className="input description"
              onChange={handleaddValues}
            />
          </div>

          <div className="app field">
            <h3>Horário retirada: </h3>
            <input
              type="time"
              placeholder="Horário"
              name="timeReady"
              className="input"
              onChange={handleaddValues}
            />
         </div>
          <button onClick={handleRegisterGame} className="register-button">
            Cadastrar
          </button>
        </div>
      </div>
      <div className="app list">
      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          description={val.description}
          timeReady={val.timeReady}
        />
      ))}
      </div>
    </div>
  );
}
