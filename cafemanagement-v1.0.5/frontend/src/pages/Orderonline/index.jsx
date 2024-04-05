import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from 'react-router-dom';
import { Text } from '../../components/Text/index';
import { Heading } from '../../components/Heading/index';
import { Button } from '../../components/Button/index';
import { Img } from '../../components/Img/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useMenuContext } from "../../context/menu.context";
import { setOrder, deleteItem } from "redux/orderSlice";
import { setCurrentPage, setRowsPerPage } from '../../redux/menuSlice'
import { TablePagination } from '@mui/material';
import { IconButton } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

export default function OrderonlinePage() {
  const { data, pagination } = useSelector((state) => state.menu);
  const categorylist = useSelector((state) => state.menu.categorylist);
  const { cartlist } = useSelector((state) => state.order)
  const subtotal = useSelector((state) => state.order.subtotal);
  const { getMenu, getCatgory, filterCategory } = useMenuContext();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState([]);
  // const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getMenu(pagination.currentPage, pagination.rowsPerPage);
    getCatgory();

  }, []);

  useEffect(() => {
    if (data && data.length > 0 && !quantities.length) {
      setQuantities(Array(data.length).fill(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);



  const increaseQuantity = (index) => {
    if (data && data[index] && data[index].quantity !== undefined) {
      const maxQuantity = data[index].quantity; // Maximum quantity allowed for this product
      const currentQuantity = quantities[index]; // Current quantity in the cart
  
      // Check if the current quantity is less than the maximum allowed quantity
      if (currentQuantity < maxQuantity) {
        setQuantities((prevQuantities) => {
          const newQuantities = [...prevQuantities];
          newQuantities[index] = Math.min(
            newQuantities[index] + 1,
            maxQuantity // Limit the increment to the maximum quantity
          );
          return newQuantities;
        });
  
        // Find the selected item in the cartlist
        const selectedItemIndex = cartlist.findIndex(item => item.productid === data[index].productid);
  
        // If the selected item is already in the cartlist, update its quantity
        if (selectedItemIndex !== -1) {
          const updatedCartList = cartlist.map((item, idx) => {
            if (idx === selectedItemIndex) {
              return {
                ...item,
                orderedQuantity: item.orderedQuantity + 1
              };
            }
            return [item];
          });
          dispatch(setOrder({ data: updatedCartList, mode: "inc" }));
        } else {
          // If the selected item is not in the cartlist, add it
          const selectedItem = {
            ...data[index],
            orderedQuantity: 1,
          };
          dispatch(setOrder({ data: [...cartlist, selectedItem], mode: "inc" }));
        }
      } else {
        // Optionally, you can provide some feedback to the user
        console.log("Maximum quantity reached for this item.");
      }
    }
  };
  

  const decreaseQuantity = (index) => {
    if (data && data[index] && data[index].quantity !== undefined) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] = Math.max(newQuantities[index] - 1, 0);
        return newQuantities;
      });

      // Create a new array with updated cartlist
      const updatedOrderList = cartlist.map((item) => {
        if (item.productid === data[index].productid) {
          return {
            ...item,
            orderedQuantity: Math.max(item.orderedQuantity - 1, 0),
          };
        }
        return item;
      });

      // Dispatch the updated cartlist
      dispatch(setOrder({ data: updatedOrderList }));
    }
  };



  const addToOrderList = (productId) => {
    // const selectedProduct = data.find(product => product.productid === productId);
    // const isProductInOrderList = orderList.some(product => product.productid === productId);
    // if (!isProductInOrderList) {
    //   const updatedOrderList = [...orderList, selectedProduct];
    //   setOrderList(updatedOrderList);
    //   localStorage.setItem('orderList', JSON.stringify(updatedOrderList));
    //   localStorage.setItem('quantities', JSON.stringify(quantities));
    // }
  };

  const removeFromOrderList = (productId) => {
    console.log(productId)
    dispatch(deleteItem(productId));

  };

  const handleCheckout = () => {
    if (cartlist.length > 0) {
      console.log(cartlist)
      navigate('/checkout', { state: { cartlist, quantities, data } });
    } else {
      // Optionally, you can provide some feedback to the user if the order list is empty
      console.log("The order list is empty. Add products to proceed to checkout.");
    }
  };

  const taxFee = subtotal * 0.18;
  const total = subtotal + taxFee;

  const filterProductsByCategory = async (id) => {
    await filterCategory(id)
  }

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


  return (
    <>
      <Helmet>
        <title>Order Page</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full pt-[51px] gap-[139px] md:pt-5 bg-gray-50 ">
        <div className="flex flex-col  justify-start w-full gap-[103px] md:px-5 max-w-[1112px]">
          <div className="flex flex-col items-center justify-start w-full ">
            <div className="flex flex-col items-center justify-start w-full gap-[69px]">
              <Heading size="xl" as="h1" className="!font-opensans">
                Menu
              </Heading>
              <div className="flex flex-col items-start justify-start w-full gap-[59px]">
                <div className="flex flex-row justify-between w-full">

                  {categorylist.map((category) => (
                    <div key={category.id} className="flex flex-row justify-start w-full">
                      <Button color="gray_400_01" size="5xl" shape="round" className="w-full sm:px-5 font-semibold" onClick={() => filterProductsByCategory(category.id)}>
                        {category.name}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row md:flex-col justify-start items-center w-full gap-[46px] md:gap-5 ">
                  <div className="flex flex-col items-start justify-start w-full md:w-full gap-12">
                    <div className="flex flex-col items-start justify-start gap-2.5">
                      <Heading size="lg" as="h2">
                        PASTA
                      </Heading>
                      <div className="h-[2px] w-full bg-red-400" />
                    </div>
                    <div className="flex flex-wrap  w-[110%] gap-[30px] md:gap-5">
                      {data.map(({ productname, price, productid, image }, index) => (
                        <div className="flex flex-col items-center justify-start w-[250px] bg-white-A700 rounded-[45px] p-3" key={productid}>
                          <div className="flex justify-center items-center h-[173px] w-[173px]">
                            <Img
                              src={image}
                              alt={productname}
                              className="h-[173px] w-[173px] md:h-auto rounded-[50%]"
                            />
                          </div>
                          <Heading size="s" as="h3" className="mt-[21px] text-center">
                            {productname}
                          </Heading>
                          <Heading size="m" as="h4" className="mt-4 mb-4 font-semibold">
                            ${price}
                          </Heading>
                          <div className="flex items-center justify-center w-full gap-2">
                            <button onClick={() => decreaseQuantity(index)} className="px-3 py-1 bg-gray-200 rounded-full">-</button>
                            <p className="text-gray-900 text-[16.62px] ">
                              {cartlist.some((orderItem) => orderItem.productid === productid)
                                ? cartlist.find((orderItem) => orderItem.productid === productid).orderedQuantity
                                : 0}
                            </p>
                            <button onClick={() => increaseQuantity(index)} className="px-3 py-1 bg-gray-200 rounded-full">+</button>

                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start w-[31%] md:w-full">
                    <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                      <div className="flex flex-col items-center justify-center w-full gap-[30px] py-[45px] md:py-5 bg-white-A700 shadow-xs rounded-[20px]">
                        <div className="flex flex-col items-center justify-start w-full gap-[46px]">
                          <Heading size="lg" as="h3">
                            Order list
                          </Heading>
                          <div className="h-px w-full bg-blue_gray-100" />
                        </div>
                        {cartlist.map((product) => (
                          <div key={product.productid} className="flex flex-col w-full p-4 rounded border">
                            <div className="flex justify-between items-center">
                              <div>
                                <Text size="lg" as="p" className="font-semibold">{product.productname}</Text>
                              </div>
                              <div>
                                <Text size="lg" as="p" className="text-gray-600">${product.price}</Text>
                              </div>
                            </div>
                            <div className="flex items-center justify-between w-full gap-4">
                              <div className="flex items-center gap-2">
                                Quantity: {product.orderedQuantity}
                              </div>
                              <button onClick={() => removeFromOrderList(product.productid)} className="px-4 py-2  text-white rounded-full  transition-colors duration-300">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex flex-col items-center justify-start w-[83%] md:w-full gap-[26px]">
                          <div className="flex flex-row justify-between w-full">
                            <Heading as="h4" className="mb-px !text-black-900">
                              Subtotal
                            </Heading>
                            <Text size="lg" as="p" className="!text-gray-900">
                              {cartlist.length > 0 ? `$${subtotal.toFixed(2)}` : '-'}
                            </Text>
                          </div>
                          <div className="flex flex-row justify-between w-full">
                            <Heading as="h4" className="mb-px !text-black-900">
                              Tax fee
                            </Heading>
                            <Text size="lg" as="p" className="!text-gray-900">
                              {cartlist.length > 0 ? `$3.50` : '-'}
                            </Text>
                          </div>
                          <div className="flex flex-row justify-between w-full">
                            <Heading as="h4" className="mb-px !text-black-900">
                              Total
                            </Heading>
                            <Text size="lg" as="p" className="!text-gray-900">
                              {cartlist.length > 0 ? `$${(subtotal + 3.5).toFixed(2)}` : '-'}
                            </Text>
                          </div>
                        </div>
                        <Button
                          size="2xl"
                          shape="round"
                          className="mb-1 sm:px-5 font-semibold bg-blue_A200 min-w-[283px] !rounded-[15px] sm:min-w-full"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>
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
    </>
  );
}