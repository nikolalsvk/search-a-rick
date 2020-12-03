import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Login } from "./Login";
import { AuthProvider } from "../../context/auth";
import { login as mockedLogin } from "../../service/auth";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../service/auth");

test.skip("shows error", async () => {
  mockedLogin.mockResolvedValueOnce({ errors: ["Try again"] });

  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const submit = screen.getByText("Log In");

  userEvent.type(email, "mejl@rick.morty");
  userEvent.type(password, "beth123");

  userEvent.click(submit);

  expect(submit).toHaveTextContent("Logging In");

  await waitFor(() => {
    expect(submit).toHaveTextContent("Log In");
    expect(screen.getByText("Try again")).toBeVisible();
  });
});

test("logs in the user", async () => {
  mockedLogin.mockResolvedValueOnce({ success: true });

  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );

  const email = screen.getByLabelText("Email");
  const password = screen.getByLabelText("Password");
  const submit = screen.getByText("Log In");

  userEvent.type(email, "mejl@rick.morty");
  userEvent.type(password, "beth123");

  userEvent.click(submit);

  expect(submit).toHaveTextContent("Logging In");

  await waitFor(() => {
    expect(submit).toHaveTextContent("Log In");
    expect(screen.getByText("Try again")).not.toBeVisible();
  });
});
