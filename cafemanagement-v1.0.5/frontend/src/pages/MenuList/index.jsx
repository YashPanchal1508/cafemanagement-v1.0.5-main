

import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Img, Text, RatingBar, SelectBox, Input } from "../../components";
import Header from "../../components/Header";
import { useSelector } from 'react-redux';
import { useMenuContext } from "../../context/menu.context";
import {setCurrentPage, setRowsPerPage } from '../../redux/menuSlice'
import { TablePagination } from '@mui/material';
import { IconButton } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';
import { useDispatch } from 'react-redux';


const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];



export default function MenuListPage() {
  const { data,pagination } = useSelector((state) => state.menu);
  const { getMenu,filterData } = useMenuContext();
  const dispatch = useDispatch();


  useEffect(() => {
    getMenu(1, 5);
  }, [])
  const newPage = 1
  const handleChangePage = () => {
    dispatch(setCurrentPage(newPage + 1));
    getMenu(pagination.currentPage, pagination.rowsPerPage);
  }
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = event.target.value === '-1' ? parseInt(count) : parseInt(event.target.value, 10);
    dispatch(setRowsPerPage(newRowsPerPage));
    getMenu(1, newRowsPerPage);

  };
  const handleFirstPageButtonClick = () => {
    dispatch(setCurrentPage(1));
    getMenu(1, pagination.rowsPerPage);
  };

  const handleBackButtonClick = () => {
    const newPage = Math.max(1, pagination.currentPage - 1);
    dispatch(setCurrentPage(newPage));
    getMenu(newPage, pagination.rowsPerPage);
  };

  const handleNextButtonClick = () => {
    const newPage = Math.min(pagination.totalPages, pagination.currentPage + 1);
    dispatch(setCurrentPage(newPage));
    getMenu(newPage, pagination.rowsPerPage);
  };

  const handleLastPageButtonClick = () => {
    dispatch(setCurrentPage(pagination.totalPages));
    getMenu(pagination.totalPages, pagination.rowsPerPage);
  };
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    if(searchValue === ''){
      getMenu(pagination.currentPage, pagination.rowsPerPage);
    }

    filterData(searchValue)

  }

  return (
    <>
      <Helmet>
        <title>Varun's Application2</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-row justify-center w-full bg-white-A700">
        <div className="flex flex-row justify-center items-start w-full">
          <div className="flex flex-col items-center justify-start w-[83%] gap-9">
            <Header className="flex justify-center items-center w-full p-5 bg-white-A700 shadow-xs" />
            <div className="flex flex-row justify-center w-[94%]">
              <div className="flex flex-col items-center justify-start w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-col items-start justify-start gap-1.5">
                    <Text size="xl" as="p">
                      Menu List
                    </Text>
                    <Text size="lg" as="p" className="!text-blue_gray-400">
                      Menu / Menu List
                    </Text>
                  </div>
                  <Input type="text" placeholder="Search..." className="w-[20%] bg-slate-300" onChange={handleSearchChange} />
                  <SelectBox
                    indicator={<Img src="images/img_frame_11_white_a700.svg" alt="Frame 11" />}
                    name="today"
                    placeholder="Today"
                    options={dropDownOptions}
                    className="w-[9%] gap-px border-blue-A200 border border-solid"
                  />
                </div>
                <div className="flex flex-row justify-center w-full mt-9 p-[26px] bg-white-A700 shadow-md rounded-[15px]">
                  <table className="w-[1036px] mx-[11px]">
                    <thead>
                      <tr className="m-4">
                        <th className="text-center text-gray-700_01 font-roboto ">Category Name</th>
                        <th className="text-center text-gray-700_01 font-roboto ">Product Name</th>
                        <th className="text-center text-gray-700_01 font-roboto ">Quantity</th>
                        <th className="text-center text-gray-700_01 font-roboto ">Status</th>
                        <th className="text-center text-gray-700_01 font-roboto ">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((rowData, index) => (
                        <tr key={index}>
                          <td className="text-center text-gray-700_01 font-roboto ">{rowData.name}</td>
                          <td className="text-center text-gray-700_01 font-roboto h-14 ">
                            {rowData.productname}
                          </td>
                          <td className="text-center text-gray-700_01 font-roboto ">{rowData.quantity}</td>
                          <td className="text-center text-gray-700_01 font-roboto ">
                            <Text as="p" className="!text-green-500">
                              {rowData.quantity > 0 ? (
                                <Text as="p" className="text-green-500">
                                  In Stock
                                </Text>
                              ) : (
                                <Text as="p" className="text-red-500">
                                  Out of Stock
                                </Text>
                              )}
                            </Text>
                          </td>
                          <td className="text-center text-gray-700_01 font-roboto "> {rowData.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-row justify-between items-center w-full mt-[15px]">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

