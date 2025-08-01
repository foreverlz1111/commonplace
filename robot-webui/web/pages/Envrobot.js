import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import Button from "@mui/material/Button";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import {SmartToy} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";


function createData(id, collection_datetime, id_robot, sf6, humid, temp, noice, nh, so2) {
    return {
        id, collection_datetime, id_robot, sf6, humid, temp, noice, nh, so2
    };
}


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [{
    id: 'collection_datetime', numeric: false, disablePadding: true, label: '记录日期',
}, {
    id: 'id_robot', numeric: true, disablePadding: false, label: 'id_robot',
}, {
    id: 'sf6', numeric: true, disablePadding: false, label: '六氟化硫 (ppm)',
}, {
    id: 'humid', numeric: true, disablePadding: false, label: '湿度 (%)',
}, {
    id: 'temp', numeric: true, disablePadding: false, label: '温度 (℃)',
}, {
    id: 'noice', numeric: true, disablePadding: false, label: '噪音 (db)',
}, {
    id: 'nh', numeric: true, disablePadding: false, label: '氨气 (ppm)',
}, {
    id: 'so2', numeric: true, disablePadding: false, label: '二氧化硫 (ppm)',
},];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (<TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                        'aria-label': '全选',
                    }}
                />
            </TableCell>
            {headCells.map((headCell) => (<TableCell
                key={headCell.id}
                align={headCell.numeric ? 'left' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (<Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>) : null}
                </TableSortLabel>
            </TableCell>))}
        </TableRow>
    </TableHead>);
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const {numSelected} = props;

    return (<Toolbar
        sx={{
            pl: {sm: 2}, pr: {xs: 1, sm: 1}, ...(numSelected > 0 && {
                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
    >
        {numSelected > 0 ? (<Typography
            sx={{flex: '1 1 100%'}}
            color="inherit"
            variant="subtitle1"
            component="div"
        >
            {numSelected} 列已选择
        </Typography>) : (<Typography
            sx={{flex: '1 1 100%'}}
            variant="h6"
            id="tableTitle"
            component="div"
        >

        </Typography>)}

        {numSelected > 0 ? (// <Tooltip title="Delete">
            //     <IconButton>
            //         <DeleteIcon />
            //     </IconButton>
            // </Tooltip>
            <></>) : (<Tooltip title="Filter list">
            <IconButton>
                <FilterListIcon/>
            </IconButton>
        </Tooltip>)}
    </Toolbar>);
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
export default function Envrobot({}) {
    const [rows, setRows] = useState([])

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id_robot');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(() => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,), [order, orderBy, page, rowsPerPage, rows],);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handlemenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const extractValidData = (data) => {
        return {
            id: data.ID,
            collection_datetime: data.CollectionDatetime,
            id_robot: data.IDRobot,
            sf6: data.CollectionSf6.Valid ? data.CollectionSf6.Float64 : "N/A",
            humid: data.CollectionHumidity.Valid ? data.CollectionHumidity.Float64 : "N/A",
            temp: data.CollectionTemperature.Valid ? data.CollectionTemperature.Float64 : "N/A",
            noice: data.CollectionNoise.Valid ? data.CollectionNoise.Float64 : "N/A",
            nh: data.CollectionNh.Valid ? data.CollectionNh.Float64 : "N/A",
            so2: data.CollectionSo2.Valid ? data.CollectionSo2.Float64 : "N/A",
        };
    }
    const getMyRobotSensorEnv = async (id_account) => {
        try {
            const response = await fetch(`/api/myrobotsensor?id_account=${id_account}`, {
                method: 'GET',
                headers: {
                    contentType: "application/json",
                }
            })
            if (response.status === 200) {
                const data = await response.json();
                // console.log('获取我的机器人传感器信息成功:', data);
                const processedRows = data.map(item => {
                    const processedData = extractValidData(item);
                    return createData(
                        processedData.id,
                        processedData.collection_datetime,
                        processedData.id_robot,
                        processedData.sf6,
                        processedData.humid,
                        processedData.temp,
                        processedData.noice,
                        processedData.nh,
                        processedData.so2,
                    );
                });
                setRows(processedRows);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        try {
            const storedAccount = JSON.parse(sessionStorage.getItem('loginAccount'));
            if (storedAccount) {
                getMyRobotSensorEnv(storedAccount.IDAccount);
            } else {
                console.log('No login account found in sessionStorage.');
            }
        } catch (error) {
            console.error('Error reading loginAccount from sessionStorage:', error);
        }
    }, []);
    return (<Box
        component="main"
        sx={{
            backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
    >
        <Toolbar/>
        <Box
            sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row', // 确保项目在同一行
                ml: 4, mt: 2
            }}
        >

        </Box>
        <Paper
            sx={{
                m: 4, mt: 0, p: 0, display: 'flex', flexDirection: 'row',

            }}
        >
            {/*表格*/}
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <TableContainer>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'left',
                                flexDirection: 'row',
                                ml: 2,
                                mt: 1
                            }}>
                            <Typography sx={{ml: 2}} variant="outlined">选择日期：</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Uncontrolled picker" value={dayjs().subtract(1, 'day')}/>
                                <Typography sx={{ml: 1, mr: 1}}>-</Typography>
                                <DatePicker label="Uncontrolled picker" value={dayjs()}/>
                            </LocalizationProvider>
                            <Box sx={{ml: 2, display: 'flex', alignItems: 'flex-end'}}>
                                <SmartToy sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                <TextField id="input-with-sx" label="id_robot 输入" variant="standard"/>
                            </Box>
                            <Button sx={{ml: 2}} variant="contained">查询</Button>
                        </Box>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            {rows.length === 0 ? <CircularProgress sx={{ml: 2}} size={20}/> : (
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (<TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.collection_datetime}
                                            </TableCell>
                                            <TableCell align="left">{row.id_robot}</TableCell>
                                            <TableCell align="left">{row.sf6}</TableCell>
                                            <TableCell align="left">{row.humid}</TableCell>
                                            <TableCell align="left">{row.temp}</TableCell>
                                            <TableCell align="left">{row.noice}</TableCell>
                                            <TableCell align="left">{row.nh}</TableCell>
                                            <TableCell align="left">{row.so2}</TableCell>
                                        </TableRow>);
                                    })}
                                    {emptyRows > 0 && (<TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>)}
                                </TableBody>)}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={"每页显示列数"}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="紧凑视图"
                />
            </Box>
        </Paper>
    </Box>)
}