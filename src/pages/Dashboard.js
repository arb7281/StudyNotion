import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

function Dashboard() {
  const {loading: authLoading} = useSelector((state) => state.auth)//auth name ki slice se loading nikal di
  const {loading: profileLoading} = useSelector((state) => state.profile)// profile slice ki loading nam ki state nikal di
  // console.log("printing loading", loading);

  if(authLoading || profileLoading){
    return (
      <div>Loading...</div>
    )
  }


  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar/>
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet/>
        </div>
      </div>
    </div>
  );
  
}

export default Dashboard