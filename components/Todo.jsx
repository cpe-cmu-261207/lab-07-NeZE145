import React, { useState } from "react";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Todo(props) {
  const [dispaly, setdisplay] = useState(false);
  return (
    <div
      onMouseOver={() => setdisplay(true)}
      onMouseOut={() => setdisplay(false)}
      className="border-bottom p-1 py-2 fs-2 d-flex gap-2"
    >
      <span
        style={props.completed ? { textDecoration: "line-through" } : null}
        className="me-auto"
      >
        {props.title}
      </span>
      {dispaly && (
        <button onClick={() => props.MARK()} className="btn btn-success">
          <IconCheck />
        </button>
      )}
      {dispaly && (
        <button onClick={() => props.MOVEUP()} className="btn btn-secondary">
          <IconArrowUp />
        </button>
      )}
      {dispaly && (
        <button onClick={() => props.MOVEDOWN()} className="btn btn-secondary">
          <IconArrowDown />
        </button>
      )}
      {dispaly && (
        <button onClick={() => props.DELETE()} className="btn btn-danger">
          <IconTrash />
        </button>
      )}
    </div>
  );
}
