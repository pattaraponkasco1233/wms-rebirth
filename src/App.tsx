import React, { useEffect } from "react";
import Router from "./guard/router/Router";
import { initializeStorage } from "./utils/storageInit";

const App = () => {
  // Initialize secure storage และ migrate ข้อมูลเก่า
  useEffect(() => {
    initializeStorage();
  }, []);

  return <Router />;
};

export default App;
