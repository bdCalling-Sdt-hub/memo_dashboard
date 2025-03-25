const ShopProducts = () => {
  const products = [
    {
      name: 'Men Beauty Kit',
      price: '€30',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Men Beauty Kit',
      price: '€30',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Men Beauty Kit',
      price: '€30',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Men Beauty Kit',
      price: '€30',
      image: 'https://via.placeholder.com/100',
    },
  ]

  return (
    <div className="w-full py-8">
      <h2 className="text-lg font-medium mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 border rounded-md shadow-sm bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                {product.name}
              </h3>
              <p className="text-gray-500">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopProducts
