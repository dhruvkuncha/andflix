import React, { useEffect, useState } from "react";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const {logout} = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 0)
                setIsScrolled(true);
            else 
                setIsScrolled(false)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    },[])


  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      {/* Left Section  */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src={"/andflix-logo.png"}
          alt="logo"
          height={100}
          width={100}
          className="object-contain cursor-pointer "
        />
        <ul className="hidden md:flex space-x-4">
          <li className="headerClass">Home</li>
          <li className="headerClass">TV Shows</li>
          <li className="headerClass">Movies</li>
          <li className="headerClass">New & Popular</li>
          <li className="headerClass">My List</li>
        </ul>
      </div>
      {/* Right Section  */}
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        {/* <Link href="/account"> */}
            <img onClick={logout} src="https://rb.gy/g1pwyx" alt="account-logo" className="cursor-pointer rounded"/>
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
