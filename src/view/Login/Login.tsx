import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { login } from "../../service/auth";
import { useFavorites } from "../../context/favorites";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [validations, setValidations] = useState({
    emailValid: true,
    passwordValid: true,
  });
  const [requestErrors, setRequestErrors] = useState([]);
  const { getFavorites } = useFavorites();
  const { setToken } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const emailValid = formValues.email.length > 0;
    const passwordValid = formValues.password.length > 0;

    setValidations({ emailValid, passwordValid });
  }, [formValues]);

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const result = await login(formValues.email, formValues.password);
    setLoading(false);

    if (result.errors) {
      setRequestErrors(result.errors);
    }

    if (result.success) {
      setRequestErrors([]);

      setToken(result.token);
      getFavorites();
      history.push("/");
    }
  };

  return (
    <div className="pt-10 px-2 sm:px-2 md:px-4 lg:px-10 xl:px-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-2"
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="myself@email.com"
            onChange={setValue}
          />
          {!validations.emailValid && (
            <p role="alert" className="text-red-500 text-xs italic">
              Please enter your email.
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-2"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="******************"
            onChange={setValue}
          />
          {!validations.passwordValid && (
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          )}
          <div className="mt-2 flex items-center">
            {requestErrors.map((error) => (
              <p className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`${
              loading ? "bg-blue-300" : "bg-pink-700"
            } hover:bg-blue-dark text-white font-bold py-2 px-4 rounded`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In" : "Log In"}
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            href="#forgot-password"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};
