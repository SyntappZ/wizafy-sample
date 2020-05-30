import React, { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlaylistStore } from "../context/ContextProvider";

const Toast = () => {
  const contextStore = useContext(PlaylistStore);
  const {state, setToastMessage} = contextStore;

  const {toastMessage} = state

  useEffect(() => {
    if (toastMessage) {
      toast('🎵 ' + toastMessage);
      setTimeout(() => setToastMessage(''), 2000)
    }
   
  }, [toastMessage]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      
    />
  );
};

export default Toast;
