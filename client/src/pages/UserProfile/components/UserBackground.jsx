import React from 'react';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const UserBackground = ({imageUrl, styles, children}) => {
    return (
        <>
            <Box style={styles} sx={{
                width: "100%",
                height: "20%",
                backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
                bgcolor: "gray",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}>
                {children}
            </Box>
        </>
    );
};

UserBackground.propTypes = {
    imageUrl: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node,
}

export default UserBackground;