import React from "react";
import { Helmet } from "react-helmet";
import { Button, Radio, Text, TextArea, Input, Img, Heading } from "../../components";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function CheckoutPage() {
  const location = useLocation();
  const orderList = location.state?.orderList || [];
  const quantities = location.state?.quantities || [];
  const data = location.state?.data || [];
  console.log(orderList, quantities)


  const removeFromOrderList = (productId) => {
    return orderList.filter(product => product.productid !== productId);
   
  };
  return (
    <>
      <Helmet>
        <title>Checkout Page</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col   justify-start w-full pt-[51px] gap-[150px] md:pt-5 bg-gray-50">
        <div className="flex flex-row ml-14 justify-center w-full gap-[80px] md:px-5 max-w-[1112px]">

          {/* Checkout Part */}
          <div className="flex flex-row md:flex-col justify-between items-start w-[70%] md:w-full md:gap-10">
            <Button color="gray_900" size="lg" shape="circle" className="w-[50px]">
              <Img src="images/img_back.svg" />
            </Button>
            <div className="flex flex-col h-auto items-center justify-start w-[100%] md:w-full">
              <div className="flex flex-col items-center justify-start w-full p-[45px] md:p-5 bg-white-A700 shadow-xs rounded-[16px]">
                <div className="flex flex-col items-center justify-start w-full gap-[29px]">
                  <Heading size="xl" as="h1" className="!text-gray-900 !font-opensans text-center font-bold text-2xl">
                    Checkout
                  </Heading>
                  <div className="flex flex-col items-center justify-start h-[721px] w-[722px] md:w-full gap-[30px]">
                    <div className="flex flex-col items-start justify-start w-full gap-2">
                      {/* Shipping Address Section */}
                      <Text size="s" as="p" className="!text-gray-900">
                        Shipping address
                      </Text>
                      <div className="flex flex-row md:flex-col justify-start gap-4 md:gap-5">
                        <Input
                          shape="round"
                          name="address"
                          placeholder="8502 Preston Rd. Inglewood, Maine 98380"
                          className=" md:w-full !text-gray-900"
                        />

                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-[11px]">
                      {/* Order Data Section */}
                      <Text size="s" as="p" className="!text-gray-900">
                        Order data
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
                            />
                            <Input
                              shape="round"
                              type="text"
                              name="lastName"
                              placeholder="Last name"
                              className="w-[49%] sm:w-full"
                            />
                          </div>
                          <div className="flex flex-row sm:flex-col justify-start w-full gap-4 sm:gap-5">
                            <Input
                              shape="round"
                              type="number"
                              name="phoneNumber"
                              placeholder="Phone number"
                              className="w-[49%] sm:w-full gap-4"
                            />
                            <Input
                              shape="round"
                              type="email"
                              name="email"
                              placeholder="Email address"
                              className="w-[49%] sm:w-full"
                            />
                          </div>
                          <TextArea
                            shape="round"
                            name="message"
                            placeholder="Message"
                            className="w-full sm:pb-5 sm:pr-5 text-gray-500"
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
                      <div className="flex flex-col w-full gap-6">
                        <div className="flex flex-row sm:flex-col justify-start w-full gap-4 sm:gap-5">
                          <Radio
                            value="cashondelivery"
                            name="cashon"
                            label="Cash On Delivery"
                            className="flex w-[49%] pt-3.5 pb-2.5 pl-2 pr-[35px] gap-2 text-gray-900 text-lg bg-blue_gray-100_01 rounded-lg"
                          />
                          <Radio
                            value="bcavirtualaccount"
                            name="bcavirtual"
                            label="BCA Virtual Account"
                            className="flex w-[49%] pl-2 pr-[35px] gap-2 py-3 text-gray-900 text-lg bg-blue_gray-100_01 rounded-lg"
                          />
                        </div>
                        <div className="flex flex-row sm:flex-col justify-start w-full gap-4 sm:gap-5">
                          <Radio
                            value="creditcard1"
                            name="creditcard"
                            label="Credit Card"
                            className="flex w-[49%] pl-2 pr-[35px] gap-2 py-3 text-gray-900 text-lg bg-blue_gray-100_01 rounded-lg"
                          />
                          <Radio
                            value="transferbank1"
                            name="transferbank"
                            label="Transfer Bank"
                            className="flex w-[49%] pl-2 pr-[35px] gap-2 py-3 text-gray-900 text-lg bg-blue_gray-100_01 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <Button size="4xl" className="w-full sm:px-5 font-medium rounded-[12px]">
                      Order now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Part */}
          <div className="flex flex-col items-center justify-start w-[30%] gap-[50px] md:w-[25%] bg-white-A700 p-5 h-80  shadow-xs rounded-[16px]">
            <Text size="l" as="p" className="!text-gray-900 font-bold">
              Order Summary
            </Text>
            <div className="flex flex-col items-start justify-start w-full gap-2">
              <Text size="s" as="p" className="text-gray-900">
                Your Orders
              </Text>
              <div className="flex flex-col gap-4">
                {orderList.map((product) => (
                  <div key={product.productid} className="flex flex-col w-full p-4 rounded border">
                    <div className="flex justify-between items-center gap-10">
                      <div className="flex flex-row items-center">
                        <Text size="lg" as="p" className="font-semibold">
                          {product.productname}
                        </Text>
                          <Text size="s" as="p" className="text-gray-600 ml-2">
                            * {quantities[data.findIndex(item => item.productid === product.productid)]}
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
          </div>
        </div>
      </div>
    </>
  );
}
