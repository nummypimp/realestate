import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductListPage from "./ProductListPage";
import CategoryPage from "./CategoryPage";
import ItemDetailPage from './pages/ItemDetailPage';
import PostPage from './pages/PostPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all" element={<ProductListPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/property/:id" element={<ItemDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
