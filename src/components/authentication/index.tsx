import * as yup from 'yup';
import React, { FC } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { alertType, useProfileContext } from 'src/providers/profile';

type User = {
    uName?: string,
    uPassword?: string,
}

const MainBox = styled(Box)(({ theme }) => ({
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
        width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '50%'
    }
}));

const initialValues: User = {
    uName: '',
    uPassword: ''
};

const validationSchema = yup.object({
    uName: yup.string().trim().required('Required!'),
    uPassword: yup.string().trim().required('Required!')
});

const AuthComponent: FC<unknown> = () => {
    const navigate = useNavigate();
    const { signIn, setAlertState } = useProfileContext();
    const formik = useFormik<User>({
        initialValues,
        onSubmit: (values: User) => {
            const message = signIn(values.uName!, values.uPassword!);
            if (message) {
                setAlertState(message, alertType.ERROR);
                return;
            };
            navigate('/home');
        },
        validationSchema
    });

    return (
        <MainBox>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <Typography variant="h4">
                        Login
                    </Typography>
                    <TextField
                        label="User Name"
                        {...formik.getFieldProps("uName")}
                        helperText={formik.touched.uName && formik.errors.uName}
                        error={formik.touched.uName && formik.errors.uName ? true : false}
                    />
                    <TextField
                        label="Password"
                        {...formik.getFieldProps("uPassword")}
                        helperText={formik.touched.uPassword && formik.errors.uPassword}
                        error={formik.touched.uPassword && formik.errors.uPassword ? true : false}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        sign in
                    </Button>
                </Stack>
            </form>
        </MainBox>
    );
};

export default AuthComponent;
