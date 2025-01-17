import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { activeButton } from "../../../redux/tripSlice";
import { useDispatch } from "react-redux";

const SpecialCard = (props) => {
  const dispatch = useDispatch();

  const hide = () => {
    dispatch(activeButton(false));
  };

  return (
    <div
      key={props.id}
      onClick={hide}
      className="relative mr-[100px] flex w-[100%] flex-row rounded-[26px] bg-white p-[0px] sm:h-[270px] sm:w-[800px] sm:p-[24px] sm:shadow-lg"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div className="w-[16rem] sm:w-auto" style={{ flex: "1" }}>
        <img
          src={props.url}
          alt={props.name}
          className="h-[230px] w-[360px] rounded-[8px] object-cover"
        />
      </div>
      <div
        className="flex h-full flex-col items-start justify-between"
        style={{ flex: "1" }}
      >
        <p className="text-[19px] font-bold opacity-50">International Hotels</p>
        <h5 className="text-[25px] font-bold">{props.name}</h5>
        <p className="text-[16px] opacity-70">
          Make the most of this deal on your first booking with travel.
        </p>
        <button className="rounded-[38px] bg-[#FF7757] px-[28px] py-[15px] font-bold text-white">
          Book now
        </button>
      </div>
    </div>
  );
};

export default SpecialCard;
