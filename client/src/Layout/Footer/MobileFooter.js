import React from "react";
import { NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { HiHome } from "react-icons/hi2";
import { useSelector } from "react-redux";

function MobileFooter() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const active = "bg-subMain text-main";
  const inActive =
    "transitions text-2xl flex-colo hover:bg-subMain text-white rounded-md px-4 py-3";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;
  return (
    <>
      <div className="flex-btn h-full bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        {/* drawer */}
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1 px-1">
          <NavLink to="/" className={Hover}>
            <HiHome />
          </NavLink>
          <NavLink to="/movies" className={Hover}>
            <BsCollectionPlay />
          </NavLink>
          <NavLink to="/favorites" className={Hover}>
            <FiHeart />
          </NavLink>
          <NavLink
            to={
              userInfo?.isAdmin
                ? "/dashboard"
                : userInfo
                ? "/profile"
                : "/login"
            }
            className={Hover}
          >
            {userInfo ? (
              <img
                src={userInfo?.image ? userInfo?.image : "/images/user.png"}
                alt={userInfo?.name}
                className="w-7 h-7 rounded-full border object-cover border-white"
              />
            ) : (
              <FiUserCheck className="w-7 h-7" />
            )}
          </NavLink>
        </div>
      </footer>
    </>
  );
}

export default MobileFooter;
