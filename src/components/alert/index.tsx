import React, { FC } from 'react';
import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

import { useProfileContext } from 'src/providers/profile';

const Alert = styled(MuiAlert)(() => ({
  padding: '0 2em',
  borderRadius: '0.5em',
  alignItems: 'center',
  border: '1px solid transparent',
}));

const Box = styled(MuiBox)(() => ({
  bottom: '6em',
  width: '100vw',
  display: 'flex',
  position: 'absolute',
  justifyContent: 'center',
}));

let timer: NodeJS.Timeout;
const AlertComponent: FC<unknown> = () => {
  const { alertMessage, alertType, setAlertState, showAlert } = useProfileContext();

  const handleClose = () => {
    setAlertState();
    clearTimeout(timer);
  }

  if(showAlert) {
    timer = setTimeout(() => handleClose(), 2000);
  }

  return (
    <Box>
      <Collapse in={showAlert}>
        {showAlert &&
          <Alert
            variant="standard"
            severity={alertType as AlertColor}
            onClose={() => setAlertState()}
          >
            <Typography>
              {`${alertType?.toUpperCase()}: ${alertMessage}`}
            </Typography>
          </Alert>
        }
      </Collapse>
    </Box>
  );
};

export default AlertComponent;
