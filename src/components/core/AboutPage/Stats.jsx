import React from 'react'


const StatsData = [
    {count:"5K", label:"Active Students"},
    {count:"10+", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"50+", label:"Awards"}
]
const Stats = () => {

    


  return (
    <div className='flex'>
                {
                    StatsData.map((data, index) => (
                        <div key={index}>
                            <header>
                                {data.count}
                            </header>
                            <p>
                                {data.label}
                            </p>
                        </div>
                    ))
                }              
            </div>
  )
}

export default Stats