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
import {Refresh, SmartToy} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {NextResponse as response} from "next/server";
import {CircularProgress} from "@mui/material";
import {useRef} from 'react';

function createData(id, collection_datetime, id_robot, collection_imu, collection_lidar_2d, collection_lidar_3d, collection_rgb, collection_thermal, collection_depth) {
    return {
        id,
        collection_datetime,
        id_robot,
        collection_imu,
        collection_lidar_2d,
        collection_lidar_3d,
        collection_rgb,
        collection_thermal,
        collection_depth
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
    id: 'imu', numeric: true, disablePadding: false, label: 'IMU',
}, {
    id: 'lidar2d', numeric: true, disablePadding: false, label: '激光雷达2D',
}, {
    id: 'lidar3d', numeric: true, disablePadding: false, label: '激光雷达3D',
}, {
    id: 'rgb', numeric: true, disablePadding: false, label: '可见光图像',
}, {
    id: 'thermal', numeric: true, disablePadding: false, label: '热红外图像',
}, {
    id: 'depth', numeric: true, disablePadding: false, label: '深度图像',
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
export default function Mysensor({}) {
    const [rows, setRows] = React.useState([]);

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('collection_datetime');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [beginDate, setBeginDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searching, setSearching] = useState(false);

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
            collection_imu: data.CollectionIMU.Valid ? data.CollectionIMU.String : "N/A",
            collection_lidar_2d: data.CollectionLidar2D.Valid ? data.CollectionLidar2D.String : "N/A",
            collection_lidar_3d: data.CollectionLidar3D.Valid ? data.CollectionLidar3D.String : "N/A",
            collection_rgb: data.CollectionRGB.Valid ? data.CollectionRGB.String : "N/A",
            collection_thermal: data.CollectionThermal.Valid ? data.CollectionThermal.String : "N/A",
            collection_depth: data.CollectionDepth.Valid ? data.CollectionDepth.String : "N/A"
        };
    }
    const searchSensorByDate = async () => {
        // console.log('起始日:', beginDate ? beginDate.format('YYYY-MM-DD') : '未选择');
        // console.log('结束日:', endDate ? endDate.format('YYYY-MM-DD') : '未选择');
        const formattedBeginDate = beginDate ? beginDate.format('YYYY-MM-DD') : null;
        const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : null;

        if (formattedBeginDate && formattedEndDate) {
            var id_account = JSON.parse(sessionStorage.getItem('loginAccount')).IDAccount
            setSearching(true)
            try {
                const response = await fetch(`/api/myrobotsensorbydate?id_account=${id_account}&begin_date=${formattedBeginDate}&end_date=${formattedEndDate}`, {
                    method: 'GET',
                    headers: {
                        contentType: "application/json",
                    }
                })

                if (response.status === 200) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        console.log('根据日期 获取我的机器人传感器信息成功:', data);
                        const processedRows = data.map(item => {
                            const processedData = extractValidData(item);
                            return createData(
                                processedData.id,
                                processedData.collection_datetime,
                                processedData.id_robot,
                                processedData.collection_imu,
                                processedData.collection_lidar_2d,
                                processedData.collection_lidar_3d,
                                processedData.collection_rgb,
                                processedData.collection_thermal,
                                processedData.collection_depth,
                            );
                        });
                        setRows(processedRows);
                    } else {
                        setRows([]);
                        console.log('data 不存在');
                    }
                }
                setSearching(false)
            } catch (error) {
                console.error(error);
            }
        }


    }
    const getMyRobotSensor = async (id_account) => {
        setSearching(true)
        try {
            const response = await fetch(`/api/myrobotsensor?id_account=${id_account}`, {
                method: 'GET',
                headers: {
                    contentType: "application/json",
                }
            })
            if (response.status === 200) {
                const data = await response.json();
                console.log('获取我的机器人传感器信息成功:', data);
                if (Array.isArray(data)) {
                    const processedRows = data.map(item => {
                        const processedData = extractValidData(item);
                        return createData(
                            processedData.id,
                            processedData.collection_datetime,
                            processedData.id_robot,
                            processedData.collection_imu,
                            processedData.collection_lidar_2d,
                            processedData.collection_lidar_3d,
                            processedData.collection_rgb,
                            processedData.collection_thermal,
                            processedData.collection_depth,
                        );
                    });
                    setRows(processedRows);
                } else {
                    console.log('data 不存在');
                }
            }
            setSearching(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        try {
            const storedAccount = JSON.parse(sessionStorage.getItem('loginAccount'));
            if (storedAccount) {
                getMyRobotSensor(storedAccount.IDAccount);
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
                                {/*<DatePicker label="起始日" value={dayjs().subtract(1, 'day')}/>*/}
                                <DatePicker label="选择起始日" name="begin_date" value={beginDate}
                                            onChange={(newValue) => setBeginDate(newValue)}/>
                                <Typography sx={{ml: 1, mr: 1}}>-</Typography>

                                {/*<DatePicker label="结束日" value={dayjs()}/>*/}
                                <DatePicker label="选择结束日" name="end_date" value={endDate}
                                            onChange={(newValue) => setEndDate(newValue)}/>
                            </LocalizationProvider>

                            {/*id_robot搜索*/}
                            {/*<Box sx={{ml: 2, display: 'flex', alignItems: 'flex-end'}}>*/}
                            {/*<SmartToy sx={{color: 'action.active', mr: 1, my: 0.5}}/>*/}
                            {/*<TextField id="input-with-sx" label="id_robot 输入" variant="standard"/>*/}
                            {/*</Box>*/}

                            <Button sx={{ml: 2}} onClick={searchSensorByDate} variant="contained">查询</Button>
                            <IconButton aria-label="Refresh" size="large" onClick={() => {
                                getMyRobotSensor(JSON.parse(sessionStorage.getItem('loginAccount')).IDAccount);
                            }}>
                                <Refresh/>
                            </IconButton>
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
                            {rows.length === 0 && searching ? <CircularProgress sx={{ml: 2}} size={20}/> : (
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
                                            <TableCell sx={{color: row.collection_imu !== "N/A" ? "black" : "red"}}
                                                       align="left">{row.collection_imu}</TableCell>
                                            <TableCell
                                                sx={{color: row.collection_lidar_2d !== "N/A" ? "black" : "red"}}
                                                align="left">{row.collection_lidar_2d}</TableCell>
                                            <TableCell
                                                sx={{color: row.collection_lidar_3d !== "N/A" ? "black" : "red"}}
                                                align="left">{row.collection_lidar_3d}</TableCell>
                                            <TableCell sx={{color: row.collection_rgb !== "N/A" ? "black" : "red"}}
                                                       align="left">{row.collection_rgb}</TableCell>
                                            <TableCell
                                                sx={{color: row.collection_thermal !== "N/A" ? "black" : "red"}}
                                                align="left">{row.collection_thermal}</TableCell>
                                            <TableCell sx={{color: row.collection_depth !== "N/A" ? "black" : "red"}}
                                                       align="left">{row.collection_depth}</TableCell>
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
                    sx={{ml: 1}}
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="紧凑视图"
                />
            </Box>
        </Paper>
    </Box>)
}