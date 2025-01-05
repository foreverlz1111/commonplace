import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {CircularProgress, FormControl, InputBase, InputLabel} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import TablePagination from "@mui/material/TablePagination";


function createData(id, id_pig, collection_datetime, id_robot, rgb, thermal, pigtemp, rgbd, camera) {
    return {
        id, id_pig, collection_datetime, id_robot, rgb, thermal, pigtemp, rgbd, camera
    };
}

export const fetchImageUrl = async (filename) => {
    try {
        const response = await fetch(`/api/getossurl?filename=${filename}`, {
            method: 'GET',
            headers: {
                contentType: "application/json",
                Authorization: sessionStorage.getItem('token'),
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.ossurl;
        } else {
            console.error("Failed to fetch image URL");
            return null;
        }
    } catch (error) {
        console.error("Error fetching image URL:", error);
        return null;
    }
};

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [rgburl, setRGBUrl] = useState("");
    const [thermalurl, setThermalUrl] = useState("");
    const [cameraurl, setCameraUrl] = useState("");
    // console.log(row)
    useEffect(() => {
        if (open && row.rgb) {  // 仅在打开并且 `row.rgb` 存在时加载图片
            const loadImage = async () => {
                const url = await fetchImageUrl(row.rgb);
                setRGBUrl(url);
            };
            loadImage();
        } else {
            setRGBUrl("");  // 如果折叠关闭，则清空图片 URL
        }
    }, [open, row.rgb]);

    useEffect(() => {
        if (open && row.thermal) {  // 仅在打开并且 `row.rgb` 存在时加载图片
            const loadImage = async () => {
                const url = await fetchImageUrl(row.thermal);
                setThermalUrl(url);
            };
            loadImage();
        } else {
            setThermalUrl("");  // 如果折叠关闭，则清空图片 URL
        }
    }, [open, row.thermal]);

    useEffect(() => {
        if (open && row.rgb) {  // 仅在打开并且 `row.rgb` 存在时加载图片
            const loadImage = async () => {
                const url = await fetchImageUrl(row.camera);
                setCameraUrl(url);
            };
            loadImage();
        } else {
            setCameraUrl("");  // 如果折叠关闭，则清空图片 URL
        }
    }, [open, row.camera]);

    return (<React.Fragment>
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell align="left">{row.id_pig}</TableCell>
            <TableCell align="left">{row.collection_datetime}</TableCell>
            <TableCell align="left">{row.id_robot}</TableCell>
            <TableCell sx={{color: row.rgb === "" ? "red" : ""}}
                       align="left">{row.rgb === "" ? "无" : "是"}</TableCell>
            <TableCell sx={{color: row.thermal === "" ? "red" : ""}}
                       align="left">{row.thermal === "" ? "无" : "是"}</TableCell>
            <TableCell sx={{color: row.pigtemp >= 40 ? "red" : ""}}
                       align="left">{row.pigtemp === "" ? "无" : row.pigtemp}</TableCell>
            <TableCell sx={{color: row.rgbd === "" ? "red" : ""}}
                       align="left">{row.rgbd === "" ? "无" : "是"}</TableCell>
            <TableCell align="center">
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
                查看图像
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin: 1}}>
                        <Typography variant="h6" gutterBottom component="div">
                            图像
                        </Typography>
                        <Grid
                            sx={{ml: 4}}
                            container
                            spacing={2}
                            justifyContent="center"  // 水平居中
                            alignItems="center"       // 垂直居中
                        >
                            <Grid item xs={4} display="flex" justifyContent="center">
                                <Box sx={{textAlign: 'center'}}>
                                    <img
                                        src={rgburl}
                                        alt="image-1"
                                        style={{
                                            maxWidth: '100%',   // 最大宽度不超过父容器
                                            height: 'auto',     // 高度自动调整
                                            maxHeight: '150px', // 设置最大高度
                                            objectFit: 'contain', // 保持图片比例，避免裁剪
                                            borderRadius: '8px', // 圆角效果
                                        }}
                                    />
                                    <Typography variant="caption" display="block">可见光</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4} display="flex" justifyContent="center">
                                <Box sx={{textAlign: 'center'}}>
                                    <img
                                        src={thermalurl}
                                        alt="image-2"
                                        style={{
                                            maxWidth: '100%',   // 最大宽度不超过父容器
                                            height: 'auto',     // 高度自动调整
                                            maxHeight: '150px', // 设置最大高度
                                            objectFit: 'contain', // 保持图片比例，避免裁剪
                                            borderRadius: '8px', // 圆角效果
                                        }}
                                    />
                                    <Typography variant="caption" display="block">热成像</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4} display="flex" justifyContent="center">
                                <Box sx={{textAlign: 'center'}}>
                                    <img
                                        src={cameraurl}
                                        alt="image-3"
                                        style={{
                                            maxWidth: '100%',   // 最大宽度不超过父容器
                                            height: 'auto',     // 高度自动调整
                                            maxHeight: '150px', // 设置最大高度
                                            objectFit: 'contain', // 保持图片比例，避免裁剪
                                            borderRadius: '8px', // 圆角效果
                                        }}
                                    />
                                    <Typography variant="caption" display="block">相机</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>);
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(PropTypes.shape({
            amount: PropTypes.number.isRequired,
            customerId: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        }),).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};


const BootstrapInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    }, '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow',]), // Use the system font instead of the default Roboto font.
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));
export default function Pigface() {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0); // 当前页数
    const [rowsPerPage, setRowsPerPage] = useState(10); // 每页显示的行数

    const extractValidData = (data) => {
        return {
            id: data.ID,
            id_pig: data.IDPig,
            collection_datetime: data.CollectionDatetime,
            id_robot: data.IDRobot,
            rgb: data.CollectionImgRGB.Valid ? data.CollectionImgRGB.String : "N/A",
            thermal: data.CollectionImgThermal.Valid ? data.CollectionImgThermal.String : "N/A",
            pigtemp: data.CollectionTemperature.Valid ? data.CollectionTemperature.Float64 : "N/A",
            rgbd: data.CollectionImgRGBD.Valid ? data.CollectionImgRGBD.String : "N/A",
            camera: data.CollectionImgCamera.Valid ? data.CollectionImgCamera.String : "N/A",
        };
    };

    const getPigFace = async (id_account) => {
        try {
            const response = await fetch(`/api/pigfaceall?id_account=${id_account}`, {
                method: 'GET',
                headers: {contentType: "application/json"}
            });
            if (response.status === 200) {
                const data = await response.json();
                const processedRows = data.map(item => {
                    const processedData = extractValidData(item);

                    return createData(
                        processedData.id,
                        processedData.id_pig,
                        processedData.collection_datetime,
                        processedData.id_robot,
                        processedData.rgb,
                        processedData.thermal,
                        processedData.pigtemp,
                        processedData.rgbd,
                        processedData.camera
                    );
                });
                setRows(processedRows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const storedAccount = JSON.parse(sessionStorage.getItem('loginAccount'));
        if (storedAccount) {
            getPigFace(storedAccount.IDAccount);
        }
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // 每次改变每页的行数时，重置为第一页
    };

    const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box component="main" sx={{flexGrow: 1, height: '100vh', overflow: 'auto'}}>
            <Toolbar/>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'left', ml: 4, mt: 2, mb: 1}}>
                <FormControl variant="standard">
                    <InputLabel shrink htmlFor="input-label">输入猪只id</InputLabel>
                    <BootstrapInput defaultValue="" id="bootstrap-input"/>
                </FormControl>
                <Button sx={{ml: 2, mt: 3}} disabled variant="contained">查询</Button>
            </Box>
            <Paper sx={{m: 4, mt: 0, p: 0, display: 'flex', flexDirection: 'row'}}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">id_pig</TableCell>
                                <TableCell align="left">采集时间</TableCell>
                                <TableCell align="left">id_robot</TableCell>
                                <TableCell align="left">可见光图像</TableCell>
                                <TableCell align="left">热红外图像</TableCell>
                                <TableCell align="left">面部温度 (℃)</TableCell>
                                <TableCell align="left">深度图像</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        {rows.length === 0 ? <CircularProgress sx={{ml: 2}} size={20}/> : (
                            <TableBody>
                                {visibleRows.map((row) => (
                                        <Row key={row.id} row={row}/>
                                    )
                                )}
                            </TableBody>
                        )}
                    </Table>
                    <TablePagination
                        component="div"
                        count={rows.length} // 总行数
                        page={page} // 当前页码
                        onPageChange={handleChangePage} // 页码变化
                        rowsPerPage={rowsPerPage} // 每页显示的行数
                        onRowsPerPageChange={handleChangeRowsPerPage} // 每页显示的行数变化
                        labelRowsPerPage="每页行数"
                        rowsPerPageOptions={[5, 10, 25]} // 可选的每页行数
                    />
                </TableContainer>
            </Paper>
        </Box>
    );
}