import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addCategorySlice, deleteCategorySlice, getCategorySlice, editedCategorySlice,searchCategory } from 'redux/categorySlice';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

  const dispatch = useDispatch()

  const addCategory = async (page, limit, name) => {

    try {
      const response = await fetch('http://localhost:8000/api/category/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page, limit, name })
      });

      if (!response.ok) {
        toast.error("Failed To Add Category")
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json()
      dispatch(addCategorySlice(result))
      toast.success("Category Added Successfully")
    } catch (error) {
      console.error('Error Adding Category:', error.message);
      toast.error("Failed To Add Category")

    }

  }

  const deleteCategory = async (name, page, limit) => {
    try {
      const response = await fetch('http://localhost:8000/api/category/removeCategory', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, page, limit })
      })

      if (!response.ok) {
        toast.error("Failed To Delete Category")
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json()
      dispatch(deleteCategorySlice(result))
      toast.success("Category Delete Successfully")
    } catch (error) {
      toast.error("Failed To Delete Category")
      console.error('Error Deleting Category:', error.message);
    }
  }

  const getCategory = async (page, limit) => {
    const response = await fetch(`http://localhost:8000/api/category/getCategory?page=${page}&limit=${limit}`)

    const result = await response.json();
    dispatch(getCategorySlice(result))
  }

  const editCategory = async (page, limit, name, id) => {
    try {
      const response = await fetch('http://localhost:8000/api/category/editCategory', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, id, page, limit })
      })

      if (!response.ok) {
        toast.error("Failed while Updating Category")
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json()
      dispatch(editedCategorySlice(result))
      toast.success("Category Updated Successfully")

    } catch (error) {
      console.error('Error Editing Category:', error.message);
      toast.error("Failed while Updating Category")


    }
  }

  const filterData = async (search) => {
        try {

          const response = await fetch(`http://localhost:8000/api/category/searchCategory`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({search})
          })

          if(response.ok){
            const result = await response.json();
            dispatch(searchCategory(result))
          }

        } catch (error) {
          console.error('Error searching categories:', error);
        }
  }
  return (
    <CategoryContext.Provider value={{ addCategory, deleteCategory, getCategory, editCategory,filterData }}>
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

      />

    </CategoryContext.Provider>
  );
}

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export { CategoryProvider }