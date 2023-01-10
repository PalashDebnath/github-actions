import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = styled('div')(({theme}) => ({
  display: 'flex',
  padding: '0 2em',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.up('xs')]: {
    minHeight: '48px',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '64px',
  }
}));

const FooterComponent = () => {
  return (
    <Footer>
      <CopyrightIcon />
      <Typography sx={{margin: '0 auto 0 0'}}>
        {(new Date().getFullYear())}
        {' '}
        Coder
      </Typography>
      <Typography>
        Privacy
      </Typography>
    </Footer>
  );
};

export default FooterComponent;
