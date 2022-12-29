import React from "react";

type Props = {
  message: string;
};

const ReceiveBox: React.FC<Props> = ({ message }) => {
  return (
    <div className="card w-3/6 m-2 bg-neutral text-primary-content">
      <div className="card-body">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ReceiveBox;
