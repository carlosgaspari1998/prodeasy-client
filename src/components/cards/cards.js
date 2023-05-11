import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        description={props.description}
        timeReady={props.timeReady}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-title">{props.description}</h1>
        <p className="card-id">{props.id}</p>
        <h3 className="card-cost">{props.timeReady}</h3>
      </div>
    </>
  );
}
