import React from 'react'
import { connect } from 'react-redux';
import productAction from '../actions/productAction';
import ProductDetails from '../components/productDetails/ProductDetails';
import Base from '../components/shared/Base';

const ProductDetailsPage = (props) => {
  const { products } =  props;
//   const { productDetails } = products;
  return (
    <Base>
        <ProductDetails {...products.productDetails} />
    </Base>
  )
}

const mapStateToProps = (state) => {
    const { auth, error, products } = state;
    return {
        auth,
        error,
        products,
    }
    };

const mapDispatchToProps = (dispatch) => ({
    getAllProducts: () => { dispatch(productAction.getProducts()) },
})

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);

export default reduxWrapper(ProductDetailsPage);