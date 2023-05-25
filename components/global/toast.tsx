"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer as ToastContainerOrigin } from "react-toastify";

export const ToastContainer = () => {
  return (
    <ToastContainerOrigin
      position="bottom-right"
      pauseOnFocusLoss={false}
      autoClose={2500}
      hideProgressBar={true}
    />
  );
};
