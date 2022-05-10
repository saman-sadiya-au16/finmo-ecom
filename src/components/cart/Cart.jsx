import { Box, Divider, IconButton, MenuItem, Typography } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';
import productAction from '../../actions/productAction';
import styles from './cart.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = (props) => {
    const { products, removeProductFromCart, increaseQty, decreaseQty } = props;
    const { cart } = products;

    const handleRemove = (item) => {
        removeProductFromCart(item);
    }

    const handleIncrease = (item) => {
        increaseQty(item);
    }

    const handleDecrease = (item) => {
        decreaseQty(item);
    }

    const grandTotal = (arr) => {
        return arr.reduce((sum, {itemTotalPrice}) => {
          return sum + itemTotalPrice;
        }, 0)
    };

    return (
    <Box>
        <Typography style={{ fontSize: '30px', fontWeight: 'bolder', marginLeft: '80px'}}>
            Cart
        </Typography>
        <Box className={styles.cartListContainer}>
            {
                cart.length === 0 && (
                    <Typography gutterBottom variant="h5" component="div">
                        Cart Empty, Please Add products to view here
                    </Typography>
                )
            }
            {
                cart.length > 0 && cart.map(({title, qty, id, price, image, itemTotalPrice}) => {
                    return (
                        <Box className={styles.cartCard} key={id}>
                            <img src={image} width="50px" height="50px" />
                            <Typography gutterBottom variant="h5" component="div" style={{ width: '300px' }}>
                                {title ?? ''}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ fontSize: '22px', color: 'blue', fontWeight: 'bold', width: '100px' }}>
                                ₹ {price ?? ''}
                            </Typography>
                            <Box className={styles.cartBtnAction}>
                                <MenuItem>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => handleDecrease({title, qty, id, price, image, itemTotalPrice})}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                </MenuItem>
                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '22px', color: 'blue', fontWeight: 'bold' }}>
                                    {qty ?? ''}
                                </Typography>
                                <MenuItem onClick={() => handleIncrease({title, qty, id, price, image, itemTotalPrice})}>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </MenuItem>
                            </Box>
                            <Typography variant="body2" color="text.secondary" style={{ fontSize: '22px', color: 'blue', fontWeight: 'bold', width: '100px' }}>
                                ₹ {itemTotalPrice ?? ''}
                            </Typography>
                            <MenuItem onClick={() => handleRemove({title, qty, id, price, image, itemTotalPrice})}>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                            </MenuItem>
                        </Box>
                    )
                })
            }
        </Box>
        <Divider />
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '120px', paddingRight: '120px', paddingTop: '20px' }}>
            <Typography style={{ fontSize: '22px', color: 'blue', fontWeight: 'bold', }}>Total Price</Typography>
            {
                cart.length > 0 && (
                    <Typography style={{ fontSize: '22px', color: 'blue', fontWeight: 'bold' }}>₹ {grandTotal(cart).toFixed(2)}</Typography>
                )
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
    setProductDetails: (item) => { dispatch(productAction.setProductDetails(item))},
    removeProductFromCart: (item) => { dispatch(productAction.removeProductFromCart(item))},
    increaseQty: (item) => { dispatch(productAction.increaseCartQty(item))},
    decreaseQty: (item) => { dispatch(productAction.decreaseCartQty(item))},
})

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);

export default reduxWrapper(Cart);