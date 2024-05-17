import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import Loader from "./../Components/Notification/Loader";
import { RiMovie2Fill } from "react-icons/ri";
import { getAllMoviesAction } from "../Redux/Actions/moviesActions";
import { LanguageData, RatesData, YearData } from "../Data/FilterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "Thể loại" });
  const [year, setYear] = useState(YearData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain cursor-pointer";
  // all movies
  const { isLoading, isError, movies, page, pages } = useSelector(
    (state) => state.movieGetAll
  );
  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  // queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "Thể loại" ? "" : category?.title,
      language: language?.title === "Ngôn ngữ" ? "" : language?.title,
      year: year?.title.replace(/\D/g, ""),
      rate: rates?.title.includes("-")
        ? rates?.title
        : rates?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  }, [category, language, year, rates, search]);

  // useEffect
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    // get all movies
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  // pagination prev and next pages
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    year: year,
    setYear: setYear,
    rates: rates,
    setRates: setRates,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Tổng số phim:{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          {search && `với từ khóa "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            {/* More */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={sameClass}
              >
                <BsCaretLeftFill className="text-xl" />
              </button>
              Trang {page} / {pages}
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <BsCaretRightFill className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Fill />
            </div>
            <p className="text-border text-sm">
              Phim đang được cập nhật, vui lòng quay lại sau!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
