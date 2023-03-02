import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:80/api/register.php", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Box>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Title title="Create an account" />
          <div className="space-y-4 md:space-y-6">
            <Input
              label="Your full name"
              name="full_name"
              type="text"
              placeholder="Jon Doe"
              onChange={handleChange}
            />
            <Input
              label="Your email"
              name="email"
              type="email"
              placeholder="name@company.com"
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
            />
            <Button type="button" text="Sign Up" onClick={handleSubmit} />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              You have an account yet?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </Link>
            </p>
            {error && (
              <p className="text-lg text-center  text-red-500 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Register;
