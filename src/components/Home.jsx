import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const pasteId = searchParams.get("pasteId");
    const allPastes = useSelector((state)=>state.paste.pastes);

    useEffect(()=>{

        if(pasteId){
            const paste = allPastes.find((item)=> item?._id === pasteId);
            
            setTitle(paste?.title);
            setValue(paste?.content);
        }

    },[pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36)+ Math.random().toString(36).substring(2),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) { // Means we update the paste
            dispatch(updateToPaste(paste));
        }
        else { // Means we create a new paste
            dispatch(addToPaste(paste));
        }

        setSearchParams({});
        setTitle("");
        setValue("");
    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-1 pl-4  rounded-2xl mt-2 w-[73%]'
                    type='text'
                    placeholder='Enter the Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={createPaste}
                    className='p-2 rounded-2xl mt-2 pl-4 pr-4'>
                    {
                        pasteId ?
                            "Update My Paste"
                            :
                            "Create My Paste"
                    }
                </button>
            </div>

            <div>
                <textarea
                    className='rounded-2xl mt-4 min-w-[700px] p-4'
                    value={value}
                    placeholder='Enter content here'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>

        </div>
    )
}

export default Home