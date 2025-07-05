import menCollection from "../../assets/mens-collection.webp"
import womenCollection from "../../assets/womens-collection.webp"
import { Link } from 'react-router-dom'

const Collection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            {/* Women Collection */}

            <div className='relative flex-1'>
                <img src={womenCollection} alt="Men's Collection"  className='w-full h-[700px] object-cover'/>

                <div className='absolute bg-white flex flex-col text-black bottom-2 left-10 px-4 py-2 gap-4'>
                    <h2 className='text-lg font-semibold'> Women's Collections </h2>
                    <Link to="/collections/all/?gender=Women" className="hover:text-gray-700 underline decoration-black"> Shop Now </Link>
                </div>
            </div>

            {/* Men collection */}
            <div className='relative flex-1'>
                <img src={menCollection} alt="Men's Collection"  className='w-full h-[700px] object-cover'/>

                <div className='absolute bg-white flex flex-col text-black bottom-2 left-10 px-4 py-2 gap-4'>
                    <h2 className='text-lg font-semibold'> Men's Collections </h2>
                    <Link to="/collections/all/?gender=Men" className="hover:text-gray-700 underline decoration-black"> Shop Now </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Collection