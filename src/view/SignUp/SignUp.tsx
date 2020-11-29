import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { USERS_API } from "../../shared/api";

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { firstName, lastName, email, password } = formValues;

    const result = await USERS_API.signUp({
      firstName,
      lastName,
      email,
      password,
    });

    setLoading(false);

    if (result.success) {
      history.push("/login");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <div className="pt-10 px-2 sm:px-2 md:px-4 lg:px-10 xl:px-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <div className="mb-4">
          <label
            htmlFor="first-name"
            className="block text-grey-darker text-sm font-bold mb-2"
          >
            First name
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            onChange={handleChange}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-2"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="last-name"
            className="block text-grey-darker text-sm font-bold mb-2"
          >
            Last name
          </label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            onChange={handleChange}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-2"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-grey-darker text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            onChange={handleChange}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
