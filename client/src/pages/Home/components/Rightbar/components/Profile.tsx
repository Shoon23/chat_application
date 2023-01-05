import React from "react";
import { iUser } from "../../../../../common/model";
type Props = {
  user: iUser | undefined;
};

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex place-items-center flex-col gap-2 border-b-4 border-slate-700  w-full">
      <div className="avatar content-center">
        <div className="w-24 rounded-full">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div className="text-2xl pb-2 font-bold text-white">{`${user?.first_name} ${user?.last_name}`}</div>
    </div>
  );
};

export default Profile;
