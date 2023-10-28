import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <Image
          src="https://links.papareact.com/c2cdd5"
          width={300}
          height={100}
          alt="Trello logo"
          className="w-44 md:w-56 md:pb-10 object-contain"
        />
        <div className="flex">
          <form className="flex items-center gap-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-16 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden></button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
