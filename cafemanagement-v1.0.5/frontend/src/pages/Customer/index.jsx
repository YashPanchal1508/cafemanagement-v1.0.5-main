import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Img, Text, SelectBox } from "../../components";
import Header from "../../components/Header";
import { ReactTable } from "../../components/ReactTable";
import {useSelector} from 'react-redux'
import { createColumnHelper } from "@tanstack/react-table";
import {useCustomerContext} from '../../context/customer.context'

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const CustomerPage = () => {
  const { data } = useSelector((state) => state.customer) 
  const {getCustomer} = useCustomerContext();

  useEffect(() => {
      
    getCustomer() 
    
  },[])

  return (
    <>
      <Helmet>
        <title>Customer list page</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-row justify-center items-start w-full bg-white-A700">
        <div className="flex flex-col items-center justify-start w-[83%] gap-9">
          <Header className="flex justify-center items-center w-full p-5 bg-white-A700 shadow-xs" />
          <div className="flex flex-col items-center justify-start w-[94%] gap-[35px]">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-col items-start justify-start gap-1.5">
                <Text size="xl" as="p">
                  Customer
                </Text>
                <Text size="lg" as="p" className="!text-blue_gray-400">
                  Customer / Review
                </Text>
              </div>
              <SelectBox
                indicator={<Img src="images/img_frame_11_white_a700.svg" alt="Frame 11" />}
                getOptionLabel={(e) => (
                  <>
                    <div className="flex items-center">
                      <Img src="images/img_mifilter.svg" alt="mi:filter" />
                      <span>{e.label}</span>
                    </div>
                  </>
                )}
                name="filter"
                placeholder="Filter"
                options={dropDownOptions}
                className="w-[10%] border-blue-A200 border border-solid"
              />
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-2">
              <div className="flex flex-row justify-center w-full p-[23px] bg-white-A700 shadow-md rounded-[15px]">
                <table className="w-[1062px]">
                  <thead>
                    <tr className="m-4">
                      <th  className="text-center text-gray-700_01 font-roboto ">First Name</th>
                      <th  className="text-center text-gray-700_01 font-roboto w-48">Last Name</th>
                      <th  className="text-center text-gray-700_01 font-roboto ">Phone Number</th>
                      <th  className="text-center text-gray-700_01 font-roboto ">Email</th>
                      <th  className="text-center text-gray-700_01 font-roboto ">Last Order</th>
                    </tr>
                  </thead>
                  <tbody > 
                    {data.map((rowData, index) => (
                      <tr key={index} className="items-baseline">
                        <td className="text-center text-gray-700_01 font-roboto ">{rowData.firstname}</td>
                        <td className="text-center text-gray-700_01 font-roboto ">{rowData.lastname}</td>
                        <td className="text-center text-gray-700_01 font-roboto ">{rowData.phonenumber}</td>
                        <td className="text-center text-gray-700_01 font-roboto h-14">{rowData.email}</td>
                        <td className="text-center text-gray-700_01 font-roboto ">{rowData.totalamount}</td>
                        <td>
                          <div className="text-center text-gray-700_01 font-roboto">
                            <Text className="mb-px">{rowData.lastorder}</Text>
                            
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <Text as="p" className="!font-poppins text-center">
                  Displaying 10 Out of 250
                </Text>
                <div className="flex flex-row justify-start items-center w-[11%] gap-[18px]">
                  <Text as="p" className="text-center">
                    10-250
                  </Text>
                  <div className="flex flex-row justify-start w-[49%]">
                    <div className="flex flex-col items-center justify-start h-[30px] w-[30px] z-[1]">
                      <Button size="xs" className="w-[30px] rounded-tr-[5px] rounded-br-[5px]">
                        <Img src="images/img_arrow_right_white_a700.svg" />
                      </Button>
                    </div>
                    <div className="flex flex-col items-center justify-start h-[30px] w-[30px] ml-[-1px]">
                      <Button color="blue_50" size="xs" className="w-[30px] rounded-tr-[5px] rounded-br-[5px]">
                        <Img src="images/img_arrow_right_blue_a200.svg" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerPage;

