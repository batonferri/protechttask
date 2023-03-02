import axios from "axios";
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const EditModal = ({ setEditInfo, editInfo, userId, setRefetch }) => {
  console.log(editInfo);
  const [inputs, setInputs] = useState({
    product_name: editInfo.product_name,
    price: editInfo.price,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    if (inputs.product_name === "" || inputs.price === "") {
      setError("Fields are required and cannot be empty");
      return;
    }
    e.preventDefault();
    try {
      await axios.put("http://localhost:80/api/product.php", {
        ...inputs,
        id: editInfo.id,
        user_id: userId,
      });
      setRefetch((prev) => !prev);
      setEditInfo({
        id: 0,
        product_name: "",
        price: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-grey-700 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen h-modal md:h-full"
      style={{ backgroundColor: "rgb(13, 13, 13, 0.34)" }}
    >
      <div className="relative top-1/4 sm:left-1/3 w-full h-full max-w-md md:h-auto px-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() =>
              setEditInfo({
                id: 0,
                product_name: "",
                price: "",
              })
            }
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            x
          </button>
          <div className="px-6 py-6 lg:px-8">
            <div className="space-y-6">
              <Input
                defaultValue={editInfo.product_name}
                label="Product name"
                name="product_name"
                type="text"
                placeholder="T-shirt"
                onChange={handleChange}
              />
              <Input
                defaultValue={editInfo.price}
                label="Product price"
                name="price"
                type="number"
                placeholder="90.00"
                onChange={handleChange}
              />
              <Button
                type="button"
                text="Edit product"
                onClick={handleSubmit}
              />
              {error && (
                <p className="mt-5 text-lg text-center text-red-500 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
