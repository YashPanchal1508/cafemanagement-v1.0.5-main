import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center gap-4 justify-center h-screen">
        <Card className="mt-6 w-96  transition duration-300 transform hover:bg-white-A400 hover:-translate-y-1 rounded-lg bg-white-A700 p-3">
          <CardBody className="text-center p-3">
            <img src="/images/icons8-meal-80.png" alt="" className="m-auto h-16" />
            <Typography variant="h1" color="blue-gray" className="mb-2 text-3xl mt-3">
              Total Category:
            </Typography>
            1
          </CardBody>
          <CardFooter className="pt-0 text-center p-3">
            <Link to="/" className="inline-block">
              <Button size="sm" variant="text" className="flex items-center gap-2 text-lg font-roboto border-2 hover:bg-blue-500 bg-blue-600 text-white-A700 p-4 h-14">
                View Category 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6 w-96  transition duration-300 transform hover:bg-white-A400 hover:-translate-y-1 rounded-lg bg-white-A700 p-3">
          <CardBody className="text-center p-3">
            <img src="/images/icons8-product-80.png" alt="" className="m-auto h-16" />
            <Typography variant="h1" color="blue-gray" className="mb-2 text-3xl mt-3">
              Total Product:
            </Typography>
            1
          </CardBody>
          <CardFooter className="pt-0 text-center p-3">
            <Link to="/" className="inline-block">
              <Button size="sm" variant="text" className="flex items-center gap-2 text-lg border-2 hover:bg-blue-500 text-white-A700 bg-blue-600 p-4 h-14 ">
                View Product
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mt-6 w-96 duration-300 transform hover:bg-white-A400 hover:-translate-y-1 transition rounded-lg  bg-white-A700 p-3">
          <CardBody className="text-center p-3">
            <img src="/images/icons8-bill-80.png" alt="" className="m-auto h-16" />
            <Typography variant="h1" color="blue-gray" className="mb-2 text-3xl mt-3">
              Total Bill:
            </Typography>
            1
          </CardBody>
          <CardFooter className="pt-0 text-center p-3">
            <Link to="/" className="inline-block">
              <Button size="sm" variant="text" className="flex items-center gap-2 text-lg border-2 text-white-A700 hover:bg-blue-500 bg-blue-600 p-4 h-14">
                View Bill
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}