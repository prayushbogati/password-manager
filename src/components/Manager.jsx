import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    // let passwordArray = []
    let [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const handleChange = (e) => {
        setform(prevValue => {
            return { ...prevValue, [e.target.name]: e.target.value }
        })
        //or { ...form, [e.target.name]: e.target.value })
    }
    const savePassword = () => {
        // passwordArray.push(form) wrong!
        setPasswordArray(prevValue => {
            return [...prevValue, form]
        })
        // or setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form]);
    }

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className="my-container">
                <div className='text-center'>
                    <h1 className='text-2xl font-bold'>
                        <span className='text-green-600'>&lt;</span>
                        <span>pass</span>
                        <span className='text-green-600'>Man/&gt;</span>
                    </h1>
                    <p>Manage your passwords here!</p>
                </div>

                <form action="" onSubmit={(e) => {
                    e.preventDefault(), savePassword();
                }}>
                    <div className='flex flex-col gap-4 mt-4 items-center'>
                        <input value={form.site} onChange={handleChange} placeholder='Enter website name' className="border border-purple-300 rounded-2xl px-2 w-full" type="text" name='site' required autoComplete='off' />
                        <div className="flex justify-between gap-4 w-full">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="border border-purple-300 w-full rounded-2xl px-2" type="text" name='username' required autoComplete='off' />
                            <div className="relative">
                                <input value={form.password} onChange={handleChange} placeholder='Enter Password' className="border border-purple-300 w-min rounded-2xl px-2" type={showPassword ? "text" : "password"} name='password' required autoComplete='off' />
                                <span className='absolute top-0 right-2 cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }}>
                                    {showPassword ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' />}
                                </span>
                            </div>
                        </div>
                        <button type='submit' className='bg-green-500 rounded-2xl px-4 py-1 hover:bg-green-600 flex justify-center items-center gap-2 w-fit cursor-pointer'>
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover"
                                colors="primary:#000000"
                                style={{ width: 25, height: 25 }}>
                            </lord-icon>
                            Add Password
                        </button>
                    </div>
                </form>

                <div className='mt-4'>
                    <h1 className='font-bold'>Passwords:</h1>
                    {passwordArray.length == 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="w-full min-h-full text-center rounded-md overflow-hidden">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className='px-4 w-3 py-1.5'>Website</th>
                                <th className='px-4 w-3 py-1.5'>Username</th>
                                <th className='px-4 w-3 py-1.5'>Password</th>
                            </tr>
                        </thead>
                        {passwordArray.map((item, index) => {
                            return < tbody className='bg-purple-100' key={index}>
                                <tr>
                                    <td className='px-4 w-3 py-1.5'>{item.site}</td>
                                    <td className='px-4 w-3 py-1.5'>{item.username}</td>
                                    <td className='px-4 w-3 py-1.5'>{item.password}</td>
                                </tr>
                            </tbody>
                        })
                        }
                    </table>}
                </div>
            </div >
        </>
    )
}
export default Manager