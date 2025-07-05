import Hero from '../Components/Layout/Hero'
import Collection from '../Components/Products/Collection'
import NewArrival from '../Components/Products/NewArrival'
import ProductDetalis from '../Components/Products/ProductDetalis'
import ProductGrid from '../Components/Products/ProductGrid'
import FeatureCollection from '../Components/Products/FeatureCollection'
import FeaturesSection from '../Components/Products/FeaturesSection'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { fetchProductDetails, fetchProductsByFilters } from '../Redux/slice/productSlie'
import axios from 'axios'

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  //console.log(products);
  const [bestSellerProduct, SetBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      gender: "Women",
      limit: 8,
    }));

    // Fetch Best seller Products
    const fetchBestSeller = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        SetBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <Collection />
      <NewArrival />

      {/* Best Seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
      </h2>
      {bestSellerProduct ? (
        <ProductDetalis productId={bestSellerProduct._id} />
      ) : (
        <p className='text-center'> Loading Best Seller Product ... </p>
      )}

      {/* Top Women Wear */}
      <div className="container mx-auto mt-14">
        <h2 className='text-2xl text-center font-medium mb-4'> Top Women Wear </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      {/* Featured Collection Section */}
      <FeatureCollection />

      <FeaturesSection />
    </div>
  );
}

export default Home;
