import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
    return (
        <div className='bg-purple-900 w-full h-12 flex justify-between px-2 items-center'>
            <div className="logo font-bold text-xl">
                <span className='text-green-600'>&lt;</span>
                <span className='text-white'>pass</span>
                <span className='text-green-600'>Man/&gt;</span>
            </div>

            <div className='text-white items-center'>
                by Prayush
            </div>

        </div>
    )
}

export default Footer
