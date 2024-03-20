import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from 'react-router-dom';
import { Text } from '../../components/Text/index';
import { Heading } from '../../components/Heading/index';
import { Button } from '../../components/Button/index';
import { Img } from '../../components/Img/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useMenuContext } from "../../context/menu.context";
export default function OrderonlinePage() {
  const { data } = useSelector((state) => state.menu);
  const categorylist = useSelector((state) => state.menu.categorylist);
  const { getMenu, getCatgory,filterCategory } = useMenuContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [quantities, setQuantities] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getMenu(1, 6);
    getCatgory();
    const storedOrderList = JSON.parse(localStorage.getItem('orderList'));
    const storedQuantities = JSON.parse(localStorage.getItem('quantities'));
    if (storedOrderList && storedQuantities) {
      setOrderList(storedOrderList);
      setQuantities(storedQuantities);
    }
  }, []);

  useEffect(() => {
    const initialQuantities = new Array(data.length).fill(0);
    setQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      data.forEach((product, index) => {
        const storedQuantity = localStorage.getItem(`quantity_${product.productid}`);
        if (storedQuantity !== null) {
          updatedQuantities[index] = parseInt(storedQuantity);
        }
      });
      return updatedQuantities;
    });
  }, [data]);

  useEffect(() => {
    if (location.state && location.state.orderList) {
      setOrderList(location.state.orderList);
      setQuantities(location.state.quantities);
    }
  }, [location.state]);

  const increaseQuantity = (productId) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      const productIndex = data.findIndex(item => item.productid === productId);
      newQuantities[productIndex]++;
      localStorage.setItem(`quantity_${productId}`, newQuantities[productIndex].toString());
      return newQuantities;
    });
  };

  const decreaseQuantity = (productId) => {
    const productIndex = data.findIndex(item => item.productid === productId);
    if (quantities[productIndex] > 0) {
      setQuantities(prevQuantities => {
        const newQuantities = [...prevQuantities];
        newQuantities[productIndex]--;
        localStorage.setItem(`quantity_${productId}`, newQuantities[productIndex].toString());
        return newQuantities;
      });
    }
  };

  const addToOrderList = (productId) => {
    const selectedProduct = data.find(product => product.productid === productId);
    const isProductInOrderList = orderList.some(product => product.productid === productId);
    if (!isProductInOrderList) {
      const updatedOrderList = [...orderList, selectedProduct];
      setOrderList(updatedOrderList);
      localStorage.setItem('orderList', JSON.stringify(updatedOrderList));
      localStorage.setItem('quantities', JSON.stringify(quantities));
    }
  };

  const removeFromOrderList = (productId) => {
    const updatedOrderList = orderList.filter(product => product.productid !== productId);
    setOrderList(updatedOrderList);
    localStorage.setItem('orderList', JSON.stringify(updatedOrderList));
    localStorage.setItem('quantities', JSON.stringify(quantities));
  };

  const handleCheckout = () => {
    if (orderList.length > 0) {
      navigate('/checkout', { state: { orderList, quantities, data } });
    } else {
      // Optionally, you can provide some feedback to the user if the order list is empty
      console.log("The order list is empty. Add products to proceed to checkout.");
    }
  };

  const subtotal = orderList.reduce((acc, curr) => {
    return acc + curr.price * quantities[data.findIndex(item => item.productid === curr.productid)];
  }, 0);

  const filterProductsByCategory = async(id) => {
    await filterCategory(id)
  }

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
                    <Button color="gray_400_01" size="5xl" shape="round" className="w-full sm:px-5 font-semibold"onClick={() => filterProductsByCategory(category.id)}>
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
                      {data.map(({ productname, price, productid, image }) => (
                        <div className="flex flex-col items-center justify-start w-[250px] bg-white-A700 rounded-[45px]" key={productid}>
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
                          <Heading size="xs" as="h4" className="mt-[22px]">
                            ${price}
                          </Heading>
                          <div className="flex items-center justify-center w-full gap-2">
                            <button onClick={() => decreaseQuantity(productid)} className="px-3 py-1 bg-gray-200 rounded-full">-</button>
                            <input type="number" className="w-16 text-center border border-gray-400 rounded" value={quantities[data.findIndex(item => item.productid === productid)]} readOnly />
                            <button onClick={() => increaseQuantity(productid)} className="px-3 py-1 bg-gray-200 rounded-full">+</button>
                          </div>
                          <Button onClick={() => addToOrderList(productid)} size="sm" className="mt-2">
                            Add to Order
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start w-[31%] md:w-full">
                    <div className="flex flex-col items-center justify-center w-full gap-[30px] py-[45px] md:py-5 bg-white-A700 shadow-xs rounded-[20px]">
                      <div className="flex flex-col items-center justify-start w-full gap-[46px]">
                        <Heading size="lg" as="h3">
                          Order list
                        </Heading>
                        <div className="h-px w-full bg-blue_gray-100" />
                      </div>
                      {orderList.map((product) => (
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
                              Quantity: {quantities[data.findIndex(item => item.productid === product.productid)]}
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
                            ${subtotal.toFixed(2)}
                          </Text>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                          <Heading as="h4" className="mb-px !text-black-900">
                            Tax fee
                          </Heading>
                          <Text size="lg" as="p" className="!text-gray-900">
                            $3.50
                          </Text>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                          <Heading as="h4" className="mb-px !text-black-900">
                            Total
                          </Heading>
                          <Text size="lg" as="p" className="!text-gray-900">
                            ${(subtotal + 3.5).toFixed(2)}
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
              <div className="flex flex-row sm:flex-col justify-start items-center w-[22%] md:w-full ml-[242px] gap-2.5 md:ml-5 sm:gap-5">
                <Img src="images/img_arrow_left.svg" alt="arrowleft_one" className="h-[15px] w-[15px]" />
                <div className="flex flex-row justify-between w-[71%] sm:w-full">
                  <div className="flex flex-col items-center justify-start h-[35px] w-[35px]">
                    <Button
                      color="gray_900"
                      size="sm"
                      className="tracking-[-0.50px] font-inter font-semibold min-w-[35px] rounded sm:min-w-full"
                    >
                      1
                    </Button>
                  </div>
                  <div className="flex flex-row w-[48%] gap-2.5">
                    <div className="flex flex-col items-center justify-start h-[35px] w-[44%]">
                      <Button
                        color="gray_200"
                        size="sm"
                        className="tracking-[-0.50px] font-inter font-semibold min-w-[35px] rounded sm:min-w-full"
                      >
                        2
                      </Button>
                    </div>
                    <div className="flex flex-col items-center justify-start h-[35px] w-[44%]">
                      <Button
                        color="gray_200"
                        size="sm"
                        className="tracking-[-0.50px] font-inter font-semibold min-w-[35px] rounded sm:min-w-full"
                      >
                        3
                      </Button>
                    </div>
                  </div>
                  <Button color="gray_200" size="xs" className="w-[35px] rounded">
                    <Img src="images/img_bx_bx_dots_horizontal_rounded.svg" />
                  </Button>
                </div>
                <Img src="images/img_akar_icons_chevron_left.svg" alt="akaricons_one" className="h-[15px] w-[15px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
