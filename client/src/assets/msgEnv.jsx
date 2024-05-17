import React from 'react'

export default function msgSnd({ text }) {

    return (
        <div className=' flex my-3'>
            <p className=' bg-white py-2 px-5  rounded-full max-w-[70%]'>{text}</p>
        </div>
    )
}
