import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-black text-white h-14 flex justify-center items-center w-full'>
    <div className='md:container md:mx-auto flex justify-between items-center'>
      <div className="logo flex justify-center items-center text-2xl gap-2">
        <span className='text-orange-600 font-bold'>&lt;</span>
        <span className='flex justify-center items-center font-bold'><img  width={25} src="key.png" alt="" /> Lockify </span>
        <span className='text-orange-600 font-bold'>/&gt;</span>
      </div>
      <div className="github-button ">
        <button className='flex justify-center items-center py-1 text-lg gap-2 bg-orange-600 hover:bg-orange-500 font-bold rounded-full px-3'><img width={30} src="github.png" alt="" />GitHub</button>
      </div>
    </div>
    </nav>
  )
}

export default Navbar
