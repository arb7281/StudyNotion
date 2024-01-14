import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link, icon}) => {
    console.log("printing link from sidebar links", link)
    const Icon = Icons[icon];

    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)//agr sahi jagah click kiye ho aur url me sahi route mention he to true return kro
    }



  return (
    <NavLink
        to={link.path}
        className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}>
      <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>  
      <div className="flex items-center gap-1 text-white cursor-pointer">
        <Icon className="text-xlg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}

export default SidebarLink