import * as React from 'react';
import {styled} from "@mui/material/styles";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {ListItemIcon, Menu, MenuItem, Box, ListItemText, Typography} from "@mui/material";
import PropTypes from "prop-types";

import IconByName from "@components/icons/IconByName";
import DeleteForYouMessageConfirm from "../../../confirms/DeleteForYouMessageConfirm";
import DeleteForAllMessageConfirm from "../../../confirms/DeleteForAllMessageConfirm";

const More = ({toggleModal, message}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteForYou = () => {
    toggleModal(<DeleteForYouMessageConfirm toggleModal={toggleModal}/>, true);
    handleClose();
  }

  const deleteForAll = () => {
    toggleModal(<DeleteForAllMessageConfirm toggleModal={toggleModal}/>, true);
    handleClose();
  }

  return (
    <Box>
      <Box
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <CustomIconButton
          color='greyAccent'
          name='MoreHorizOutlined'
          title='More'
          size='small'
          iconSize='small'/>
      </Box>
      <MenuWrapper
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={deleteForYou}>
          <ListItemIcon>
            <IconByName iconStyle={{color: 'red'}} iconName='DeleteOutlined'/>
          </ListItemIcon>
          <ListItemText>
            <Typography color='red' variant='body1'>Delete for you</Typography>
          </ListItemText>
        </MenuItem>
        {
          message?.isMessageOwner &&
          <MenuItem onClick={deleteForAll}>
            <ListItemIcon>
              <IconByName iconStyle={{color: 'red'}} iconName='DeleteOutlined'/>
            </ListItemIcon>
            <ListItemText>
              <Typography color='red' variant='body1'>Delete for all</Typography>
            </ListItemText>
          </MenuItem>
        }
        <MenuItem>
          <ListItemIcon>
            <IconByName iconName='ContentCopy'/>
          </ListItemIcon>
          <ListItemText>
            <Typography variant='body1'>Copy text</Typography>
          </ListItemText>
        </MenuItem>
      </MenuWrapper>
    </Box>
  );
}

const MenuWrapper = styled(Menu)(({theme}) => ({
  '& .MuiPaper-root': {
    boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important',
    borderRadius: '12px !important',

    '& .MuiList-root': {
      padding: 0,

      '& .MuiButtonBase-root': {
        padding: '11px 15px',
        borderBottom: '1px solid rgb(239, 243, 244)',

        '& .MuiTouchRipple-root': {
          display: 'none'
        },
      }
    }
  },
}));

More.propTypes = {
  toggleModal: PropTypes.func,
  message: PropTypes.object,
}

export default More;
