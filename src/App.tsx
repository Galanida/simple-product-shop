import type { ReactElement } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Header } from "./components/Header";
// import { Sidebar } from './components/SideBar';
// import { Footer } from './components/Footer';
import Navbar from "./components/Navbar/navbar";
// import HomePage from './pages/HomePage/homepage';

const App = (): ReactElement => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />
      </BrowserRouter>
    </>
  );
};

export default App;
