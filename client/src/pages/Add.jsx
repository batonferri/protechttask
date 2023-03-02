import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useUser } from "../hooks/useUser";

const Add = () => {
  const { me } = useUser();

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    product_name: "",
    price: "",
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
      await axios.post("http://localhost:80/api/product.php", {
        ...inputs,
        user_id: me.id,
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex flex-row mt-5 justify-around w-full">
        <Input
          label="Product name"
          name="product_name"
          type="text"
          placeholder="T-shirt"
          large
          onChange={handleChange}
        />
        <Input
          label="Product price"
          name="price"
          type="number"
          placeholder="90.00"
          onChange={handleChange}
        />
      </div>
      <div className="w-full mt-4 flex justify-end">
        <div className="w-[40%] sm:w-[14%]">
          <Button type="button" text="Add" onClick={handleSubmit} />
        </div>
      </div>
      {error && (
        <p className="mt-5 text-lg text-center text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </>
  );
};

export default Add;
