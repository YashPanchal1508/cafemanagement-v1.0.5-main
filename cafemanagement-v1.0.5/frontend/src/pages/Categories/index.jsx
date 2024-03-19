// Inside your component
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useCategoryContext } from "context/category.context";
import { Button, Input, Text } from "../../components";
import Header from "../../components/Header";
import Popup from "../../components/Popup/index";
import { Pencil, Trash2 } from 'lucide-react';
import { deleteCategorySlice, setCurrentPage, setRowsPerPage } from 'redux/categorySlice';
import { useDispatch } from 'react-redux';
import { TablePagination } from '@mui/material';
import { IconButton } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

export default function MenuListPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState('add');
  const [categoryToDelete, setCategoryToDelete] = useState();
  const [showDeleteCategoryPopup, setShowDeleteCategoryPopup] = useState(false);
  const [category, setCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedCategoryId, setEditedCategoryId] = useState(''); // New state for edited category id

  const dispatch = useDispatch();
  const { data: categories, pagination } = useSelector((state) => state.category);
  const { addCategory, deleteCategory, getCategory,editCategory,filterData } = useCategoryContext();

  useEffect(() => {
    getCategory(pagination.currentPage, pagination.rowsPerPage);
  }, []);

  const handlePopupToggle = (mode, category = '', categoryId = '') => {
    setPopupMode(mode);
    if (mode === 'edit') {
      setEditedCategory(category);
      setEditedCategoryId(categoryId); // Set edited category id
    } else {
      setCategory('');
      setEditedCategory(''); // Reset edited category
      setEditedCategoryId(''); // Reset edited category id
    }
    setShowPopup(true);
  };
  

  const handlePopupSubmit = async () => {
    if (popupMode === 'edit') {
      // Handle edit category
      await editCategory(pagination.currentPage,pagination.rowsPerPage,editedCategory, editedCategoryId)
    } else {
      await addCategory(pagination.currentPage, pagination.rowsPerPage, category);
    }
    setShowPopup(false);
    setCategory('');
  };

  const handleChange = (e) => {
    if (popupMode === 'edit') {
      setEditedCategory(e.target.value);
      console.log(editedCategory)
    } else {
      setCategory(e.target.value);
    }
  };
  

  const handleDeleteCategory = (name) => {
    setCategoryToDelete(name);
    setShowDeleteCategoryPopup(true)
  };

  const handleDelete = async () => {
    await deleteCategory(categoryToDelete, pagination.currentPage, pagination.rowsPerPage);
    if (categories.length === 1 && pagination.totalPages > 1) {
      const newPage = pagination.currentPage > 1 ? pagination.currentPage - 1 : 1;
      dispatch(setCurrentPage(newPage))
    }
    setShowDeleteCategoryPopup(false);
    setShowPopup(false);
  };

  // Pagination event handlers
  const handleChangePage = () => {
    dispatch(setCurrentPage(newPage + 1));
    getCategory(pagination.currentPage, pagination.rowsPerPage);
  }
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = event.target.value === '-1' ? parseInt(count) : parseInt(event.target.value, 10);
    dispatch(setRowsPerPage(newRowsPerPage));
    getCategory(1, newRowsPerPage);

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
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    if(searchValue === ''){
      getCategory(pagination.currentPage, pagination.rowsPerPage);
    }

    filterData(searchValue)
  } 
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
                  <Input type="text" placeholder="Search..." className="w-[20%] bg-slate-300" onChange={handleSearchChange} />
                  <Button onClick={() => handlePopupToggle('add')} className="w-[15%] bg-blue-500 rounded-sm">
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
                            <Pencil color="rgb(67, 143, 254)" className="cursor-pointer" onClick={() => handlePopupToggle('edit', rowData.name, rowData.id)} />
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
      {/* Add/Edit Category Popup */}
      {showPopup && (
        <Popup title={popupMode === 'edit' ? 'Edit Category' : 'Add Category'} onClose={() => setShowPopup(false)}>
          <div className="flex flex-col items-center justify-center">
            <Input
              type="text"
              name="category"
              placeholder="Category Name"
              className="w-full mb-4 p-2 border"
              value={popupMode === 'edit' ? editedCategory : category}
              onChange={handleChange}
            />
            <Button onClick={handlePopupSubmit} className="w-full bg-blue-500 text-white py-2 rounded">
              {popupMode === 'edit' ? 'Submit' : 'Add'}
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
