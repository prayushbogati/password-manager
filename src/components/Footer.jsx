import React from 'react'

const Footer = () => {
    return (
        <div className='bg-purple-900 w-full h-20 flex flex-col justify-center items-center fixed bottom-0 '>
            <div className="logo font-bold text-xl">
                <span className='text-green-600'>&lt;</span>
                <span className='text-white'>pass</span>
                <span className='text-green-600'>Man/&gt;</span>
            </div>

            <div className='flex text-white'>
                created with <img width="15" src="images/heart.png" alt="heart-logo" /> by Prayush
            </div>
        </div>
    )
}

export default Footer
 