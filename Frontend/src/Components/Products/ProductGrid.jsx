import { Link } from 'react-router-dom';
import placeholderImage from "../../assets/no-image.png";

const ProductGrid = ({ products, loading, error }) => {
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!products || products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <Link key={index} to={`/product/${product._id}`} className="block">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="w-full h-96 mb-4">
                            {product.images && product.images.length > 0 && product.images[0].url ? (
                                <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                // <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg">
                                //     No Image
                                // </div>
                                <img src={placeholderImage} className="w-full h-full object-cover rounded-lg" />
                            )}
                        </div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductGrid;
