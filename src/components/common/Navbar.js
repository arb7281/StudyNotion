import React, { useEffect, useState } from 'react'
import logo from "../../assets/login&signup/Logo.svg"
import { Link, matchPath } from 'react-router-dom' /* matchPath is inbuilt function of router */
import { toast } from 'react-hot-toast';
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { categories } from '../../services/api'; /* yha se apn base url or jo bhi required api's he wo nikalenge */
import { apiConnector } from '../../services/apiconnector';
import { IoIosArrowDropdown } from "react-icons/io";
import { setToken } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

function Navbar(props) {
    
  console.log("printing navbarlink", NavbarLinks);
    const location = useLocation();
    // let isLoggedIn = props.isLoggedIn;
    // let setIsLoggedIn = props.setIsLoggedIn;
    const {token} = useSelector( (state) => state.auth); //this is how we import state from slices
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart) 
    const dispatch = useDispatch()
    
    //sublinks for catalog categories i navbar
    const [subLinks, setSublinks] = useState([]);

  const fetchSubLinks = async() => {
    try{
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      
      console.log("printing all setSublinks from backend", result.data.allCategory)
      setSublinks(result.data.allCategory)

      console.log("Printing SubLinks results", subLinks);
    }catch(e){
      console.log("Could not fetch the category list")
    }
  }

    useEffect( () => {
      fetchSubLinks();
    }, [])


    const matchRoute = (route) => {
      console.log("printing location.pathname", location.pathname)
      return matchPath({path:route}, location.pathname) /* matchPath ye function check krta he dono location same he kya ni true or false return krta he */
    }

  return (
    <div className=" border-b-[1px] border-b-richblack-700 ">
      <div className="flex justify-between items-center w-11/12 py-4 max-w-maxContent mx-auto">
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
        </Link>

        <nav className="text-richblack-25 flex gap-3">
          <ul className="flex gap-3">
            {/* unordered list is mandatory to wrap lists */}
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex gap-1 items-center cursor-pointer group relative">
                    <p>{link.title}</p>
                    <IoIosArrowDropdown className="cursor-pointer"/>
                    <div className="invisible absolute left-[50%] top-[50%] 
                    translate-x-[-50%] translate-y-[30%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 
                    opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] z-50">
                    <div className='absolute left-[56%] top-[-8px] h-6 w-6 rotate-45 rounded bg-richblack-5 '> </div>
                    {subLinks.map((category, index) => (
                        <Link to={`catalog/${category._id}`}>
                          <div key={index}>{category.name}</div>
                        </Link>
                      ))}
                    
                      
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    {" "}
                    {/* agr link.path me value padi he tab hi execute kro null ho to koi bat nahi age ki values run kro udhar hi bethke error mt do */}
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {" "}
                      {/* pehle path check kro ki apn current page pe khde he wo bhi clicked btn page he kya nhi */}
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-x-4">
          {token === null && (
            <Link to="/login">
              <button className="bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && (
            <div className='flex gap-2 items-center'>
              <ProfileDropDown/>
              {/* <Link to="/">
                <button
                  onClick={() => {
                    dispatch(setToken(null));
                    toast.error("Logged Out");
                  }}
                  className="bg-richblack-800 text-white py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
                >
                  Log out
                </button>
              </Link> */}
            </div>
          )}

          {/* do styling on this  */}
          {user &&
            user?.accountType !== "Instructor" && ( //user me kuch vakue padi ho aur user instructor na ho to ye code run kro
              <Link to="/dashboard/cart" className="relative text-white text-lg">
                <AiOutlineShoppingCart />
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            )}
        </div>
      </div>
    </div>
  );
}

export default Navbar