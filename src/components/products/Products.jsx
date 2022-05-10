import { Box, CircularProgress } from '@mui/material';
import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import productAction from '../../actions/productAction';
import ProductCard from '../productCard/ProductCard';

const Products = (props) => {
    const { getAllProducts, products } = props;
    const { productsList, isLoading } = products;

    useEffect(() => {
        getAllProducts();
    }, []);
    
    return (
        <Box>
            {
                isLoading && <CircularProgress style={{
                    position: 'relative',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, 50%)',
                }} />
            }
            <Box style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {
                    productsList.length > 0 && productsList.map((item) => {
                        return (
                            <ProductCard key={item.id} {...item} />
                        )
                    })
                }
            </Box>
        </Box>
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
export default reduxWrapper(Products);