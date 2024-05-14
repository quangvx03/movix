import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { FiDownload } from "react-icons/fi";

const Head =
  "text-xs text-center text-main font-semibold px-6 py-4 uppercase truncate";
const Text = "text-sm text-center leading-6 whitespace-nowrap px-5 py-3";

// rows
const Rows = (movie, i, admin) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={movie?.image ? movie?.image : "/images/user.png"}
            alt={movie?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate text-start`}>{movie.name}</td>
      <td className={`${Text}`}>{movie.category}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.year}</td>
      <td className={`${Text}`}>{movie.time}</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Chỉnh sửa <FaEdit className="text-green-500" />
            </button>
            <button className="bg-subMain text-white rounded flex-colo w-6 h-6">
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Tải xuống <FiDownload className="text-green-500" />
            </button>
            <Link
              to={`/movie/${movie?._id}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

// table
function Table({ data, admin }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head} text-start`}>
              Hình ảnh
            </th>
            <th scope="col" className={`${Head}`}>
              Tên
            </th>
            <th scope="col" className={`${Head}`}>
              Thể loại
            </th>
            <th scope="col" className={`${Head}`}>
              Ngôn ngữ
            </th>
            <th scope="col" className={`${Head}`}>
              Năm phát hành
            </th>
            <th scope="col" className={`${Head}`}>
              Thời lượng
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => Rows(movie, i, admin))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
