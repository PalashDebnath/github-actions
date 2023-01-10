import React, { FC } from 'react';
import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const Box = styled(MuiBox)(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.error.main,
    '.MuiSvgIcon-root': {
        [theme.breakpoints.up('xs')]: {
            fontSize: '2em',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '4em',
        }
    },
    '.MuiTypography-root': {
        margin: '0 0.1em',
        [theme.breakpoints.up('xs')]: {
            fontSize: '2em',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '4em',
        }
    }
}));

const NotFoundComponent: FC<unknown> = () => {
    return (
        <Box>
            <ReportProblemIcon />
            <Typography>
                Page not found!
            </Typography>
        </Box>
    );
};

export default NotFoundComponent;