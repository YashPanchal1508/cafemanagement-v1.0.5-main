import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addCategorySlice,deleteCategorySlice,getCategorySlice } from 'redux/categorySlice';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

  const dispatch = useDispatch()

    const addCategory = async (page,limit,name) => {

        try {
            const response = await fetch('http://localhost:8000/api/category/addCategory', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ page, limit, name }) 
              });

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const result = await response.json()
              dispatch(addCategorySlice(result))
        } catch (error) {
            console.error('Error Adding Category:', error.message);
        }

    }

    const deleteCategory = async(name,page,limit) => {
        try {
          const response = await fetch('http://localhost:8000/api/category/removeCategory', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, page, limit})
          })

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.json()
          dispatch(deleteCategorySlice(result))

        } catch (error) {
          console.error('Error Deleting Category:', error.message);
        }
    }

    const getCategory = async(page,limit) => {
      const response = await fetch(`http://localhost:8000/api/category/getCategory?page=${page}&limit=${limit}`)

      const result  = await response.json();
      dispatch(getCategorySlice(result))
   }

    
    return (
        <CategoryContext.Provider value={{ addCategory,deleteCategory,getCategory }}>
          {children}
        </CategoryContext.Provider>
      );
    }

export const useCategoryContext = () => {
    return useContext(CategoryContext);
  };

  export { CategoryProvider }