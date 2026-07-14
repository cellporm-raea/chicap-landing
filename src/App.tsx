import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SiteNav from "./components/SiteNav";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/shop/cap"
          element={
            <ShopCategory
              name="Cap"
              tag="Headwear — the signature silhouette."
              image="/gallery/g02.jpg"
            />
          }
        />
        <Route
          path="/shop/clothes"
          element={
            <ShopCategory
              name="Clothes"
              tag="Beyond the brim."
              image="/gallery/g07.jpg"
            />
          }
        />
      </Routes>
    </>
  );
}
