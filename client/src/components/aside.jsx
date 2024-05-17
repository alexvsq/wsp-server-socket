import { useEffect, useState } from 'react'
import { useDatos } from '../context/context.jsx'
import { useNavigate } from 'react-router-dom'

export default function aside() {
    const navigate = useNavigate()
    const { contacts } = useDatos()

    function setUrl(e, num) {
        e.preventDefault()
        navigate(`/${num}`)
    }


    return (
        <aside className=' flex flex-col gap-2'>
            <header>
                <h3 className=' text-xl  font-bold'>Alejandro Vasquez</h3>
                <p>924165577</p>
            </header>
            <div className=' flex flex-col gap-3 bg-white rounded-3xl px-2 py-3 h-full' >
                <input
                    className=' bg-[#f5f6fa] rounded-full py-3 px-4 text-sm'
                    type="text" placeholder='Buscar...'
                />

                <section className=' flex-1 overflow-y-scroll' >

                    {
                        contacts.map(x => {
                            return (
                                <article
                                    onClick={(e) => setUrl(e, x.numero)}
                                    key={x.id}
                                    className=' flex gap-2 py-2 px-1 my-1 hover:bg-gray-400 transition rounded-lg cursor-pointer'>
                                    <div className=' rounded-full'>
                                        <img className=' rounded-full max-w-[40px]' src={"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png"} alt="user" />
                                    </div>
                                    <div className='flex flex-col '>
                                        <h3 className=' font-medium'>{x.name}</h3>
                                        <p className=' text-xs text-gray-500'>{x.numero}</p>
                                    </div>
                                    <div className=' text-sm text-right mx-1'>
                                        <p className=' text-gray-400'>{x.pushname}</p>
                                        <p className=' text-[#2680eb]'>1</p>
                                    </div>
                                </article>
                            )
                        })
                    }


                </section>
            </div>
        </aside>
    )
}
