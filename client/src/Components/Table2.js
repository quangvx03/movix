import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DateFormat, shortUppercaseId } from "./Notification/Empty";

const Head =
  "text-xs text-center text-main font-semibold px-6 py-4 uppercase truncate";
const Text = "text-sm text-center leading-6 whitespace-nowrap px-5 py-3";

// rows
const Rows = ({ data, users, onEditFunction, onDeleteFunction }) => {
  return (
    <tr>
      {/* user */}
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={`${data?.image ? data.image : "/images/user.png"}`}
                alt={data?.name}
              />
            </div>
          </td>
          <td className={`${Text}`}>
            {data?._id ? shortUppercaseId(data?._id) : "A12345"}
          </td>
          <td className={`${Text}`}>{data?.name}</td>
          <td className={`${Text}`}>{data?.email}</td>
          <td className={`${Text}`}>
            {data?.isAdmin ? "Quản trị viên" : "Người dùng"}
          </td>
          <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
          <td className={`${Text} pt-6 float-right flex-rows gap-2`}>
            {!data?.isAdmin && (
              <button
                onClick={() => onDeleteFunction(data?._id)}
                className="bg-subMain text-white rounded flex-colo w-6 h-6"
              >
                <MdDelete />
              </button>
            )}
          </td>
        </>
      ) : (
        //  Categories
        <>
          <td className={`${Text} font-bold`}>
            {data?._id ? shortUppercaseId(data?._id) : "A12345"}
          </td>
          <td className={`${Text}`}>{data.title}</td>
          <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button
              onClick={() => onEditFunction(data)}
              className="bg-green-600 text-white rounded flex-colo w-6 h-6"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDeleteFunction(data?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

// table
function Table2({ data, users, onEditFunction, onDeleteFunction }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            {users ? (
              <>
                <th scope="col" className={`${Head} text-start`}>
                  Hình ảnh
                </th>
                <th scope="col" className={`${Head}`}>
                  Mã ID
                </th>
                <th scope="col" className={`${Head}`}>
                  Họ và tên
                </th>
                <th scope="col" className={`${Head}`}>
                  Email
                </th>
                <th scope="col" className={`${Head}`}>
                  Vai trò
                </th>
                <th scope="col" className={`${Head}`}>
                  Ngày tạo
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={`${Head}`}>
                  Mã ID
                </th>
                <th scope="col" className={`${Head}`}>
                  Tiêu đề
                </th>
                <th scope="col" className={`${Head}`}>
                  Ngày tạo
                </th>
              </>
            )}
            <th scope="col" className={`${Head} text-end`}>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((data, i) => (
            <Rows
              key={i}
              data={data}
              i={i}
              users={users}
              onEditFunction={onEditFunction}
              onDeleteFunction={onDeleteFunction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table2;
