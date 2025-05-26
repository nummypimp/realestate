import { Link } from "react-router-dom";

export default function SideMenu({ open, toggleMenu }) {
  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${open ? '' : 'hidden'}`} onClick={toggleMenu}></div>
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5">
          <h2 className="text-xl font-bold text-blue-600 mb-4">เมนู</h2>
          <ul className="space-y-4">
            <li><Link to="/" onClick={toggleMenu} className="block py-2 px-4 hover:bg-blue-50">หน้า Landing (แยกหมวด)</Link></li>
            <li><Link to="/all" onClick={toggleMenu} className="block py-2 px-4 hover:bg-blue-50">รายการทั้งหมด</Link></li>
            <li><Link to="/category?c=home" onClick={toggleMenu} className="block py-2 px-4 hover:bg-blue-50">เฉพาะบ้าน</Link></li>
            <li><Link to="/category?c=land" onClick={toggleMenu} className="block py-2 px-4 hover:bg-blue-50">เฉพาะที่ดิน</Link></li>
            <li><Link to="/category?c=condo" onClick={toggleMenu} className="block py-2 px-4 hover:bg-blue-50">เฉพาะคอนโด</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
