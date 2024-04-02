import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Radio, Text, TextArea, Input, Img, Heading } from '../../components';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../../redux/orderSlice';
import { useCustomerContext } from '../../context/customer.context' // Import CustomerContext

export default function CheckoutPage() {
  const location = useLocation();
  const { cartlist, subtotal } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const {createCustomer} = useCustomerContext()

  const [orderDetails, setOrderDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    message: '',
    paymentMethod: '', // Initially empty, will be updated later
  });

  const removeFromOrderList = (productId) => {
    dispatch(deleteItem(productId));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleOrderNow = () => {
    createCustomer(orderDetails); // Call createCustomer with orderDetails

  };

  
  
  const handleTextareaChange = (value) => {
    setOrderDetails({ ...orderDetails, message: value });
  };


  const handlePaymentMethodChange = (event) => {
    const paymentMethod = event.target.value;
    setOrderDetails({ ...orderDetails, paymentMethod });
  };
  

  return (
    <>
      <Helmet>
        <title>Checkout Page</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col justify-start w-full pt-[50px] md:pt-5 bg-gray-50">
        <div className="flex flex-row ml-14 justify-center w-full gap-11 md:px-5 max-w-[1112px]">
          {/* Checkout Part */}
          <div className="flex flex-row md:flex-col justify-between items-start w-[70%] md:w-full md:gap-10">
            <Button color="gray_50" size="lg" shape="circle" className="w-[50px]">
              <Img src="images/img_back.svg" />
            </Button>
            <div className="flex flex-col h-auto items-center justify-start w-[100%] md:w-full">
              <div className="flex flex-col items-center justify-start w-full p-[45px] md:p-5 bg-white-A700 shadow-xs rounded-[16px]">
                <div className="flex flex-col items-center justify-start w-full gap-[29px]">
                  <Heading size="xl" as="h1" className="!text-gray-900 !font-opensans text-center font-bold text-2xl">
                    Checkout
                  </Heading>
                  <div className="flex flex-col items-center justify-start h-[721px] w-[722px] md:w-full gap-[30px]">
                    <div className="flex flex-col items-start justify-start w-full gap-[11px]">
                      {/* Order Data Section */}
                      <Text size="m" as="p" className="!text-gray-900">
                        Customer details
                      </Text>
                      <div className="flex flex-row justify-start w-full">
                        <div className="flex flex-col items-center justify-start w-full gap-6">
                          <div className="flex flex-row sm:flex-col justify-start w-full gap-4 sm:gap-5">
                            <Input
                              shape="round"
                              type="text"
                              name="firstName"
                              placeholder="First name"
                              className="w-[49%] sm:w-full"
                              value={orderDetails.firstName}
                              onChange={handleInputChange}
                            />
                            <Input
                              shape="round"
                              type="text"
                              name="lastName"
                              placeholder="Last name"
                              className="w-[49%] sm:w-full"
                              value={orderDetails.lastName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex flex-row sm:flex-col justify-start w-full gap-4 sm:gap-5">
                            <Input
                              shape="round"
                              type="number"
                              name="phoneNumber"
                              placeholder="Phone number"
                              className="w-[49%] sm:w-full gap-4"
                              value={orderDetails.phoneNumber}
                              onChange={handleInputChange}
                            />
                            <Input
                              shape="round"
                              type="email"
                              name="email"
                              placeholder="Email address"
                              className="w-[49%] sm:w-full"
                              value={orderDetails.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <TextArea
                            shape="round"
                            name="message"
                            placeholder="Message"
                            className="w-full sm:pb-5 sm:pr-5 text-gray-500"
                            value={orderDetails.message}
                            onChange={handleTextareaChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-2">
                      {/* Payment Method Section */}
                      <div className="flex flex-row justify-start">
                        <Text size="s" as="p" className="!text-gray-900">
                          Payment method
                        </Text>
                      </div>
                      <div className="flex flex-row w-full justify-around gap-6">
                        <div className="flex  flex-row sm:flex-col justify-around w-full gap-4 sm:gap-5">
                          <Radio
                            value="cashondelivery"
                            name="paymentMethod"
                            label="Cash"
                            className="flex pt-3.5 pb-2.5 pl-2 pr-[35px] gap-2 text-gray-900 text-lg bg-blue_gray-100_01 rounded-lg"
                            onChange={handlePaymentMethodChange}
                          />
                          <Radio
                            value="virtualaccount"
                            name="paymentMethod"
                            label="UPI"
                            className="flex pl-2 pr-[35px] gap-2 py-3 text-gray-900 text-lg bg-blue_gray-100_01 rounded-lg"
                            onChange={handlePaymentMethodChange}
                          />
                          <Radio
                            value="creditcard"
                            name="paymentMethod"
                            label="Card"
                            className="flex  pl-2 gap-2 py-3 text-gray-900 text-lg bg-blue_gray-100_01 rounded-lg"
                            onChange={handlePaymentMethodChange}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      size="4xl"
                      className="w-full sm:px-5 font-medium rounded-[12px]"
                      onClick={handleOrderNow}
                    >
                      Order now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Part */}
          <div className="flex flex-col items-center justify-start w-[50%] gap-[40px] md:w-[25%] bg-white-A700 p-5 h-auto shadow-xs rounded-[16px]">
            <Text size="l" as="p" className="!text-gray-900 font-bold">
              Order Summary
            </Text>
            <div className="flex flex-col items-start justify-start w-full gap-2">
              <Text size="s" as="p" className="text-gray-900">
                Your Orders
              </Text>
              <div className="flex flex-col gap-4">
                {cartlist.map((product) => (
                  <div key={product.productid} className="flex flex-col w-full p-4 rounded border">
                    <div className="flex justify-between items-center gap-10">
                      <div className="flex flex-row items-center">
                        <Text size="lg" as="p" className="font-semibold">
                          {product.productname}
                        </Text>
                        <Text size="s" as="p" className="text-gray-600 ml-2">
                          * {product.orderedQuantity}
                        </Text>
                      </div>
                      <div>
                        <Text size="lg" as="p" className="text-gray-600">${product.price}</Text>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full gap-4">
                      <button onClick={() => removeFromOrderList(product.productid)} className="px-4 py-2  text-white rounded-full  transition-colors duration-300">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
}
 
