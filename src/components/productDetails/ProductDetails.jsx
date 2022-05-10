import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import productAction from '../../actions/productAction';
import { connect } from 'react-redux';
import { productExists } from '../../helper/util';

const ProductDetails = ({ image, title, description, price, category, id, products, addProductToCart}) => {

    const handleAddToCart = (event) => {
        event.stopPropagation();
        const product = { image, title, description, price, category, id};
        console.log(product);
        //  Add to cart action
        addProductToCart(product);
    }
    return (
    <Card style={{ width: '100%', marginBottom: '20px', height: '80vh', }}>
        <CardMedia
            component="img"
            height="350"
            image={image}
            alt="green iguana"
        />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ fontSize: 'large'}}>
            {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ fontSize: '22px', color: 'blue', fontWeight: 'bold', marginTop: '10px' }}>
            ₹ {price}
        </Typography>
    </CardContent>
    <CardActions>
        <Button style={{ width: '100%', height: '40px'}}
            disabled={productExists(products.cart, id)}
            variant='contained'
            onClick={handleAddToCart}
            >Add To Cart</Button>
    </CardActions>
    </Card>
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
    setProductDetails: (item) => { dispatch(productAction.setProductDetails(item)) },
    addProductToCart: (item) => { dispatch(productAction.addProductToCart(item)) },
})

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);

export default reduxWrapper(ProductDetails);