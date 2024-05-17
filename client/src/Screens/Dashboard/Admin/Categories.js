import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction } from "../../../Redux/Actions/categoriesActions";
import Loader from "./../../../Components/Notification/Loader";
import { Empty } from "../../../Components/Notification/Empty";
import toast from "react-hot-toast";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  // all categories
  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );
  // delete category
  const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  const adminDeleteCategory = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thể loại này không?")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const onEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Xóa thể loại không thành công");
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isSuccess, isError]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Thể loại</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Thêm
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            onEditFunction={onEditFunction}
            onDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message="Không có thể loại nào" />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;
