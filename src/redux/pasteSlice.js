import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
         ? JSON.parse(localStorage.getItem("pastes"))
         : [],
} 

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
        const paste = action.payload;

        // -> we can add a check that the paste is already exist

        state.pastes.push(paste);  // By this the data is store in state
        localStorage.setItem("pastes",JSON.stringify(state.pastes));  // This is for store the value inside the localStorage.

        toast.success('Paste Created Successfully');
    }, 

    updateToPaste: (state, action) => {

        const paste = action.payload;
 
        const index = state.pastes.findIndex((item)=> item._id === paste._id);

        if(index >= 0){
            state.pastes[index] = paste;

            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success('Paste Updated Successfully');
        }
    },

    resetAllPaste: (state,action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
    },

    removeFromPaste: (state, action) => {
        
        const pasteId = action.payload;

        const index = state.pastes.findIndex((item) => item._id === pasteId);

        if(index>=0){
           state.pastes.splice(index,1);

           localStorage.setItem("pastes",JSON.stringify(state.pastes));

           toast.success("Paste Deleted")
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer