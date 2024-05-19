import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useSelector } from "react-redux";

function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate("/movies");
    }
  };

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
            <form
              onSubmit={handleSearch}
              className="w-full text-sm bg-dryGray rounded flex-btn"
            >
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            <NavLink to="/favorites" className={Hover}>
              <FaHeart className="w-6 h-6" />
            </NavLink>
            <div className="relative group">
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
                    className="w-8 h-8 rounded-full border object-cover border-white"
                  />
                ) : (
                  <CgUser className="w-8 h-8" />
                )}
              </NavLink>
              {userInfo && (
                <div className="absolute bottom-0 transform translate-y-full left-1/3 -translate-x-1/2 bg-subMain text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transitions whitespace-nowrap">
                  {userInfo?.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
