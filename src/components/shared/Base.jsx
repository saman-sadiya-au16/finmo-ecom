import { Box } from '@mui/system';
import React from 'react';
import Header from './Header';


const Base = ({ children, isHeaderRequired = true }) => {
  return (
    <Box>
        {/* Navbar Container Start*/}
        <Box>
        {/* Navbar Header */}
        {
            isHeaderRequired && <Header />
        }
        </Box>
        {/* Navbar Container End */}
        {/* Main Component Start */}
        <Box style={{ padding: isHeaderRequired ? '30px': '0px'}}>
            {children}
        </Box>
        {/* Main Component End */}
    </Box>
  )
}

export default Base