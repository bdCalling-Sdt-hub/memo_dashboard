import { url } from '../../Redux/server'

const ShopPhoto = ({ shopImages }) => {
  return (
    <div className="w-full px-6 py-8">
      <h2 className="text-lg font-medium mb-4">Shop Photos</h2>
      <div className="flex gap-5 flex-wrap">
        {shopImages && shopImages.length > 0 ? (
          shopImages.map((photo, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <img
                src={`${url}/${photo}`}
                alt="Shop Photo"
                className="w-72"
                loading="lazy"
              />
            </div>
          ))
        ) : (
          <div> No images available</div>
        )}
      </div>
    </div>
  )
}

export default ShopPhoto
