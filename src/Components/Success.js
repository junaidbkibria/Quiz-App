import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function Success({ open, message, setOpen }) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical:'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }} variant='filled'>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}