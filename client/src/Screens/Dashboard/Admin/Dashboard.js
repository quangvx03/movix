import React, { useEffect } from "react";
import SideBar from "../SideBar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "./../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notification/Loader";
import { Empty } from "../../../Components/Notification/Empty";
import {
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/moviesActions";

function Dashboard() {
  const dispatch = useDispatch();
  // useSelectors
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.movieGetAll
  );
  const sortedMovies =
    movies && movies.length > 0
      ? [...movies].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : [];
  // delete movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.movieDelete
  );
  // delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Bạn có chắc chắn muốn xoá phim này không?") &&
      dispatch(deleteMovieAction(id));
  };

  // useEffect
  useEffect(() => {
    // get all user
    dispatch(getAllUsersAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // errors
    if (isError || catError || userError || deleteError) {
      toast.error("Có lỗi xảy ra!");
    }
  }, [dispatch, isError, catError, userError, deleteError]);

  // dashboard data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Tổng số phim",
      total: isLoading ? "Đang tải..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-600",
      icon: HiViewGridAdd,
      title: "Tất cả thể loại",
      total: catLoading ? "Đang tải..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Tổng số người dùng",
      total: userLoading ? "Đang tải..." : users?.length || 0,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Bảng điều khiển</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-base font-medium my-6 text-border">
        Phim thêm gần đây
      </h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <Table
          data={sortedMovies.slice(0, 12)}
          admin={true}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <Empty message="Không có phim nào được tìm thấy" />
      )}
    </SideBar>
  );
}

export default Dashboard;
