import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import productAction from '../../actions/productAction';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productExists } from '../../helper/util';

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    };

    const ProductCard = ({ image, title, description, price, category, id, setProductDetails, addProductToCart, products}) => {

    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        event.stopPropagation();
        const product = { image, title, description, price, category, id};
        console.log(product);
    //  Add to cart action
    addProductToCart(product);
    }

    const handleCardClick = () => {
    const product = { image, title, description, price, category, id};
    setProductDetails(product);
    navigate(`/products/${id}`);
    }
    return (
    <Card sx={{ maxWidth: 345, marginBottom: '20px', cursor: 'pointer' }} onClick={handleCardClick}>
        <CardMedia
        component="img"
        // height="150"
        image={image}
        alt="green iguana"
        style={{ width: '200px', height: '150px', objectFit: 'cover', marginLeft: 'auto', marginRight: 'auto'}}
        />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {truncate(title, 15)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {truncate(description, 60)}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ fontSize: '22px', color: 'blue', fontWeight: 'bold', marginTop: '10px' }}>
            ₹ {price}
        </Typography>
        </CardContent>
        <CardActions>
        <Button style={{ width: '150px', height: '40px'}} variant='contained' disabled={productExists(products.cart, id)}
        onClick={handleAddToCart}>Add To Cart</Button>


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

export default reduxWrapper(ProductCard);
