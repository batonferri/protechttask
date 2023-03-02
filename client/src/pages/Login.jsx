import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import { useUser } from "../hooks/useUser";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Box>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Title title="Sign in to your account" />
          <div className="space-y-4 md:space-y-6">
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
            <Button type="button" text="Sign in" onClick={handleSubmit} />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
            {error && (
              <p className="text-lg text-center text-red-500 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Login;
