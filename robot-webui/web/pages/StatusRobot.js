import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {CircularProgress, FormControl, InputLabel, ListItem, MenuItem, Select} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from "@mui/material/Button";

export default function StatusRobot() {

    const [selectedRobot, setSelectedRobot] = useState('');
    const handleRobotChange = (event) => {
        setSelectedRobot(event.target.value);
    };

    const [loginAccount, setLoginAccount] = useState(null);
    const [robotList, setRobotList] = useState([]);
    const [robotStatus, setRobotStatus] = useState();
    const [robotVersion, setRobotVersion] = useState();
    const [robotInfo, setRobotInfo] = useState();

    const getRobotInfo = async (id_robot) => {
        // 加载 机器人状态
        try {
            const response = await fetch(`/api/robotinfo/?id_robot=${id_robot}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                // console.log('获取机器人信息成功:', data);
                setRobotInfo(data);
            } else {
                const errorData = await response.json();
                console.log('错误:', errorData);
            }
        } catch (error) {
            console.log('请求失败:', error);
        }
    }

    const getRobotCurrent = async (id_robot) => {
        // 加载 机器人状态
        try {
            const response = await fetch(`/api/robotcurrent/?id_robot=${id_robot}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                // console.log('获取机器人状态成功:', data);
                setRobotStatus(data.robotstatus);
                setRobotVersion(data.robotversion)
            } else {
                const errorData = await response.json();
                console.log('错误:', errorData);
            }
        } catch (error) {
            console.log('请求失败:', error);
        }
    }
    const handleGetRobotCurrent = () => {
        setRobotStatus();
        setRobotInfo()
        setTimeout(() => {
            // 在延迟后执行异步操作
            getRobotCurrent(selectedRobot)
                .then((e) => {
                    console.log('错误:', e);
                })
                .catch((error) => {
                    console.error('获取机器人状态失败:', error);
                });

            getRobotInfo(selectedRobot)
                .then((e) => {
                    console.log('错误:', e);
                })
                .catch((error) => {
                    console.error('获取机器人信息失败:', error);
                });
        }, 1000); // 延迟 1 秒
    }
    const getRobotList = async (id_account) => {
        // 读取机器人列表
        await new Promise((resolve) => setTimeout(resolve, 1200));
        try {
            const response = await fetch(`/api/accountrobot/?id_account=${id_account}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('获取机器人列表成功:', data);
                setRobotList(data); // 更新机器人列表状态
                setSelectedRobot(data[0])
                await getRobotCurrent(data[0])
                await getRobotInfo(data[0])
            } else {
                const errorData = await response.json();
                console.log('错误:', errorData);
            }
        } catch (error) {
            console.log('请求失败:', error);
        }
    };

    useEffect(() => {
        try {

            const storedAccount = JSON.parse(sessionStorage.getItem('loginAccount'));
            if (storedAccount) {
                getRobotList(storedAccount.IDAccount)
            } else {
                console.log('No login account found in sessionStorage.');
            }
        } catch (error) {
            console.error('Error reading loginAccount from sessionStorage:', error);
        }
    }, []);

    return (<Box>
        <Toolbar/>
        <Box
            sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'left', flexDirection: 'row', // 确保项目在同一行
                ml: 4, mt: 2
            }}
        >
            <Typography variant="h6" sx={{mr: 2}}>
                选择机器人：
            </Typography>

            <FormControl variant="outlined" size="small" sx={{minWidth: 200}}>
                <InputLabel id="robot-select-label">id_robot</InputLabel>
                <Select
                    variant="standard"
                    labelId="robot-select-label"
                    id="robot-select"
                    value={selectedRobot}
                    onChange={handleRobotChange}
                    label="id_robot"
                >
                    {/*<MenuItem value="robot1">null</MenuItem>*/}
                    {robotList.length === 0 ? (
                        <MenuItem value="">
                            <em>账号无机器人</em>
                        </MenuItem>
                    ) : (
                        robotList.map((robot, index) => (
                            <MenuItem key={index} value={robot}>
                                {robot}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            <Button sx={{ml:2}} variant="contained" endIcon={<RefreshIcon />} onClick={handleGetRobotCurrent}>
                刷新机器人信息
            </Button>
        </Box>
        <Paper
            sx={{
                m: 2, mt: 2, p: 1, display: 'flex', flexDirection: 'row', minHeight: "80vh",

            }}
        >
            {/* 左侧部分，占 1/3 宽度 */}
            <Box
                sx={{
                    flex: 1, // 占 1/3 宽度
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', // 垂直排列
                    borderRight: '1px solid #ccc', // 可选：添加分隔线
                    bgcolor: "",
                }}
            >
                <Box
                    component="img"
                    src="images/robot.png" // 替换为实际图片链接
                    alt="机器人图片"
                    sx={{
                        mb: 2, maxWidth: '100%',      // 限制图片最大宽度为容器宽度
                        maxHeight: '100%',      // 限制图片最大高度为容器高度的 70%
                        objectFit: 'contain',  // 保持图片的原始比例
                    }} // 图片和标题栏之间的间距
                />
                <Box
                    sx={{
                        bgcolor: '#33c9dc',
                        color: 'black',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        flexDirection: "row",
                        display: 'flex',
                        mb: 2,

                    }}
                >
                    <Typography variant="body2" sx={{m: 1}}>
                        机器人状态：
                    </Typography>
                    {!robotStatus ? (
                        <CircularProgress size={20} />
                    ) : (
                        <Typography variant="body2" sx={{m: 1}}>
                            {robotStatus.StatusNavigatingtask?.String || '(就绪)'}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* 右侧部分，占 2/3 宽度 */}
            <Box
                sx={{
                    flex: 2, // 占 2/3 宽度
                    display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: "", ml: 1
                }}
            >
                <Box
                    sx={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', // 水平居中
                        justifyContent: 'flex-start', // 垂直从顶部开始
                        bgcolor: "", padding: 1, height: '90%', // 确保 Box 占满父容器的高度
                    }}
                >
                    <List sx={{
                        ml: 1,
                        mr: 1,
                        py: 0,
                        width: '100%',
                        maxWidth: 360,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}>
                        <ListItem sx={{bgcolor: "#D9EDF7", borderRadius: '8px 8px 0 0'}}>
                            <ListItemText primary="机器人"/>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={8}>
                                    <Typography align="left">电量：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotStatus ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotStatus.StatusBatteryPower?.Int16 || 'N/A'} %
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={8}>
                                    <Typography align="left">电池温度：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotStatus ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotStatus.StatusBatteryTemp?.Float64 || 'N/A'} ℃
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={8}>
                                    <Typography align="left">电池电流：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotStatus ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotStatus.StatusBatteryCur?.Float64 || 'N/A'} A
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography align="left">电池电压：</Typography>
                            </Grid>
                            <Grid item>
                                {!robotStatus ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <Typography align="left">
                                        {robotStatus.StatusBatteryVol?.Float64 || 'N/A'} V
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography align="left">充电状态：</Typography>
                            </Grid>
                            <Grid item>
                                {!robotStatus ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <Typography align="left">
                                        {robotStatus.StatusBatteryIscharging?.Int16 === 1 ?("充电中"):("放电中") || 'N/A'}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography align="left">充电次数：</Typography>
                            </Grid>
                            <Grid item>
                                {!robotStatus ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <Typography align="left">
                                        {robotStatus.StatusBatteryChargetime?.Int32 || 'N/A'}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={8}>
                                    <Typography align="left">电池健康：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotStatus ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotStatus.StatusBatteryHealth?.Int16 || 'N/A'} %
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={8}>
                                    <Typography align="left">累计充电小时：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotStatus ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotStatus.StatusBatteryChargehour?.Float64 || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                    </List>

                    <List sx={{
                        mt: 2,
                        ml: 1,
                        mr: 1,
                        py: 0,
                        width: '100%',
                        maxWidth: 360,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}>
                        <ListItem sx={{bgcolor: "#F5F5F5", borderRadius: '8px 8px 0 0'}}>
                            <ListItemText primary="装备配置"/>
                        </ListItem>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item>
                                    {!robotInfo ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotInfo.EquipEquipmentRobot?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <List sx={{
                        mt: 2,
                        ml: 1,
                        mr: 1,
                        py: 0,
                        width: '100%',
                        maxWidth: 360,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}>
                        <ListItem sx={{bgcolor: "#DFF0D8", borderRadius: '8px 8px 0 0'}}>
                            <ListItemText primary="通讯时间"/>
                        </ListItem>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item>
                                    {!robotStatus ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotStatus?.CollectionDatetime || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Box>

                <Box
                    sx={{
                        flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', // 水平居中
                        justifyContent: 'flex-start', // 垂直从顶部开始
                        bgcolor: "", padding: 1, height: '90%', // 确保 Box 占满父容器的高度
                    }}
                >
                    <List sx={{
                        ml: 1,
                        mr: 1,
                        py: 0,
                        width: '100%',
                        maxWidth: 480,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                    }}>
                        <ListItem sx={{bgcolor: "#D9EDF7", borderRadius: '8px 8px 0 0'}}>
                            <ListItemText primary="软硬件版本"/>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">NavisBoard：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionNavisboard?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">NavisBrain：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionNavisbrain?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">NavisBridge：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionNavisbridge?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Typography align="left">移动平台软件：</Typography>
                            </Grid>
                            <Grid item>
                                {!robotVersion ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <Typography align="left">
                                        {robotVersion.VersionPlatformSoftware?.String || 'N/A'}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Typography align="left">移动平台硬件：</Typography>
                            </Grid>
                            <Grid item>
                                {!robotVersion ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <Typography align="left">
                                        {robotVersion.VersionPlatformHardware?.String || 'N/A'}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Typography align="left">激光雷达软件：</Typography>
                            </Grid>
                            <Grid item>
                                {!robotVersion ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <Typography align="left">
                                        {robotVersion.VersionLidarSoftware?.String || 'N/A'}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/>

                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">激光雷达硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionLidarHardware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">激光雷达软件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionLidarHardware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">惯性传感器软件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionInertiaSoftware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">惯性传感器硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionInertiaHardware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">视觉传感器软件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionVisionSoftware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">视觉传感器硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionVisionHardware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">核心计算单元软件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionComputeSoftware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={6}>
                                    <Typography align="left">核心计算单元硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    {!robotVersion ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Typography align="left">
                                            {robotVersion.VersionComputeHardware?.String || 'N/A'}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Paper>
    </Box>)
}