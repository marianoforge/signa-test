import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Notification = () => <ToastContainer />;

export const notify = (message: string) => {
  toast(message);
};
