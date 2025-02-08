import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black w-full flex flex-col gap-2 py-2 absolute bottom-0 justify-center items-center text-white'>
      <div className="logo flex justify-center items-center text-2xl gap-2">
        <span className='text-orange-600 font-bold'>&lt;</span>
        <span className='flex justify-center items-center font-bold'><img  width={25} src="key.png" alt="" /> Lockify </span>
        <span className='text-orange-600 font-bold'>/&gt;</span>
      </div>
      <div className='flex justify-center items-center'>Made with <img width={24} className='mx-2' src="heart.png" alt="heart" /> by lockify.com</div>
    </div>
  )
}

export default Footer
