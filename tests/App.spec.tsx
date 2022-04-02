// App.spec.tsx
import { render } from "@testing-library/react";

import App from "../src/App";

// eslint-disable-next-line jest/expect-expect
test("renders without crashing", () => {
  render(<App />);
});
