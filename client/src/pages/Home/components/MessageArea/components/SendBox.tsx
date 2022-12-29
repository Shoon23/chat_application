import React from "react";

type Props = {
  message: string;
};

const SendBox: React.FC<Props> = ({ message }) => {
  return (
    <div className="self-end card w-3/6 m-2 bg-accent text-primary-content">
      <div className="card-body">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SendBox;
