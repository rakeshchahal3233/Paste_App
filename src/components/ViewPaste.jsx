import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

    const {id} = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.find((item) => item._id === id);

  return (
    <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-2 pl-4  rounded-2xl mt-2 w-[700px]'
                    type='text'
                    placeholder='Enter the Title'
                    value={paste.title}
                    readOnly
                />
            </div>

            <div className='relative'>
                <textarea
                    className='rounded-2xl mt-4 min-w-[700px] p-4'
                    value={paste.content}
                    placeholder='Enter content here'
                    readOnly
                    rows={20}
                />
                <button className='absolute ml-[-60px] mt-[17px] rounded-2xl p-2'
                  onClick={()=> {
                    navigator.clipboard.writeText(paste.content);
                    toast.success('Copied to clipboard');
                  }}
                >
                  Copy
                </button>
            </div>

        </div>
  )
}

export default ViewPaste