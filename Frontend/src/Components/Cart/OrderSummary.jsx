
export const OrderSummary = ({product}) => {
  return (
    <div className='flex justify-between mt-6'>
        <div className='flex gap-4'>
            <img className="h-24 w-24 object-cover rounded" src={product.image} alt={product.name} />
            <div className='flex flex-col'>
                <h3 className='text-lg'> {product.name} </h3>
                <p className='text-gray-700 text-sm'> Size : {product.size} </p>
                <p className='text-gray-700 text-sm'> Color : {product.color} </p>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-serif'> ${product.price} </h3>
          <h3 className='text-lg font-serif'> Qty : {product.quantity} </h3>
        </div>
    </div>
  )
}
