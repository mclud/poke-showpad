/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";

import TestJest from "../components/TestJest/TestJest";

describe("<TestJest />", () => {
  test("Should display username label ", async () => {
    let { container } = render(
      <TestJest
        shouldRemember={false}
        onUsernameChange={function (username: string): void {
          throw new Error("Function not implemented.");
        }}
        onPasswordChange={function (password: string): void {
          throw new Error("Function not implemented.");
        }}
        onRememberChange={function (remember: boolean): void {
          throw new Error("Function not implemented.");
        }}
        onSubmit={function (username: string, password: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(container.querySelector('[for="username"]')).toBeInTheDocument();
  });
});
