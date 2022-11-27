import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {Header, MainContainer, CustomFabButton} from './';

const Index = () => {
  const width = useSelector(state => state.service.appBarWidth)

  return (
    <BoxWrapper>
      <Box className='root'>
        <Header className='header'>
          <Box sx={{width: `${width}px`}}/>
        </Header>
        <Box className='main'>
          <MainContainer className='container'>
            <Box className='title'>
              <Typography className='titleMain' variant='h2'>Don’t miss what’s happening</Typography>
              <Typography className='titleSecondary'>People on Twitter are the first to know.</Typography>
            </Box>
            <Box className='actions'>
              <Box className='LogIn'>
                <CustomFabButton name='Log in'/>
              </Box>
              <Box className='SingUp'>
                <CustomFabButton name='Sing up'/>
              </Box>
            </Box>
          </MainContainer>
        </Box>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  width: '100%',
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  left: 0,
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',

  '& .root': {
    width: '100%',
    display: 'flex',
    margin: '11px 0',

    '& .header': {
      display: 'none',

      [theme.breakpoints.up(720)]: {
        display: 'block',
      },
    },

    '& .main': {
      flexGrow: 1,

      [theme.breakpoints.up('sm')]: {
        flexGrow: 2,
      },

      [theme.breakpoints.up('md')]: {
        flexGrow: 1,
      }
    },

    '& .container': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',


      [theme.breakpoints.up(720)]: {
        justifyContent: 'space-between',
      },

      '& .title': {
        display: 'none',

        [theme.breakpoints.up(720)]: {
          display: 'block',
        },

        '& .titleMain': {
          fontSize: '1.5rem',
          fontWeight: 600,
        },

        '& .titleSecondary': {
          fontSize: '1rem',
        },
      },

      '& .actions': {
        display: 'flex',
        width: '95%',
        justifyContent: 'space-between',

        [theme.breakpoints.up(720)]: {
          width: '200px',
        },

        '& .CustomFabButton': {
          // backgroundColor: theme.palette.primary.main,
          width: '100%',
          height: 32,

          '& .CustomFabButtonName': {
            fontWeight: 600,
            fontSize: '1rem,',
          }
        },

        '& .LogIn, .SingUp': {
          width: '48%'
        },

        '& .LogIn': {
          '& .CustomFabButton': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: '1px solid rgba(255, 255, 255, 0.35)',

            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          },

          '& .CustomFabButtonName': {
            color: '#ffffff',
          }
        },

        '& .SingUp': {
          '& .CustomFabButton': {
            backgroundColor: 'rgb(239, 243, 244)',

            '&:hover': {
              backgroundColor: 'rgb(215, 219, 220)',
            }
          },
        },
      }
    }
  }
});

const BoxWrapper = styled(Box)(styles);

Index.propTypes = {
  width: PropTypes.number,
}
export default Index;
