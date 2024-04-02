import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/font.css";
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { CategoryProvider } from "../src/context/category.context";
import { MenuProvider } from "context/menu.context";
import { CustomerProvider } from "./context/customer.context";
import { OrderProvider } from "./context/order.context";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <CategoryProvider>
            <MenuProvider>
                    <OrderProvider>
                <CustomerProvider>

                    <App />
                </CustomerProvider>
                    </OrderProvider>
            </MenuProvider>
        </CategoryProvider>
    </Provider>
);
