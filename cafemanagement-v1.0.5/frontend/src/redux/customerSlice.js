import { createSlice } from '@reduxjs/toolkit'

export const customerSlice = createSlice({

    name: 'customer',
    initialState: {
      data: [],
    },
    reducers: {
        addCustomer: (state,action) => {
            const { data } = action.payload
            state.data = data

        },
        getCustomerDetails : (state,action) => {
                const {data} = action.payload
                console.log(data)
                state.data = data
        },

    }

})

export const {addCustomer,getCustomerDetails} = customerSlice.actions
export default customerSlice.reducer;