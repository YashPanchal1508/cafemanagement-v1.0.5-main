// Inside your component
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useCategoryContext } from "context/category.context";
import { Button, Img, Input, Text } from "../../components";
import Header from "../../components/Header";
import Popup from "../../components/Popup/index";
import { Pencil, Trash2 } from 'lucide-react';
import { deleteCategorySlice,setCurrentPage,setRowsPerPage } from 'redux/categorySlice';
import { useDispatch } from 'react-redux';
import { TablePagination } from '@mui/material';
import { IconButton } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

export default function MenuListPage() {
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [showDeleteCategoryPopup, setShowDeleteCategoryPopup] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState();
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const { data: categories, pagination } = useSelector((state) => state.category);
  const { addCategory, deleteCategory, getCategory } = useCategoryContext();

  // console.log(typeof categories)
  useEffect(() => {
    getCategory(pagination.currentPage, pagination.rowsPerPage);
  }, []);

  const handleAddCategoryClick = () => {
    setCategory('');
    setShowAddCategoryPopup(true);
  };

  const handlePopupSubmit = async() => {
    await addCategory(pagination.currentPage, pagination.rowsPerPage, category);
    setShowAddCategoryPopup(false);
    setCategory('');
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDeleteCategory = (name) => {
    setCategoryToDelete(name);
    setShowDeleteCategoryPopup(true);
  };

  const handleDelete = async () => {
    await deleteCategory(categoryToDelete, pagination.currentPage, pagination.rowsPerPage);
    if (categories.length === 1 && pagination.totalPages > 1) {
      const newPage = pagination.currentPage > 1 ? pagination.currentPage - 1 : 1;
      dispatch(setCurrentPage(newPage))
    }
    setShowDeleteCategoryPopup(false);
  };

  const handleChangePage  = () => {
    dispatch(setCurrentPage(newPage + 1));
    getCategory(pagination.currentPage, pagination.rowsPerPage);
  }
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    dispatch(setRowsPerPage(newRowsPerPage));
    getCategory(pagination.currentPage, pagination.rowsPerPage);
  
  };
  const handleFirstPageButtonClick = () => {
    dispatch(setCurrentPage(1));
    getCategory(1, pagination.rowsPerPage);
  };
  
  const handleBackButtonClick = () => {
    const newPage = Math.max(1, pagination.currentPage - 1);
    dispatch(setCurrentPage(newPage));
    getCategory(newPage, pagination.rowsPerPage);
  };
  
  const handleNextButtonClick = () => {
    const newPage = Math.min(pagination.totalPages, pagination.currentPage + 1);
    dispatch(setCurrentPage(newPage));
    getCategory(newPage, pagination.rowsPerPage);
  };
  
  const handleLastPageButtonClick = () => {
    dispatch(setCurrentPage(pagination.totalPages));
    getCategory(pagination.totalPages, pagination.rowsPerPage);
  };
  return (
    <>
      <div className="flex flex-row justify-center w-full h-screen bg-gray-100">
        <div className="flex flex-row justify-center items-start w-full">
          <div className="flex flex-col items-center justify-start w-[83%] gap-9">
            <Header className="flex justify-center items-center w-full p-5 bg-white-A700 shadow-xs" />
            <div className="flex flex-row justify-center w-[94%]">
              <div className="flex flex-col items-center justify-start w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start gap-1.5">
                    <Text size="xl" as="p" >
                      Manage Category
                    </Text>
                    <Text size="lg" as="p" className="!text-blue_gray-400">
                      Menu / Menu List
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-[94%] mt-6">
                  <Input type="text" placeholder="Search..." className="w-[20%] bg-slate-300" />
                  <Button onClick={handleAddCategoryClick} className="w-[15%] bg-blue-500 rounded-sm">
                    Add Category
                  </Button>
                </div>
                <div className="flex flex-row justify-center w-full mt-9 p-[26px] bg-white-A700 shadow-md rounded-[15px]">
                  {/* Table for Categories */}
                  <table className="w-[1036px] mx-[11px]">
                    <thead>
                      <tr className="m-4">
                        <th className="text-center text-gray-700_01 font-roboto m-3">Category Name</th>
                        <th className="text-center text-gray-700_01 font-roboto m-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {categories.map((rowData, index) => (
                        <tr key={index} className="">
                          <td className="text-center font-roboto m-2">{rowData.name}</td>
                          <td className="items-center flex justify-center text-gray-700_01 font-roboto m-2">
                            <Pencil color="rgb(67, 143, 254)" className="cursor-pointer" onClick={handleAddCategoryClick} />
                            <Trash2 className="cursor-pointer" onClick={() => handleDeleteCategory(rowData.name)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-row justify-between items-center w-full mt-[15px]">
              
                  <div className="flex flex-row justify-end items-center w-full gap-[18px]">
                  <TablePagination
              rowsPerPageOptions={[5, 10, 25]} 
              component="div"
              count={Number.isNaN(pagination.finalTotal) ? 0 : Number(pagination.finalTotal)}
              rowsPerPage={pagination.rowsPerPage}
              page={pagination.currentPage - 1} // Adjusted to 0-based index
              onPageChange={handleChangePage} // Event handler for page change
              onRowsPerPageChange={handleChangeRowsPerPage} // Event handler for rows per page change
              ActionsComponent={() => (
                <div style={{ flexShrink: 0, ml: 2.5 }} className="sticky bottom-0 z-10">
                  <IconButton onClick={handleFirstPageButtonClick} disabled={pagination.currentPage === 1 || pagination.rowsPerPage === -1} aria-label="first page">
                    <FirstPage />
                  </IconButton>
                  <IconButton onClick={handleBackButtonClick} disabled={pagination.currentPage === 1 || pagination.rowsPerPage === -1} aria-label="previous page">
                    <KeyboardArrowLeft />
                  </IconButton>
                  <IconButton onClick={handleNextButtonClick} disabled={pagination.currentPage === pagination.totalPages || pagination.rowsPerPage === -1} aria-label="next page">
                    <KeyboardArrowRight />
                  </IconButton>
                  <IconButton onClick={handleLastPageButtonClick} disabled={pagination.currentPage === pagination.totalPages || pagination.rowsPerPage === -1} aria-label="last page">
                    <LastPage />
                  </IconButton>
                </div>
              )}
            />
                  </div>
                </div>
                {/* Search Bar */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Category Popup */}
      {showAddCategoryPopup && (
        <Popup title="Add Category" onClose={() => setShowAddCategoryPopup(false)} >
          <div className="flex flex-col items-center justify-center">
            <Input
              type="text"
              name="category"
              placeholder="Category Name"
              className="w-full mb-4 p-2 border"
              value={category}
              onChange={handleChange}
            />
            <Button onClick={handlePopupSubmit} className="w-full bg-blue-500 text-white py-2 rounded">
              Submit
            </Button>
          </div>
        </Popup>
      )}
      {showDeleteCategoryPopup && (
        <Popup title="Delete Category" onClose={() => setShowDeleteCategoryPopup(false)} >
          <div className="flex flex-col">
            <Text as="p" className="!font-poppins text-center">
              Are you sure you want to delete this category?
            </Text>
            <div className="mt-6 m-auto flex justify-end gap-2 mr-1">
              <Button onClick={() => setShowDeleteCategoryPopup(false)} className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded">
                Cancel
              </Button>
              <Button onClick={handleDelete} className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded">
                Delete
              </Button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}
