/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 bg-violet-500 h-full w-full">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-[#1A1A40] hover:text-slate-50 px-4 py-1 rounded-lg text-slate-300"
          onClick={() => setShowType("table")}
        >
          TABLE
        </button>
        <button
          className="bg-[#1A1A40] hover:text-slate-50 px-4 py-1 rounded-lg text-slate-300"
          onClick={() => setShowType("card")}
        >
          CARD
        </button>
      </div>
      <div className="flex justify-between items-center h-fit">
        <h1 className="text-3xl my-8 text-slate-50 font-bold">Favourite Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-slate-50 font-bold"/>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "card" ? (
        <BooksCard books={books} />
      ) : (
        <BooksTable books={books} />
      )}
    </div>
  );
};

export default Home;
