import {
  ChevronDown,
  CircleUserRound,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const Header = () => {
  const [taggle, setTaggle] = useState(false);
  useEffect(() => {
    if (taggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [taggle]);

  const navigate = useNavigate();

  const pathLocation = useLocation();
  const { pathname } = pathLocation;

  return (
    <>
      {/* TOP HEADER */}
      <div className="sticky z-50 flex justify-between lg:justify-around items-center top-0 bg-white border-b border-gray-200 h-[72px] px-4">
        {/* LEFT SIDE LOGO + MENU */}
        <div className="flex gap-10 items-center">
          <h1 onClick={() => navigate('/')} className="text-lg cursor-pointer font-bold">
            InstFix<span className="text-blue-600">.com</span>
          </h1>
          <ul className="hidden md:flex text-gray-500 capitalize font-normal text-xs gap-8">
            <li>beauty</li>
            <li>Wall Panels</li>
            <li>Native</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-between gap-6">
          {/* Search and Location (Desktop Only) */}
          <div className="hidden lg:flex gap-5">
            <div className="relative">
              <MapPin className="absolute top-3 left-2" size={19} />
              <input
                type="text"
                disabled
                placeholder="Enter your Place ...."
                className="font-light h-[40px] px-10 text-sm cursor-pointer w-[250px] rounded-md border border-gray-300 outline-none p-2"
              />
              <ChevronDown className="absolute right-2 top-3" size={25} />
            </div>
            <SearchComponents />
          </div>

          {/* Icons */}
          <div className="flex gap-4 items-center">
            <CircleUserRound size={20} className=" cursor-pointer" onClick={() => navigate('/login')} />
            {/* Mobile Menu Icon */}
            <Menu
              onClick={() => setTaggle(true)}
              className="block lg:hidden cursor-pointer"
              size={24}
            />
          </div>
        </div>
      </div>

      {/* SEARCH FOR MOBILE */}
      <div className="p-2 sticky top-[72px] bg-white lg:hidden z-40">
        {
          pathname === '/' ? <SearchComponents /> : null
        }

      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full mt-18 w-[80%] max-w-[300px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${taggle ? "translate-x-0" : "translate-x-full"
          } p-5 rounded-l-md`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setTaggle(false)} className="text-lg font-bold">
            ✕
          </button>
        </div>
        {/* Sidebar content */}
        <ul className="text-gray-700 space-y-4">
          <li onClick={() => navigate('/')}>Home</li>
          <li>Categories</li>
          <li>Deals</li>
          <li>About</li>
        </ul>
      </div>

      {/* DARK BACKDROP */}
      {taggle && (
        <div
          onClick={() => setTaggle(false)}
          className="fixed inset-0 opacity-10 bg-black bg-opacity-40 backdrop-blur-sm z-40"
        ></div>
      )}

    </>
  );
};

export default Header;

const SearchComponents = () => {
  return (
    <div className="relative">
      <Search size={19} className="absolute top-3 left-2" />
      <input
        placeholder="Enter your Place ...."
        className="font-light h-[40px] px-10 text-sm w-full rounded-md border border-gray-300 outline-none p-2"
      />
    </div>
  );
};
