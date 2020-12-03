import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Login } from "./Login";
import { AuthProvider } from "../../context/auth";

describe("when everything is valid", () => {
  it("renders email and password fields", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    expect(email).toBeVisible();
    expect(password).toBeVisible();
  });

  test("it saves when user types", () => {
    const emailValue = "mejl@rick.morty";

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    userEvent.type(email, emailValue);
    userEvent.type(password, "beth123");

    expect(email).toHaveValue(emailValue);
    expect(password).toHaveValue("beth123");
  });

  test("submits the form", () => {
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
  });
});

describe("when there are validation errors", () => {
  test("shows validation error when email is empty", () => {});
});
