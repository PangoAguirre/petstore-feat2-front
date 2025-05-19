import React from 'react'
interface Indexprops {
    text: string;
}

const index = ({text = "Text"}: Indexprops) => {
  return (
    <div className='flex justify-center items-center w-[240] h-11 rounded-[6] ring-2'>
        <button className='cursor-pointer text-black'>{text}</button>
    </div>
  )
}

export default index