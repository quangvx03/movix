import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";

function NavBar() {
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);
  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-full h-12 object-contain"
              />
            </Link>
          </div>
          <div className="col-span-2 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-center items-center">
            <NavLink to="/movies" className={Hover}>
              Phim
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              Giới thiệu
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Liên hệ
            </NavLink>
          </div>
          {/* search Form */}
          <div className="col-span-3">
            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-5 text-black"
              />
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          {/* menu */}
          <div className="col-span-1 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            {/* <NavLink to="/favorites" className={`${Hover} relative`}> */}
            <NavLink to="/favorites" className={Hover}>
              <FaHeart className="w-6 h-6" />
              {/* <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                7
              </div> */}
            </NavLink>
            <NavLink to="/login" className={Hover}>
              <CgUser className="w-8 h-8" />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
