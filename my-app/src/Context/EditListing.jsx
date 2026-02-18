import { createContext, useContext, useState } from "react";

const EditContext = createContext()
export const EditProvider = ({ children }) => {
    const [editData, setEditData] = useState(null) //will store edit product data
    const [editClicked, setEditClicked] = useState(false) //state which make listing compo visible on click of edit btn
    const isEditMode = editData !== null //if editData is not null it will be executed
    const resetEdit = () => setEditData(null) //reset editData to null 

    return (
        <>
            <EditContext.Provider value={{ editData, setEditData, isEditMode, resetEdit, editClicked, setEditClicked }}>
                {children}
            </EditContext.Provider>
        </>
    )
}

export const useEditContext = () => useContext(EditContext)