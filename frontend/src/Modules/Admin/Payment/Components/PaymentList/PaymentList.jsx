import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useLocation } from 'react-router-dom';
import paymentService1 from '../../Shared/PaymentService'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeletePayment from '../DeletePayment/DeletePayment'

const columns = [
  { id: 'id', label: 'Id', minWidth: 80 },
  { id: 'paymentMethod', label: 'Payment Method', minWidth: 170 },
  { id: 'booking', label: 'Booking', minWidth: 100 },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 150,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit', label: 'Edit', minWidth: 80,
    align: 'left',
  }

];

function createData(id, paymentMethod, booking, amount, status, edit) {
  return { id, paymentMethod, booking, amount, status, edit };
}

const rows = [
  createData('1', 'Vietnam Airline', 'VN', 'Viet Nam', 'Bong sen vang',),
  createData('2', 'Bamboo Airways', 'QH', 'Viet Nam', 'Cay tre',),
  createData('3', 'Vietravel Airlines', 'VU', 'Viet Nam', 'Viettravel')
];

export default function PaymentList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [paymentList, setPaymentList] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getPaymentList();
    getMsg();
  }, []);

  const getPaymentList = async () => {
    await paymentService1
      .getPaymentList()
      .then((res) => {
        setPaymentList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let location = useLocation();

  const getMsg = () => {
    if (typeof location.state !== 'undefined') {
      let isHasMessage = false;
      Object.keys(location.state).forEach(key => {
        if (key === 'message') isHasMessage = true;
      });
      if (isHasMessage) {
        setMsg(location.state.message);
      }
    }
  }
  const onDeletePayment = async (payment) => {
    await  paymentService1.deletePayment(payment.Id)
    .then((res) => {
        console.log('success', res.data);
        //Handle when success
        getPaymentList();
        setMsg({
          type: 'success',
          content: `Delete Payment  ${payment.Name} successful !`
        });
       
    })
    .catch((err) => {
        console.log(err);
        //Handle when catching error
        setMsg({
          type: 'error',
          content: `Delete Payment ${payment.Name} failed !`
        });
    })
  }

  return (
    <>
      <div id='payment'>
        <Paper sx={{ width: '100%' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Payment
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            {
              msg !== '' ? <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={msg.type}>{msg.content}</Alert>
              </Stack> : ''
            }

            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                  </TableCell>
                  <TableCell align="right" colSpan={3}>
                    <Link to={"/admin/payment/create"}>
                      <Button variant="contained" startIcon={< AddCircleIcon />}>
                        Add New
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={payment.Id}>
                        <TableCell>
                          {payment.Id}
                        </TableCell>
                        <TableCell>
                          {payment.PaymentMethod}
                        </TableCell>
                        <TableCell>
                          {payment.Booking.BookingCode}
                        </TableCell>
                        <TableCell>
                          {payment.Amount}
                        </TableCell>
                        <TableCell>
                          {payment.Status}
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/payment/${payment.Id}`}>
                            <IconButton aria-label="edit-icon">
                              <EditIcon />
                            </IconButton>
                          </Link>
                          <DeletePayment payment={payment} onDeletePayment={onDeletePayment}/>
                        </TableCell>


                      </TableRow>

                    );
                  })}
              </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>

  );
}