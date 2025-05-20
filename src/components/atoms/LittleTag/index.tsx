import React from 'react'
import { SmallTextDefault } from '../heroTitle'

interface Indexprops{
    title: string;
}
const index = ({title ="Title"}: Indexprops) => {
  return (
    <div className='flex flex-row justify-center items-center w-50 h-14'>
        <div className='h-10 w-10 rounded-4xl bg-gray-300 ml-2'></div>
        <div className='mt-3 h-10 w-35 ml-3'><SmallTextDefault text={title}></SmallTextDefault></div>
    </div>
  )
}

export default index