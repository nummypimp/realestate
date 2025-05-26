export default function Header({ toggleMenu }) {
  return (
    <header className="header fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 flex items-center">
          <svg className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7..." />
          </svg>
          <span>พร็อพเพอร์ตี้ไทย</span>
        </div>
        <button className="text-gray-600" onClick={toggleMenu}>
          <svg className="h-8 w-8" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
