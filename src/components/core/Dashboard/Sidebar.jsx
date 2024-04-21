import React from 'react'
import { useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links'
import LogOut from '../../common/LogOut'
import SidebarLink from './SidebarLink'



const Sidebar = () => {

    const {user, loading:profileLoading} = useSelector((state) => state.profile)
    console.log("printing user", user)
    const {loading:authLoading} = useSelector((state) => state.auth)
    console.log("printing  Sidebar links inside Sidebar component", sidebarLinks)
    


    if(profileLoading || authLoading){
        return(
            <div>loading...</div>
        )
    }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type) return null //agr link.type me value exist krti he to 
                            return (
                                <SidebarLink key={link.id} link={link} icon={link.icon}/>
                            )
                        
                    })
                }
            </div>
            
        </div>
        
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
            <div className='flex flex-col'>
            {/* <SidebarLink link={{name:"Settings", path:"dashboard/settings"}}
                        iconName="VscSettingsGear"/> for rendering settings button   */}
                    
            <SidebarLink link={{name:"Settings", path:"/dashboard/settings"}}
                        icon="VscSettingsGear"/>     
            <div className="px-8 py-2 text-sm font-medium text-richblack-300">
            <LogOut/>  
            </div>                   
                          
          </div>
        </div>
    
  )
}

export default Sidebar