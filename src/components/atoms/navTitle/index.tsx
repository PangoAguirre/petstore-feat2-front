import React from 'react'
import Link from 'next/link';

interface Indexprops {
  title?: string;
  link: string;
}

const Index = ({title = 'Title', link = '/'}: Indexprops) => {
  return (
    <Link href={link}>
    <div className='h-20 w-[150] flex justify-center items-center cursor-pointer'><h1 className='text-sm text-black font-normal text-[16px]'>{title}</h1></div>
    </Link>
  )
}

export default Index;