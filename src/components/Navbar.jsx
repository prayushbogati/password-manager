import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';

const Navbar = () => {
    return (
        <nav className="bg-purple-900 flex gap-60 justify-around items-center h-12 text-white">
            <div className="logo font-bold text-xl">
                <span className='text-green-600'>&lt;</span>
                <span>pass</span>
                <span className='text-green-600'>Man/&gt;</span>
            </div>

            <a href="https://github.com/prayushbogati" target='_blank' ><GitHubIcon /></a>
        </nav>
    )
}

export default Navbar