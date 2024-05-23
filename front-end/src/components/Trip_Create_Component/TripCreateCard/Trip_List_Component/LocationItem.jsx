import React, { useState } from "react";
import img from "../../../../assets/img/hoian.jpg";
import { GrLocation } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import {
  deleteLocationItem,
  getLocationArray,
} from "../../../../redux/tripSlice";
import { useDispatch } from "react-redux";

const LocationItem = (props) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentsFetched, setCommentsFetched] = useState(false);

  const deleteLocation = {
    id: props.id,
    day: props.day,
  };

  const handleDelete = () => {
    dispatch(deleteLocationItem(deleteLocation));
    dispatch(getLocationArray(deleteLocation.day));
  };

  const handleShowComments = () => {
    if (!commentsFetched) {
      fetch("http://localhost:8000/comment/")
        .then((response) => response.json())
        .then((data) => {
          const filteredComments = data.results.filter(
            (comment) => comment.location_id === props.id,
          );
          setComments(filteredComments);
          setCommentsFetched(true);
          setShowComments(true);
        })
        .catch((error) => console.log(error));
    } else {
      setShowComments(!showComments);
    }
  };

  return (
    <div className="cursor-pointer">
      <div className="mt-5 flex">
        {/* Index item */}
        <div className="flex flex-col items-center">
          <p className="rounded-full bg-black px-[13px] py-[5px] text-white">
            {props.index + 1}
          </p>
          <div className="h-full w-0 border-l-2 border-dotted border-gray-400"></div>
        </div>
        {/* Item info */}
        <div className="ml-[80px] flex w-[726px] flex-col rounded-[8px] border-[1.5px]">
          <div className="relative flex h-[191px] w-[726px]">
            {props.url ? (
              <div className="h-full w-[206px] overflow-hidden rounded-t-[8px]">
                <img
                  src={props.url}
                  alt="Trip Image"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-full w-[206px] overflow-hidden rounded-[8px]">
                <img
                  src={img}
                  alt="Trip Image"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="ml-5 flex w-3/4 flex-col gap-[12px] p-[15px]">
              <h1 className="text-[16px] font-[700]">{props.name}</h1>
              <div className="flex items-center border-b border-[#ccc] pb-[10px]">
                <GrLocation />
                <div className="ml-[5px] text-[14px]">{props.address}</div>
              </div>
              <div className="text-[12px] font-[400]">
                {props.description
                  ? props.description
                  : "Morning Glory Restaurant in Hoi An is an excellent eatery that will surely satisfy your love for good ..."}
              </div>
              <div className="text-[12px] font-[700] underline">Read more</div>
            </div>
            <div
              onClick={handleDelete}
              className="absolute right-[10px] top-[10px] h-7 w-7 cursor-pointer rounded-full p-[2px] hover:bg-[red] hover:text-white"
            >
              <IoClose className="text-[25px]" />
            </div>
          </div>

          <div
            onClick={handleShowComments}
            className="flex w-full cursor-pointer justify-center bg-[#D9D9D9] py-[15px] text-[13px] font-[650] hover:opacity-80"
          >
            {showComments ? "Hide comments" : "Show comments"}
          </div>
          {showComments && (
            <div className="bg-gray-100 p-[15px]">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="mb-4 border-b pb-2">
                    <p className="text-[14px] font-[600]">
                      Rating: {comment.rating}
                    </p>
                    <p className="text-[12px]">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-[12px]">No comments available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationItem;
