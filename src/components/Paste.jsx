import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const pastes = useSelector(state => state.paste.pastes);

  const filteredDate = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }


  return (
    <div>
      <input
        className='mt-5 min-w-[600px] p-2 rounded-2xl pl-4'
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* <div className='flex flex-col gap-5 mt-5'>
        {
          filteredDate.length > 0 &&
          filteredDate.map(
            (paste) => {
              return (
                <div key={paste?._id} className='border p-4 rounded-lg flex flex-col gap-4'>
                  <div>
                    {paste.title}
                  </div>

                  <div>
                    {paste.content}
                  </div>

                  <div className='flex flex-row gap-4 place-content-evenly'>
                  <Link to={`/?pasteId=${paste?._id}`}>
                    <button><i class="fas fa-edit"></i></button>
                  </Link>

                    <Link to={`/pastes/${paste?._id}`}>
                    <button><i class="fas fa-eye"></i></button>
                    </Link>

                    <button onClick={() => handleDelete(paste?._id)}><i class="fas fa-trash"></i></button>

                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to Clipboard")
                    }}><i class="fas fa-copy"></i></button>

                    <button onClick={()=>{
                      navigator.share({
                        title:paste?.title,
                        text:paste?.content,
                      }).then(()=>{
                        toast.success("Content Shared Successfully");
                      }).catch((error) => {
                        if (error.name === 'AbortError') {
                          toast.error("Share Canceled");
                        }
                      });
                    }}><i class="fas fa-share"></i></button>
                  </div>

                  <div>
                    <i class="fas fa-calendar-alt"></i> 
                    {new Date(paste.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                </div>
              )
            }
          )
        }
      </div> */}

<div className='flex flex-col gap-5 mt-5'>
  {
    filteredDate.length > 0 &&
    filteredDate.map(
      (paste) => {
        return (
          <div key={paste?._id} className='border p-4 rounded-lg flex flex-row justify-between items-start'>
            {/* Left side: Title and Content */}
            <div className='flex flex-col gap-2'>
              <div className='font-semibold text-lg'>{paste.title}</div>
              <div className='text-gray-700'>{paste.content}</div>
            </div>

            {/* Right side: Buttons and Date */}
            <div className='flex flex-col items-end gap-2'>
              <div className='flex flex-row gap-2'>
                <Link to={`/?pasteId=${paste?._id}`}>
                  <button className='p-2 text-sm'><i class="fas fa-edit"></i></button>
                </Link>

                <Link to={`/pastes/${paste?._id}`}>
                  <button className='p-2 text-sm'><i class="fas fa-eye"></i></button>
                </Link>

                <button onClick={() => handleDelete(paste?._id)} className='p-2 text-sm'><i class="fas fa-trash"></i></button>

                <button onClick={() => {
                  navigator.clipboard.writeText(paste?.content)
                  toast.success("Copied to Clipboard")
                }} className='p-2 text-sm'><i class="fas fa-copy"></i></button>

                <button onClick={() => {
                  navigator.share({
                    title: paste?.title,
                    text: paste?.content,
                  }).then(() => {
                    toast.success("Content Shared Successfully");
                  }).catch((error) => {
                    if (error.name === 'AbortError') {
                      toast.error("Share Canceled");
                    }
                  });
                }} className='p-2 text-sm'><i class="fas fa-share"></i></button>
              </div>

              {/* Date below the buttons */}
              <div className='text-gray-500 text-sm'>
                <i class="fas fa-calendar-alt"></i> 
                {new Date(paste.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        )
      }
    )
  }
</div>

    </div>
  )
}

export default Paste