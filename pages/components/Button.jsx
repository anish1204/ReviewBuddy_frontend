import React from 'react'

const Button = ({ title, type }) => {
    return (
        <button className='min-w-8 px-5 py-2 rounded-lg border-[1px] border-black w-fit bg-black group hover:bg-white '>
            <p className='group-hover:text-black text-white'>
                {title || "Submit"}
            </p>
        </button>
    )
}

export default Button