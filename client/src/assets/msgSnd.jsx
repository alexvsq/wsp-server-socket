import React from 'react'

export default function msgSnd({ text }) {

    return (
        <div className=' flex justify-end my-3'>
            <p className=' bg-[#2680eb] py-2 px-5 text-white rounded-full text-right max-w-[70%]'>{text}</p>
        </div>
    )
}
