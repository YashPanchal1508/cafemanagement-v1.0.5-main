import React, { createContext, useContext } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useOrderContext } from './order.context';
import {addCustomer,getCustomerDetails } from '../redux/customerSlice'

// Create the CustomerContext
const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const {cartlist} = useSelector((state) => state.order)
    const dispatch = useDispatch()
    const { addOrder } = useOrderContext();
    const createCustomer = async(orderDetails) => {
        
        try {

            const response = await fetch('http://localhost:8000/api/customer/createCustomer',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderDetails })
            })

            const result = await response.json();
            dispatch(addCustomer(result))
            console.log(cartlist, orderDetails.paymentMethod, result.data.customerid)
            addOrder(cartlist, orderDetails.paymentMethod, result.data.customerid)
            
        } catch (error) {
            console.log(error)
        }


    };
    const getCustomer = async() => {
        
        try {

            const response = await fetch('http://localhost:8000/api/customer/getCustomer')

            const result = await response.json();
            dispatch(getCustomerDetails(result))

        } catch (error) {
            console.log(error)
        }


    };

    return (
        <CustomerContext.Provider value={{ createCustomer ,getCustomer}}>
            {children}
        </CustomerContext.Provider>
    );
};


export const useCustomerContext = () => {
    return useContext(CustomerContext);
};
