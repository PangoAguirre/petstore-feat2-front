import React from 'react'
import { SmallTextDefault, SubTextoMini } from '../heroTitle'

interface Indexprops {
    title?: string;
    holder?: string;
    text?: string;
}

const index = ({title = 'Title', holder = 'Holder', text = 'Text'}: Indexprops) => {
  return (
    <div>
        <div className='font-bold'>
            <SmallTextDefault text={title}></SmallTextDefault>
        </div>
        <div className='flex items-center w-140 h-9 ring-2 ring-gray-200 rounded-[6]'>
            <input type="text" placeholder={holder} className='ml-4'/>
        </div>
        <div className='opacity-75'>
            <SubTextoMini text={text}></SubTextoMini>
        </div>
    </div>
  )
}

export default index