import React, { useState, useEffect } from "react";
import { Text, Img } from "./..";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubMenu, MenuItem, Menu, Sidebar } from "react-pro-sidebar";
import { IoLogOut } from "react-icons/io5";

export default function Sidebar1({ ...props }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("UserRole");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    // Remove authToken from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Sidebar
      width="252px !important"
      className="h-screen top-0 bg-white-A700 shadow-sm !sticky overflow-auto"
    >
      <Img
        src="public/images/Screenshot_2024-03-08_143414-removebg-preview.png"
        alt="image"
        className="h-[100px] w-[80%] mt-6 ml-7 mr-[97px]"
      />
      <Menu
        menuItemStyles={{
          button: {
            padding: "10px 10px 10px 28px",
            width: "100%",
            color: "#8c8787",
            fontWeight: 400,
            fontSize: "16px",
            gap: "12px",
            [`&:hover, &.ps-active`]: {
              color: "#438ffe",
              fontWeight: "500 !important",
              backgroundColor: "#edf5ff !important",
            },
          },
        }}
        renderExpandIcon={() => (
          <Img
            src={
              isSubMenuOpen
                ? "/images/down-arrow-svgrepo-com(1).svg"
                : "/images/img_arrow_right.svg"
            }
            alt="arrow_icon"
            className="h-[24px] w-[24px] cursor-pointer"
          />
        )}
        onToggleSubMenu={handleSubMenuToggle}
        className="flex flex-col items-center justify-start w-full mt-[65px]"
      >
        <Link to="/dashboard" className="text-blue_gray-400">
          <MenuItem
            icon={
              <Img
                src="/images/img_circlesfour.svg"
                alt="image_one"
                className="h-[20px] w-[20px]"
              />
            }
          >
            Dashboard
          </MenuItem>
        </Link>
        {(userRole === "admin" || userRole === "manager") && (
          <SubMenu
            label={
              <div className="flex flex-row justify-start items-center gap-3">
                <Img
                  src="/images/img_frame_17.svg"
                  alt="image_two"
                  className="h-[20px] w-[20px]"
                />
                <Text size="lg" as="p">
                  Orders
                </Text>
              </div>
            }
          >
            <Link to="/orderlist" className="text-blue_gray-400">
              <MenuItem>Order List</MenuItem>
            </Link>
            <Link to="/order" className="text-blue_gray-400">
              <MenuItem>Add Order</MenuItem>
            </Link>
          </SubMenu>
        )}
        {(userRole === "admin" || userRole === "manager") && (
          <SubMenu
            label={
              <div className="flex flex-row justify-start items-center gap-3">
                <Img
                  src="/images/img_frame_18.svg"
                  alt="image_three"
                  className="h-[20px] w-[20px]"
                />
                <Text size="lg" as="p">
                  Menus
                </Text>
              </div>
            }
          >
            {userRole === "admin" && (
              <Link to="/addmenu" className="text-blue_gray-400">
                <MenuItem>Add Product</MenuItem>
              </Link>
            )}

            <Link to="/menulist" className="text-blue_gray-400">
              <MenuItem>Menu List</MenuItem>
            </Link>

            {userRole === "admin" && (
            <Link to="/categories" className="text-blue_gray-400">
              <MenuItem>Add Category</MenuItem>
            </Link>
            )}
          </SubMenu>
        )}
        {userRole === "admin" && (
          <SubMenu
            label={
              <div className="flex flex-row justify-start items-center gap-3">
                <Img
                  src="/images/img_frame_19.svg"
                  alt="image_four"
                  className="h-[20px] w-[20px]"
                />
                <Text size="lg" as="p">
                  Customer
                </Text>
              </div>
            }
          >
            <Link to="/customer" className="text-blue_gray-400">
              <MenuItem>Customer List</MenuItem>
            </Link>
            {/* <Link to="/review" className="text-blue_gray-400">
              <MenuItem>Review</MenuItem>
            </Link> */}
          </SubMenu>
        )}
        {userRole === "admin" && (
          <SubMenu
            label={
              <div className="flex flex-row justify-start items-center gap-3">
                <Img
                  src="/images/img_frame_21.svg"
                  alt="image_six"
                  className="h-[20px] w-[20px]"
                />
                <Text size="lg" as="p">
                  Table{" "}
                </Text>
              </div>
            }
          >
            <Link to="/tablelist" className="text-blue_gray-400">
              <MenuItem>Table List</MenuItem>
            </Link>
            <Link to="/tableid" className="text-blue_gray-400">
              <MenuItem>Table ID</MenuItem>
            </Link>
          </SubMenu>
        )}
        <Link to="/login" className="text-blue_gray-400">
          <MenuItem
            icon={<IoLogOut className="h-6 w-6" />}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Link>
      </Menu>
      <div className="flex flex-col items-start justify-start w-[76%] mt-[276px] mb-[84px] mx-auto">
        <Img
          src="/images/img_group_18692.png"
          alt="image_seven"
          className="w-full object-cover"
        />
        <Text size="s" as="p" className="mt-[23px] ml-px !font-medium">
          Bistro Restaurant Admin{" "}
        </Text>
        <Text size="xs" as="p" className="mt-1.5 ml-px">
          2021 All Rights
        </Text>
        <div className="flex flex-row justify-start mt-[5px] gap-0.5">
          <Text size="xs" as="p">
            Made with
          </Text>
          <Img
            src="/images/img_heart.svg"
            alt="heart_one"
            className="h-[12px]"
          />
          <Text size="xs" as="p">
            by Bistro
          </Text>
        </div>
      </div>
    </Sidebar>
  );
}
