import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductListPage from "./ProductListPage";
import CategoryPage from "./CategoryPage";
import ItemDetailPage from './pages/ItemDetailPage';
import PropertyForm from "./pages/PropertyForm";
import TiktokSearch from "./pages/TiktokSearch";
import PostPage from "./pages/PostForm";
import Map from "./pages/Map";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all" element={<ProductListPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/post" element={<PropertyForm />} />
        <Route path="/property/:id" element={<ItemDetailPage />} />
        <Route path="/tiktok" element={<TiktokSearch />} />
         <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}
