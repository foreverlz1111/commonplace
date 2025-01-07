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
import {Add, Delete, Edit} from "@mui/icons-material";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    MenuItem
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {log} from "next/dist/server/typescript/utils";

function createData(id_robot, owner_robot, born_robot, product_robot, price_robot, equip_equipment_robot, remark_robot) {
    return {
        id_robot, owner_robot, born_robot, product_robot, price_robot, equip_equipment_robot, remark_robot
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
    id: 'id_robot', numeric: false, disablePadding: true, label: 'id_robot',
}, {
    id: 'calories', numeric: true, disablePadding: false, label: '机器人所属',
}, {
    id: 'fat', numeric: true, disablePadding: false, label: '交付日期',
}, {
    id: 'carbs', numeric: true, disablePadding: false, label: '生产方',
}, {
    id: 'protein', numeric: true, disablePadding: false, label: '定价',
}, {
    id: 'equip', numeric: true, disablePadding: false, label: '外设',
}, {
    id: 'mod', numeric: true, disablePadding: false, label: '',
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
export default function Myrobot() {
    const [rows, setRows] = React.useState([]);
    const [AddButtonStatus, setAddButtonStatus] = React.useState(false);

    const handleAddButtonStatusOpen = () => {
        setAddButtonStatus(true);
    };

    const handleAddButtonStatusClose = () => {
        setAddButtonStatus(false);
    };

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

    const [loginAccount, setLoginAccount] = useState(null)
    const extractValidData = (data) => {
        return {
            id_robot: data.IDRobot,
            owner_robot: data.OwnerRobot.Valid ? data.OwnerRobot.String : "N/A",
            born_robot: data.BornRobot.Valid ? new Date(data.BornRobot.Time).toLocaleDateString() : "N/A",
            product_robot: data.ProductRobot.Valid ? data.ProductRobot.String : "N/A",
            price_robot: data.PriceRobot.Valid ? data.PriceRobot.Float64 : "N/A",
            equip_equipment_robot: data.EquipEquipmentRobot.Valid ? data.EquipEquipmentRobot.String : "N/A",
        };
    };
    const getMyRobot = async (loginAccount) => {
        try {
            const response = await fetch(`/api/myrobot/?id_account=${loginAccount}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('获取我的机器人信息成功:', data);
                const processedRows = data.map(item => {
                    const processedData = extractValidData(item);
                    return createData(
                        processedData.id_robot,
                        processedData.owner_robot,
                        processedData.born_robot,
                        processedData.product_robot,
                        processedData.price_robot,
                        processedData.equip_equipment_robot,
                    );
                });
                console.log("processedRows", processedRows)
                setRows(processedRows);

            } else {
                const errorData = await response.json();
                console.log('错误:', errorData);
            }
        } catch (error) {
            console.log('请求失败:', error);
        }
    }

    useEffect(() => {
        try {
            const storedAccount = JSON.parse(sessionStorage.getItem('loginAccount'));
            if (storedAccount) {
                getMyRobot(storedAccount.IDAccount);
            } else {
                console.log('No login account found in sessionStorage.');
            }
        } catch (error) {
            console.error('Error reading loginAccount from sessionStorage:', error);
        }
    }, []);

    useEffect(() => {
        console.log("Updated rows:", rows);
    }, [rows]);

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
            {/*<Box sx={{mb: 1}} name={"table_modify"}>*/}
            {/*    <Button sx={{mr: 1}} variant="contained" onClick={handleAddButtonStatusOpen}*/}
            {/*            startIcon={<Add/>}>新增</Button>*/}
            {/*    <Dialog*/}
            {/*        open={AddButtonStatus}*/}
            {/*        onClose={handleAddButtonStatusClose}*/}
            {/*        PaperProps={{*/}
            {/*            components: 'form', onSubmit: (event) => {*/}
            {/*                event.preventDefault();*/}
            {/*                const formData = new FormData(event.currentTarget);*/}
            {/*                const formJson = Object.fromEntries(formData.entries());*/}
            {/*                const email = formJson.email;*/}
            {/*                console.log(email);*/}
            {/*                handleAddButtonStatusClose();*/}
            {/*            },*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <DialogTitle>新增机器人</DialogTitle>*/}
            {/*        <DialogContent>*/}
            {/*            <DialogContentText>*/}
            {/*                请输入信息*/}
            {/*            </DialogContentText>*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="id_robot_input"*/}
            {/*                name="id_robot"*/}
            {/*                label="id_robot"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="owner_robot_input"*/}
            {/*                name="owner_robot"*/}
            {/*                label="owner_robot"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}

            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="product_robot_input"*/}
            {/*                name="product_robot"*/}
            {/*                label="product_robot"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="ship_robot_input"*/}
            {/*                name="ship_robot"*/}
            {/*                label="ship_robot"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="born_robot_input"*/}
            {/*                name="born_robot"*/}
            {/*                label="born_robot"*/}
            {/*                type="date"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*                InputLabelProps={{*/}
            {/*                    shrink: true, // 确保 label 在有值时收缩到上方*/}
            {/*                }}*/}

            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="owner_robot_input"*/}
            {/*                name="owner_robot"*/}
            {/*                label="owner_robot"*/}
            {/*                type="date"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*                InputLabelProps={{*/}
            {/*                    shrink: true, // 确保 label 在有值时收缩到上方*/}
            {/*                }}*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="equip_cpu_robot_input"*/}
            {/*                name="equip_cpu_robot"*/}
            {/*                label="equip_cpu_robot"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="equip_gpu_robot_input"*/}
            {/*                name="equip_gpu_robot"*/}
            {/*                label="equip_gpu_robot"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="equip_equipment_robot_input"*/}
            {/*                name="equip_equipment_robot"*/}
            {/*                label="equip_equipment_robot"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                autoFocus*/}
            {/*                required*/}
            {/*                margin="dense"*/}
            {/*                id="price_robot_input"*/}
            {/*                name="price_robot"*/}
            {/*                label="price_robot"*/}
            {/*                type="number"*/}
            {/*                fullWidth*/}
            {/*                variant="outlined"*/}
            {/*            />*/}

            {/*        </DialogContent>*/}
            {/*        <DialogActions>*/}
            {/*            <Button onClick={handleAddButtonStatusClose}>取消</Button>*/}
            {/*            <Button disabled type="submit">提交</Button>*/}
            {/*        </DialogActions>*/}
            {/*    </Dialog>*/}
            {/*    <Button sx={{mr: 1}} variant="contained" startIcon={<Delete/>} color="error" disabled>删除</Button>*/}
            {/*    <Button sx={{mr: 1}} variant="contained" startIcon={<Edit/>} color="success" disabled>编辑</Button>*/}
            {/*</Box>*/}
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
                                                {row.id_robot}
                                            </TableCell>
                                            <TableCell align="left">{row.owner_robot}</TableCell>
                                            <TableCell align="left">{row.born_robot}</TableCell>
                                            <TableCell align="left">{row.product_robot}</TableCell>
                                            <TableCell align="left">{row.price_robot}</TableCell>
                                            <TableCell align="left">{row.equip_equipment_robot}</TableCell>
                                            {/*<TableCell align="left">*/}
                                            {/*    <Button*/}
                                            {/*        id="demo-customized-button"*/}
                                            {/*        aria-controls={open ? 'demo-customized-menu' : undefined}*/}
                                            {/*        aria-haspopup="true"*/}
                                            {/*        aria-expanded={open ? 'true' : undefined}*/}
                                            {/*        variant="contained"*/}
                                            {/*        disableElevation*/}
                                            {/*        endIcon={<KeyboardArrowDownIcon/>}*/}
                                            {/*        onClick={handlemenuClick}*/}
                                            {/*    >*/}
                                            {/*        操作*/}
                                            {/*    </Button>*/}
                                            {/*    <Menu*/}
                                            {/*        id="basic-menu"*/}
                                            {/*        anchorEl={anchorEl}*/}
                                            {/*        open={open}*/}
                                            {/*        onClose={handleClose}*/}
                                            {/*        MenuListProps={{*/}
                                            {/*            'aria-labelledby': 'basic-button',*/}
                                            {/*        }}*/}
                                            {/*    >*/}
                                            {/*        <MenuItem onClick={handleClose} disabled>删除</MenuItem>*/}
                                            {/*        <MenuItem onClick={handleClose} disabled>编辑</MenuItem>*/}
                                            {/*    </Menu><*/}
                                            {/*        /TableCell>*/}
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
                    sx={{ml:1}}
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="紧凑视图"
                />
            </Box>
        </Paper>
    </Box>)
}