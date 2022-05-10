import { Box, TextField , Typography, Button} from '@mui/material'
import { Formik, useFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authAction from '../../actions/authAction';
import styles from './signup.module.css';

const Signup = (props) => {
    const { signupUser } = props;
    const navigate = useNavigate();
    const formik = useFormik({
    initialValues: {
        email: 'foobar@example.com',
        password: '',
        firstName: '',
        lastName: '',
    },
    onSubmit: (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } 
        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        } 
        if(!values.password) {
            errors.password = 'Required';
        } 
        if(
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i.test(values.password)
        ) {
            errors.password = `required, 8 < length < 16, one uppercase, one lowercase and must have at
            least one number and one special character`;
        }
        if(!values.firstName) {
            errors.firstName = 'First Name Required';
        }
        if(!values.lastName) {
            errors.lastName = 'last Name Required';
        
        }
        if(Object.keys(errors).length > 0) {
            alert(JSON.stringify(errors, null, 2));
            alert(JSON.stringify(values, null, 2));
        }
        if(Object.keys(errors).length === 0) {
            signupUser(values.email, values.password, values.firstName, values.lastName);
            navigate('/');
        }
    },
    });

    return (
    <Box className={styles.parentBg}>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 2, width: '80%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        // style={{ position: 'relative'}}
        >
            <Box className={styles.loginBox}>
                <Typography style={{ fontSize: "22px", fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                    SignUp
                </Typography>
                <TextField
                required
                id="outlined-required"
                label="First Name"
                type="text"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                />
                <TextField
                required
                id="outlined-required"
                label="Last Name"
                type="text"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                />
                <TextField
                required
                id="outlined-required"
                label="Email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                />
                <TextField
                required
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                />
                <Box style={{ marginTop: '10px'}}>
                    <Button variant="contained" style={{ marginRight: "16px" }} type="submit" className={styles.btn}>Submit</Button>
                    <Button variant="outlined" className={styles.btn} onClick={() => navigate('/')}>Login</Button>
                </Box>
            </Box>
        </Box>
    </Box>
    )
    }
const mapStateToProps = (state) => {
    const { auth, error } = state;
    return {
        auth,
        error
    }
    };

const mapDispatchToProps = (dispatch) => ({
    // resetError: () => { dispatch(errorActions.resetError()); }
    signupUser: (email, password, firstName, lastName) => { dispatch(authAction.signupUser(email, password, firstName, lastName))},
})

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
export default reduxWrapper(Signup);