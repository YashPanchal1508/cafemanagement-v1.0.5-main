
import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMenu, setCategorylist,searchMenu,filterProducts } from '../redux/menuSlice'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const dispatch = useDispatch();
    async function addMenuItem(formdata, pic) {
        console.log(pic)
        try {
            const response = await fetch('http://localhost:8000/api/menu/addMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You can add additional headers if needed
                },
                body: JSON.stringify({ formdata: formdata, pic: pic })
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Product Added Successfully")
                return data; // You can return data or do something else with it
            } else {
                console.error('Failed to add menu item:', response.statusText);
                toast.error("Failed To Add Product")
                return null; // Return null or throw an error based on your error handling logic
            }
        } catch (error) {
            console.error('An error occurred while adding the menu item:', error);
            throw error; // Throw the error for the caller to handle
        }
    }

    const getMenu = async (currentPage, rowsPerPage) => {
        try {
            currentPage = parseInt(currentPage);
            rowsPerPage = parseInt(rowsPerPage);

            const response = await fetch(`http://localhost:8000/api/menu/getmenu?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You can add additional headers if needed
                },
                body: JSON.stringify({ currentPage, rowsPerPage })
            });
            const result = await response.json();
            console.log(result)
            if (response.ok) {
                dispatch(addMenu(result))
            }
            dispatch(addMenu(result))
        } catch (error) {
            console.error('Error fetching categories:', error);

        }
    }

    const getCatgory = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/menu/getCatgorylist`);

            const result = await response.json();
            if (response.ok) {

                dispatch(setCategorylist(result));
            } else {
                console.error('Invalid response structure:', result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filterData = async(search) => {
        const response = await fetch(`http://localhost:8000/api/menu/searchMenu`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // You can add additional headers if needed
            },
            body: JSON.stringify({ search: search })
        })

        if(response.ok){
            const result = await response.json();
            dispatch(searchMenu(result));
        }
    }

    const filterCategory = async (id) => {
        console.log(id)
        const response = await fetch(`http://localhost:8000/api/menu/filterProducts`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // You can add additional headers if needed
            },
            body: JSON.stringify({ id: id })
        })

        const result = await response.json();
        dispatch(filterProducts(result))
    }

    return (
        <MenuContext.Provider value={{ addMenuItem, getMenu, getCatgory,filterData,filterCategory }}>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
            {children}
        </MenuContext.Provider>
    );


}
export const useMenuContext = () => {
    return useContext(MenuContext);
}