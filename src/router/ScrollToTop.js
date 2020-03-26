import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { PlaylistStore } from "../context/ContextProvider";
const ScrollToTop = ({ pageWrap }) => {
  const contextStore = useContext(PlaylistStore);
  const { dispatch } = contextStore;
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageWrap.current;
    dispatch({ type: "setPage", payload: page });
  }, []);

  useEffect(() => {
    const page = pageWrap.current;
    page.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
