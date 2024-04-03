import React, { useEffect, useState } from 'react'; // Added import for useState
import './_products.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Product/actions';
import { addCartItem } from '../../Redux/Cart/cartSlice';
import { Link } from 'react-router-dom';

const Products = () => {
  const [sortedProducts, setSortedProducts] = useState([]); // Added useState for sorting
  const productData = useSelector(state => state.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setSortedProducts([...productData]); // Update sortedProducts when productData changes
  }, [productData]);

  const addToCart = product => {
    product = { ...product, quantity: 1 };
    dispatch(addCartItem(product));
  };

  // Sorting functions
  const sortByName = () => {
    const sortedByName = [...sortedProducts].sort((a, b) =>
      a.product_name.localeCompare(b.product_name)
    );
    setSortedProducts(sortedByName);
  };

  const sortByPrice = () => {
    const sortedByPrice = [...sortedProducts].sort((a, b) => a.price - b.price);
    setSortedProducts(sortedByPrice);
  };

  return (
    <div className='product-container'>
      <div className='sort-buttons'>
        <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByPrice}>Sort by Price</button>
      </div>
      <div> {/* Parent element wrapping mapped elements */}
        {sortedProducts.map((eachProduct, index) => (
          <div className='mx-5 p-3 product-card' key={index}>
            <Link to='/productdetails' state={{ product: eachProduct }}>
              <div className='product-image-container'>
                <img src={require(`../../assets/images/shop/${eachProduct.product_img}`)} alt={eachProduct.product_name} />
              </div>
            </Link>
            <div className='product-info'>
              <h5>
                <Link to='/productdetails' state={{ product: eachProduct }}>
                  {eachProduct.product_name}
                </Link>
              </h5>
              <p className='product-price'>${eachProduct.price}</p>
              <div className='product-rating'>
                {/* Your rating icons here */}
              </div>
              <div className='my-3' onClick={() => addToCart(eachProduct)}>
                <div className='cart-button'>
                  <div className='cart-icon-container'>
                    {/* Your cart icon here */}
                  </div>
                  <div className='cart-text-container mx-3'>
                    <p>Add to Cart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default Products;
