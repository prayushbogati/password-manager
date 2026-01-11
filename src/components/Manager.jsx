import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';


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

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // passwordArray.push(form) wrong!
            setPasswordArray(passwordArray => {
                return [...passwordArray, { ...form, id: uuidv4() }]
            })
            // or setPasswordArray([...passwordArray, form])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, { ...form, id: uuidv4() }]);

            toast.success('Password saved successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            setform({ site: "", username: "", password: "" }) // to make the input fields empty after submit

        }
        else {
            toast.error('Error! Make the length of fields greater than 3')
        }
    }

    const handleCopy = (item) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(item);
    }

    const handleEdit = (id) => {
        setPasswordArray(passwordArray.filter((item) => item.id !== id))
        setform(passwordArray.filter(item => item.id === id)[0])
    }

    const handleDelete = (id) => {
        const confirmation = confirm("Are you sure?");
        if (confirmation) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
            toast.success('Password deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <div>
            <ToastContainer
                style={{ top: "50px" }}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="my-container ">
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
                        <input value={form.site} onChange={handleChange} placeholder='Enter website name' className="border border-purple-300 rounded-2xl px-2 w-full" type="text" name='site' autoComplete='off' />
                        <div className="flex justify-between gap-4 w-full">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="border border-purple-300 w-full rounded-2xl px-2" type="text" name='username' autoComplete='off' />
                            <div className="relative">
                                <input value={form.password} onChange={handleChange} placeholder='Enter Password' className="border border-purple-300 w-min rounded-2xl px-2" type={showPassword ? "text" : "password"} name='password' autoComplete='off' />
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
                            Save Password
                        </button>
                    </div>
                </form>

                <div className='mt-4'>
                    <h1 className='font-bold'>Passwords:</h1>
                    {passwordArray.length == 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="w-full min-h-full text-center rounded-md overflow-hidden mb-10">
                        <thead className='bg-purple-600 text-white'>
                            <tr>
                                <th className='px-4 w-3 py-1.5'>Website</th>
                                <th className='px-4 w-3 py-1.5'>Username</th>
                                <th className='px-4 w-3 py-1.5'>Password</th>
                                <th className='px-4 w-3 py-1.5'>Action</th>
                            </tr>
                        </thead>
                        {passwordArray.map((item, index) => {
                            return < tbody className='bg-purple-100' key={index}>
                                <tr>
                                    <td className='px-4 max-w-2 py-1.5 wrap-break-word'><a className='text-blue-600' href={item.site} target='_blank'>{item.site}</a>
                                        <span className='cursor-pointer' onClick={() => { handleCopy(item.site) }}>   <ContentCopyIcon fontSize='small' /></span>
                                    </td>
                                    <td className='px-4 max-w-3 py-1.5 wrap-break-word'>{item.username}
                                        <span className='cursor-pointer' onClick={() => { handleCopy(item.username) }}>  <ContentCopyIcon fontSize='small' /></span>
                                    </td>
                                    <td className='px-4 max-w-3 py-1.5 wrap-break-word'>{item.password}
                                        <span className='cursor-pointer' onClick={() => { handleCopy(item.password) }}>  <ContentCopyIcon fontSize='small' /></span>
                                    </td>
                                    <td className='px-4 max-w-3 py-1.5 wrap-break-word'>
                                        <span className='cursor-pointer mx-1' onClick={() => { handleEdit(item.id) }}> <EditIcon fontSize='small' /></span>
                                        <span className='cursor-pointer mx-1' onClick={() => { handleDelete(item.id) }}> <DeleteIcon fontSize='small' /></span>
                                    </td>
                                </tr>
                            </tbody>
                        })
                        }
                    </table>}
                </div>
            </div >
        </div>
    )
}
export default Manager