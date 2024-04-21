import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CategoryList({categoryList}) {
  console.log(categoryList)
  return (
    <div className='mx-4 md:mx-22 lg:mx-52 grid grid-cols-3
    md:grid-cols-4 lg:grid-cols-6 gap-4'>
      {categoryList.length>0?categoryList.map((category,index)=>(
        <Link href={"/search/"+category.name} key={index} className={`flex flex-col justify-center items-center gap-2
         bg-purple-100 p-5 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out`}>
          <Image src={category.icon.url}
          alt='icon'
          width={35} 
          height={35}
          />
          <h2 className='text-primary font-semibold'>{category.name}</h2>
        </Link>

        
      ))
    :
      [1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='h-[120px] w-full bg-slate-200 rounded-lg animate-pulse'>

        </div>
      ))
    }
    </div>
  )
}

export default CategoryList
