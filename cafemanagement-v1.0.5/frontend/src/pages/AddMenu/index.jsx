import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, SelectBox, Img, Text, Input } from "../../components";
import Header from "../../components/Header";
import { useMenuContext } from "../../context/menu.context";
import { useSelector } from 'react-redux';

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function AddMenuPage() {
  const [formData, setFormData] = useState({
    productname: "",
    price: "",
    quantity: "",
    categoryid: null,
  });
  const [pic, setPic] = useState();
  const [filePath, setFilePath] = useState(""); // State to store file path
  const { categorylist } = useSelector((state) => state.menu);
  const { getCatgory , addMenuItem } = useMenuContext();


  useEffect(() => {
    getCatgory();
  }, []);

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, categoryid: selectedOption.categoryid });
  };

  const handleSubmit = async () => {
    try {
      await addMenuItem(formData,pic);
      setFormData({
        productname: "",
        price: "",
        quantity: "",
        categoryid: null,
      });
      // Reset file path after submission
      setFilePath("");
    } catch (error) {
      console.error('An error occurred while handling form submission:', error);
    }
  };

  const handleImageUpload = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" || pics.type === "image/webp") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dgvvlbw3r");
      fetch("https://api.cloudinary.com/v1_1/dgvvlbw3r/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // Set file path
          setFilePath(pics.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Varun's Application2</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-row justify-center items-start w-full bg-white-A700">
        <div className="flex flex-col items-center justify-start w-[83%] gap-[35px]">
          <Header className="flex justify-center items-center w-full p-5 bg-white-A700 shadow-xs" />
          <div className="flex flex-col items-center justify-start w-[94%] gap-[35px]">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-col items-start justify-start gap-[7px]">
                <Text size="xl" as="p">
                  Add Menu
                </Text>
                <Text size="lg" as="p" className="!text-blue_gray-400">
                  Add Menu / Menu List / Categories
                </Text>
              </div>
              <SelectBox
                indicator={<Img src="images/img_frame_11_white_a700.svg" alt="Frame 11" />}
                name="today"
                placeholder="Today"
                options={dropDownOptions}
                className="w-[9%] gap-px border-blue-A200 border border-solid"
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-[26px] p-5 bg-white-A700 shadow-md rounded-[15px]">
              <Text size="lg" as="p" className="mt-1.5 !font-medium">
                Choose Better Menu Type
              </Text>
              <div className="flex flex-col items-start justify-start w-full mb-1 gap-[25px]">
                <div className="flex flex-row justify-start w-full gap-[30px]">
                  <div className="flex flex-col items-start justify-start w-[49%] gap-2">
                    <Text size="lg" as="p">
                      Product Name
                    </Text>
                    <Input
                      color="gray_50_01"
                      size="sm"
                      type="text"
                      name="productname"
                      value={formData.productname}
                      placeholder="Enter Name "
                      onChange={handleChange}
                      className="w-full border-gray-200 rounded-[5px]"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-[49%] gap-2">
                    <Text size="lg" as="p">
                      Product Quantity
                    </Text>
                    <Input
                      color="gray_50_01"
                      size="sm"
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Enter Quantity"
                      className="w-full border-gray-200 rounded-[5px]"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-[49%] gap-2">
                    <Text size="lg" as="p">
                      Product Price
                    </Text>
                    <Input
                      color="gray_50_01"
                      size="sm"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter Price"
                      className="w-full border-gray-200 rounded-[5px]"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-start w-full gap-[30px]">
                  <div className="flex flex-col items-start justify-start w-[49%] gap-1.5">
                    <Text size="lg" as="p">
                      Upload
                    </Text>
                    <div className="flex flex-row justify-start w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        className="hidden"
                        id="menuImageUpload"
                      />
                      <label htmlFor="menuImageUpload">
                        <div className="flex flex-row justify-center w-full p-[37px] border-gray-200 border border-dashed bg-gray-50_01 rounded-[5px] cursor-pointer">
                          <div className="flex flex-col items-center justify-start w-[46%] gap-2.5 mx-[120px]">
                            <Img src="images/img_frame_15.svg" alt="image_five" className="h-[32px] w-[32px]" />
                            <Text as="p" className="!text-blue_gray-400 !font-normal">
                              <span className="text-gray-700_01 font-medium">{filePath || 'Drop your images here'}</span>
                              <span className="text-gray-700_01 font-medium">,</span>
                              <span className="text-blue_gray-400">or browse</span>
                            </Text>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[49%] gap-1.5">
                    <Text size="lg" as="p" className="!text-blue_gray-400">
                      Categories
                    </Text>
                    <SelectBox
                      color="gray_50_01"
                      size="sm"
                      indicator={<Img src="images/img_arrowdown.svg" alt="arrow_down" />}
                      name="selectedCategory"
                      placeholder="Select"
                      value={formData.selectedCategory}
                      onChange={handleCategoryChange}
                      options={categorylist.map(category => ({ label: category.name, categoryid: category.id }))}
                      className="w-full gap-px border-gray-200 border border-solid rounded-[5px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-[21px]">
                <Button size="md" className="font-medium min-w-[112px]" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button size="md" variant="outline" className="font-medium min-w-[112px]">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
