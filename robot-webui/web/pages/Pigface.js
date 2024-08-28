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
import {FormControl, InputBase, InputLabel} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";


function createData(id_pig, collection_datetime, id_robot, rgb, thermal, pigtemp, rgbd) {
    return {
        id_pig, collection_datetime, id_robot, rgb, thermal, pigtemp, rgbd,
    };
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

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
                                        src={row.rgb}
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
                                        src={row.thermal}
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
                                        src={row.rgbd}
                                        alt="image-3"
                                        style={{
                                            maxWidth: '100%',   // 最大宽度不超过父容器
                                            height: 'auto',     // 高度自动调整
                                            maxHeight: '150px', // 设置最大高度
                                            objectFit: 'contain', // 保持图片比例，避免裁剪
                                            borderRadius: '8px', // 圆角效果
                                        }}
                                    />
                                    <Typography variant="caption" display="block">深度图像</Typography>
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

const rows = [createData('1', "2024年8月26日20时8分", "SYS505R01", "./static/images/rgb.jpg", "./static/images/thermal.jpg", 37, "/static/images/rgbd.jpg"),

];
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
                ml: 4, mt: 2, mb: 1
            }}
        ><FormControl variant="standard">
            <InputLabel shrink htmlFor="input-label">
                输入猪只id
            </InputLabel>
            <BootstrapInput defaultValue="" id="bootstrap-input"/>
        </FormControl>
            <Button sx={{ml: 2, mt: 3}} variant="contained">查询</Button>
        </Box>
        <Paper
            sx={{
                m: 4, mt: 0, p: 0, display: 'flex', flexDirection: 'row',

            }}
        >
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
                    <TableBody>
                        {rows.map((row) => (<Row key={row.name} row={row}/>))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    </Box>)

}