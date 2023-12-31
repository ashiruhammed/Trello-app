"use client";

import fetchSuggestion from "@/lib/fetchSuggestion";
import useBoardStore from "@/store/BoardStore";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";
// import Avatar from "react-avatar";

function Header() {
  const [searchString, setSearchString, board] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
    state.board,
  ]);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [suggestions, setSuggestions] = React.useState<string>("");
  React.useEffect(() => {
    if (board.columns.size === 0) return;

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestions(suggestion);
      setLoading(false);
    };
    // fetchSuggestionFunc();
  }, [board]);
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"></div>
        <Image
          src="https://links.papareact.com/c2cdd5"
          width={300}
          priority
          height={100}
          alt="Trello logo"
          className="w-44 md:w-56 pb-10 md:p-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full ">
          <form className="flex items-center gap-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-16 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden></button>
          </form>

          {/* <Avatar name="Ashiru Hammed" round size="50" color="#0055D1" /> */}
        </div>
      </div>
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center justify-center p-5 shadow-xl rounded-xl w-fit bg-white text-sm">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          GPT is summarising your tasks for the day
        </p>
      </div>
    </header>
  );
}

export default Header;
