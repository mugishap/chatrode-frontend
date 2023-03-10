import React, { useContext, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { User } from '../../types';
import { TableFooter, TablePagination } from '@mui/material';
import TablePaginationActions from './TablePaginationActions'
import { format } from 'date-fns';
import { CommonContext } from '../../context';

const AdminUsersComponent = () => {

    const { users, user,me } = useContext(CommonContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='w-full px-8 overflow-y-scroll items-center flex flex-col pt-8'>
            <span className='font-bold my-8 text-xl'>
                Users in Chat Rode
            </span>
            <div className='w-full px-4'>
                <TableContainer className='' component={Paper}>
                    <Table sx={{ minWidth: 650 }} className="" aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-slate-400 font-bold font-lato'>
                                <TableCell>No</TableCell>
                                <TableCell>Profile</TableCell>
                                <TableCell align="right">Full Names</TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Joined</TableCell>
                                <TableCell align="right">Verification</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className=''>
                            {(rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                            ).map((user: User, index: number) => (
                                <TableRow
                                    key={user._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="user">
                                        {index + 1 + page}
                                    </TableCell>
                                    <TableCell align="right">
                                        <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                                    </TableCell>
                                    <TableCell align='right'>
                                        {user.fullname}
                                    </TableCell>
                                    <TableCell align="right">{user.username}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.role}</TableCell>
                                    <TableCell align="right">{format(parseInt(user.createdAt as string), 'do MMM Y')}</TableCell>
                                    <TableCell align="right">
                                        <span className={`rounded px-2 `}></span>
                                    </TableCell>
                                    <TableCell align="right"><button className='bg-red-500 font-bold px-6 py-2 rounded text-white'>{user._id === me._id ? "Settings" : "Delete"}</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className='bg-slate-400'>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={9}
                                    count={users.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    className="w-ful"
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AdminUsersComponent