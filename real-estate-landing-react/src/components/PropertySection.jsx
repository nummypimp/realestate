


export default function PropertySection({ title, properties, isSlider = false }) {
  const containerClass = isSlider
    ? "flex overflow-x-auto gap-4 pb-4 slider-container"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4";

  return (
    <section className="mb-12" id={title}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className={containerClass}>
        {properties.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div className="h-48 bg-gray-200 relative">
              <div className={`absolute top-0 left-0 px-3 py-1 m-2 rounded-md text-sm font-medium text-white ${item.for === 'rent' ? 'bg-green-600' : 'bg-blue-600'}`}>
                {item.for === 'rent' ? 'เช่า' : 'ขาย'}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.location}</p>
              <div className="text-sm text-gray-500">{item.detail}</div>
              <div className="mt-3 text-blue-600 font-bold text-xl">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
