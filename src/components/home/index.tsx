import { FC, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { data } from 'src/data/dummy-report';
import { alertType, useProfileContext } from 'src/providers/profile';

type Record = {
    bs?: string,
    bp?: string,
    month: string,
}

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column'
}));

const MessageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'center',
    '.MuiTypography-root': {
        fontSize: '2em',
        [theme.breakpoints.up('sm')]: {
            fontSize: '3em',
        }
    },
    [theme.breakpoints.down('sm')]: {
        padding: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        justifyContent: 'flex-start',
    }
}));

const DetailBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row'
    },
    '.MuiBox-root': {
        width: '100%',
        padding: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            padding: 0,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        }
    }
}));

const initialValues: Record = {
    bs: '',
    bp: '',
    month: new Date().toLocaleString('en-US', { month: 'short' })
};

const validationSchema = yup.object({
    bs: yup.number().required('Required!').min(0),
    bp: yup.number().required('Required!').min(0)
});

const HomeComponent: FC<unknown> = () => {
    const [records, setRecords] = useState(data);
    const { name, setAlertState } = useProfileContext();
    const formik = useFormik<Record>({
        initialValues,
        onSubmit: (values: Record) => {
            const newRecords = records.map(record => {
                if (record.month === values.month) {
                    return {
                        bs: +values.bs!,
                        bp: +values.bp!,
                        month: values.month,
                    }
                };
                return record;
            });
            setRecords(newRecords);
            setAlertState(`Successfully updated record for month ${values.month}`, alertType.SUCCESS);
        },
        validationSchema,
    });

    return (
        <MainBox>
            <MessageBox>
                <Typography sx={{ color: "#673ab7" }}>
                    Hello, { name?.toLocaleUpperCase() }. Your current status: Healthy
                </Typography>
            </MessageBox>
            <DetailBox>
                <Box>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <Typography variant="h4">
                                Questionnaires
                            </Typography>
                            <TextField
                                label="Q1. Blood Sugar count?"
                                {...formik.getFieldProps("bs")}
                                helperText={formik.touched.bs && formik.errors.bs}
                                error={formik.touched.bs && formik.errors.bs ? true : false}
                            />
                            <TextField
                                label="Q2. Blood Pressure count?"
                                {...formik.getFieldProps("bp")}
                                helperText={formik.touched.bp && formik.errors.bp}
                                error={formik.touched.bp && formik.errors.bp ? true : false}
                            />
                            <Select 
                                label="Month"
                                {...formik.getFieldProps("month")}
                            >
                                <MenuItem value="Jan">January</MenuItem>
                                <MenuItem value="Feb">Feburuary</MenuItem>
                                <MenuItem value="Mar">March</MenuItem>
                                <MenuItem value="Apr">April</MenuItem>
                                <MenuItem value="May">May</MenuItem>
                                <MenuItem value="Jun">June</MenuItem>
                                <MenuItem value="Jul">July</MenuItem>
                                <MenuItem value="Aug">August</MenuItem>
                                <MenuItem value="Sep">September</MenuItem>
                                <MenuItem value="Oct">October</MenuItem>
                                <MenuItem value="Nov">November</MenuItem>
                                <MenuItem value="Dec">December</MenuItem>
                            </Select>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                            >
                                submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
                <Box>
                    <Typography variant="h4" sx={{ padding: { sm: "0 0 0 1.5em" } }}>
                        Report Chart
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={records} margin={{ top: 16 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="bs" fill="#f44336" />
                            <Bar dataKey="bp" fill="#ff9100" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </DetailBox>
        </MainBox>
    );
};

export default HomeComponent;