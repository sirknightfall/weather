// Import the React library, which is required to use JSX and React features.
import React from "react";

// Import the ReactDOM client, which is used to render React components into the DOM.
import ReactDOM from "react-dom/client";

// Import the main App component of your application.
import App from "./App";

// Create a root for rendering the React application.
// ReactDOM.createRoot is used for React 18+ to enable concurrent features.
// document.getElementById("root") gets the DOM element with id 'root' (usually in index.html).
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> is a wrapper that helps highlight potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  <React.StrictMode>
    {/* Render the main App component inside StrictMode */}
    <App />
  </React.StrictMode>
);
