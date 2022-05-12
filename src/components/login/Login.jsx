import { Box, TextField , Typography, Button} from '@mui/material'
import { useFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authAction from '../../actions/authAction';
import styles from './login.module.css';

const Login = (props) => {
    const { loginUser, auth } = props;
    const { userCreated } = auth;
    const navigate = useNavigate();
    console.log(userCreated);
    const formik = useFormik({
        initialValues: {
            password: userCreated?.password ?? '',
            fullName: userCreated?.firstName && userCreated?.lastName 
            ? `${userCreated?.firstName} ${userCreated?.lastName}`: '',
        },
        onSubmit: (values) => {
            const errors = {};
            if(!values.password) {
                errors.password = 'Required';
            } 
            if(
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i.test(values.password)
            ) {
                errors.password = `required, 8 < length < 16, one uppercase, one lowercase and must have at
                least one number and one special character`;
            }
            if(!values.fullName) {
                errors.fullName = 'Full Name Required';
            }
            if(Object.keys(errors).length > 0) {
                alert(JSON.stringify(errors, null, 2));
                alert(JSON.stringify(values, null, 2));
            }
            if(Object.keys(errors).length === 0) {
                const fullNameArr = values.fullName.split(" ");
                console.log(fullNameArr)
                if(fullNameArr[0] === userCreated?.firstName 
                    && fullNameArr[1] === userCreated?.lastName
                    && values.password === userCreated?.password) {
                        loginUser(values.password, values.fullName);
                        navigate('/products');
                    } else {
                        alert("Invalid credentials");
                    }
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
        >
            <Box className={styles.loginBox}>
                <Typography style={{ fontSize: "22px", fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                    Login
                </Typography>
                <TextField
                required
                label="Full Name"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                />
                <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                />
                <Box style={{ marginTop: '10px'}}>
                    <Button variant="contained" style={{ marginRight: "16px" }} type="submit" className={styles.btn}>Login</Button>
                    <Button variant="outlined" className={styles.btn} onClick={() => navigate('/signup')}>Signup</Button>
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
    loginUser: (fullName, password) => { dispatch(authAction.loginUser(fullName, password)) },
    signupUser: (email, password, firstName, lastName) => { dispatch(authAction.signupUser(email, password, firstName, lastName))},
})

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
export default reduxWrapper(Login);