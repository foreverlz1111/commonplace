import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Refresh} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {BarChart, Gauge, LineChart} from "@mui/x-charts";
import Tooltip from "@mui/material/Tooltip";
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import IconButton from "@mui/material/IconButton";
import Battery5BarIcon from '@mui/icons-material/Battery5Bar';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import FlashAutoIcon from '@mui/icons-material/FlashAuto';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PowerIcon from '@mui/icons-material/Power';
import SavingsIcon from '@mui/icons-material/Savings';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import HistoryIcon from '@mui/icons-material/History';
import {useEffect, useState} from "react";
import {fetchImageUrl} from "./Pigface";


export default function Screen() {
    const [robotList, setRobotList] = useState([]);
    const [selectedRobot, setSelectedRobot] = useState('');
    const [robotCurrent, setRobotCurrent] = useState();
    const [temp, setTemp] = useState([]);
    const [humid, setHumid] = useState([]);
    const [sensordata, setSensordata] = useState([])

    const [latestpig, setLatestPig] = useState([]);
    const [rgburl, setRGBUrl] = useState("");
    const [thermalurl, setThermalUrl] = useState("");
    const [cameraurl, setCameraUrl] = useState("");
    const handleRobotChange = (event) => {
        setSelectedRobot(event.target.value);
    };

    const handleGetRobotCurrent = () => {
        setRobotCurrent();
        setTemp([])
        setHumid([])
        setSensordata([])
        setTimeout(() => {
            // 在延迟后执行异步操作
            getRobotCurrent(selectedRobot)
                .then((e) => {
                    console.log('err:', e);
                })
                .catch((error) => {
                    console.error('获取机器人状态失败:', error);
                });

            getRobotSensor(selectedRobot)
                .then((e) => {
                    console.log('err:', e);
                })
                .catch((error) => {
                    console.error('获取机器人信息失败:', error);
                });
        }, 1000); // 延迟 1 秒
    }
    const getRobotSensor = async (id_robot) => {
        try {
            const response = await fetch(`/api/myrobotsensorscreen?id_robot=${id_robot}`, {
                method: 'GET',
                headers: {contentType: "application/json"}
            });
            if (response.status === 200) {
                const data = await response.json();
                setTemp(data.map(item => item.CollectionTemperature.Float64))
                setHumid(data.map(item => item.CollectionHumidity.Float64))
                setSensordata(data)
            }
        } catch (error) {
            console.log(error);
        }
    };
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
                console.log('获取机器人状态成功:', data);
                setRobotCurrent(data);
            } else {
                const errorData = await response.json();
                console.log('错误:', errorData);
            }
        } catch (error) {
            console.log('请求失败:', error);
        }
    }
    const getRobotPigCurrent = async (id_robot) => {
        try {
            const response = await fetch(`/api/pigfaceone?id_robot=${id_robot}`, {
                method: 'GET',
                headers: {contentType: "application/json"}
            });
            if (response.status === 200) {
                const data = await response.json();
                setLatestPig(data[0])
                console.log(data[0])
                const rgburl = await fetchImageUrl(data[0].CollectionImgRGB.String);
                const thermalurl = await fetchImageUrl(data[0].CollectionImgThermal.String);
                const cameraurl = await fetchImageUrl(data[0].CollectionImgCamera.String);
                setRGBUrl(rgburl);
                setThermalUrl(thermalurl);
                setCameraUrl(cameraurl)
            }
        } catch (error) {
            console.log(error);
        }
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
                await getRobotSensor(data[0])
                await getRobotPigCurrent(data[0])
            } else {
                const errorData = await response.json();
                console.log('错误:', errorData);
            }
        } catch (error) {
            console.log('请求失败:', error);
        }
    };
    useEffect(() => {
        const storedAccount = JSON.parse(sessionStorage.getItem('loginAccount'));
        if (storedAccount) {
            getRobotList(storedAccount.IDAccount);
        }
    }, []);


    return (

        <Box
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
                    ml: 2, mt: 2
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
                <Button
                    sx={{ml: 1}}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<Refresh/>}
                    onClick={handleGetRobotCurrent}
                >
                    刷新
                </Button>
            </Box>

            <Grid container sx={{ml: 0, mt: 1}}>
                <Grid sx={{
                    bgcolor: "white", height: "25vh", borderRadius: 2, ml: 2,
                }} xs={3.5}>
                    <Typography variant="body2" component="div" align="center" gutterBottom>
                        温度
                    </Typography>
                    <LineChart
                        xAxis={[{data: [1, 2, 3, 4, 5, 6]}]}
                        series={[{
                            data: temp,
                        },]}
                    />
                </Grid>

                <Grid sx={{ml: 1, borderRadius: 2, height: "25vh", bgcolor: "white"}} xs={3.5}>
                    <Typography variant="body2" component="div" align="center" gutterBottom>
                        湿度
                    </Typography>
                    <LineChart
                        xAxis={[{data: [1, 2, 3, 4, 5, 6]}]}
                        series={[{
                            data: humid,
                        },]}
                    />
                </Grid>

                <Grid sx={{
                    bgcolor: "white",
                    ml: 1,
                    borderRadius: 2,
                    height: "25vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // 水平居中
                    justifyContent: "center" // 垂直居中
                }} xs={2}>
                    <Gauge value={sensordata[0]?.CollectionNoise.Float64} startAngle={-90} endAngle={90}/>
                    <Tooltip title="每几分钟更新">
                        <Button>噪声 (声贝)</Button>
                    </Tooltip>
                </Grid>
                <Grid sx={{bgcolor: "white", ml: 1, borderRadius: 2, height: "25vh",}} xs={2.6}>
                    <BarChart
                        xAxis={[{
                            scaleType: 'band', data: ["六氟化硫", "氨气", "二氧化硫"]
                        }]}
                        series={[{
                            data: [
                                sensordata[0]?.CollectionSf6.Float64,
                                sensordata[0]?.CollectionNh.Float64,
                                sensordata[0]?.CollectionSo2.Float64
                            ],
                        },]}
                        barLabel="value"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={0} sx={{
                borderRadius: 2,
                ml: 2,
                mt: 2,
                bgcolor: "white",
                height: "25vh",
                display: "flex",
                flexDirection: "column",
            }} xs={11.8}>
                <Typography variant={"h6"} sx={{ml: 1}}>运行状况</Typography>
                <Grid sx={{
                    display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
                }}>
                    <Grid xs={3.5} sx={{
                        bgcolor: "",
                        ml: 1,
                        height: "20vh",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Button sx={{width: "80%", height: "7vh", mb: 2,}} variant="contained"
                                startIcon={<MapRoundedIcon/>}>
                            <Typography variant={"h6"}>导航地图：</Typography>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusNavigatingmap?.String || 'N/A'}
                                </Typography>
                            )}
                        </Button>
                        <Button sx={{width: "80%", height: "7vh", mb: 2, bgcolor: "#ffa1a1"}} variant="contained"
                                startIcon={<PinDropRoundedIcon/>}>
                            <Typography variant={"h6"}>导航任务：</Typography>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusNavigatingtask?.String || '(就绪)'}
                                </Typography>
                            )}
                        </Button>
                    </Grid>
                    <Grid container xs={4.5} sx={{
                        bgcolor: "", ml: 1, height: "20vh",
                    }}>
                        <Grid xs={5.5} sx={{
                            height: "11vh",
                            mb: 1,
                            bgcolor: "#757de8",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}>
                            <IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                                <Battery90Icon/>
                                <Typography variant={"h6"}>电池电量</Typography>
                            </IconButton>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusBatteryPower?.Int16 || 'N/A'} %
                                </Typography>
                            )}
                        </Grid>
                        <Grid xs={5.5} sx={{
                            height: "11vh",
                            mb: 1,
                            ml: 1,
                            bgcolor: "#757de8",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}>
                            <IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                                <Battery5BarIcon/>
                                <Typography variant={"h6"}>电池健康</Typography>
                            </IconButton>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusBatteryHealth?.Int16 || 'N/A'} %
                                </Typography>
                            )}
                        </Grid>

                        <Grid xs={11.2} sx={{
                            height: "7vh",
                            mb: 0,
                            bgcolor: "#00e676",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderRadius: 2,
                            justifyContent: "center"
                        }}>
                            <IconButton aria-label="Example" disableRipple>
                                <BatteryChargingFullIcon/>
                                <Typography variant={"h6"}>充电状态</Typography>
                            </IconButton>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusBatteryIscharging?.Int16 === 1 ? ("充电中") : ("放电中") || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Grid xs={3.5} sx={{
                        bgcolor: "",
                        ml: 1,
                        height: "20vh",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Grid xs={12} sx={{
                            height: "5vh",
                            mb: 1,
                            width: "80%",
                            bgcolor: "#00a0b2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}>
                            <IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                                <FlashAutoIcon/>
                                <Typography variant={"h6"}>电池电流 (A)</Typography>
                            </IconButton>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusBatteryCur?.Float64 || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid xs={12} sx={{
                            height: "5vh",
                            width: "80%",
                            mb: 1,
                            bgcolor: "#00a0b2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}><IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                            <ElectricBoltIcon/>
                            <Typography variant={"h6"}>电池电压 (V)</Typography>
                        </IconButton>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusBatteryVol?.Float64 || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid xs={12} sx={{
                            height: "5vh",
                            width: "80%",
                            mb: 1,
                            bgcolor: "#00a0b2",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}><IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                            <PowerIcon/>
                            <Typography variant={"h6"}>总充电小时：</Typography>
                        </IconButton>
                            {!robotCurrent ? (
                                <CircularProgress size={20}/>
                            ) : (
                                <Typography variant="h6" sx={{m: 1}}>
                                    {robotCurrent.StatusBatteryChargehour?.Float64 || 'N/A'}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={0} sx={{
                borderRadius: 2,
                ml: 2,
                mt: 2,
                bgcolor: "white",
                height: "30vh",
                display: "flex",
                flexDirection: "column",
            }} xs={11.8}>
                <Typography variant={"h6"} sx={{ml: 1}}>最新的传感器设备记录</Typography>
                <Grid sx={{
                    display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"
                }}>
                    <Grid xs={8} sx={{
                        bgcolor: "",
                        mt: 3,
                        ml: 1,
                        mb: 3,
                        height: "20vh",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <Grid item xs={4} display="flex" justifyContent="center">
                            <Box sx={{textAlign: 'center'}}>
                                <img
                                    src={rgburl ? rgburl : "images/rgb.jpg"}
                                    alt="image-1"
                                    style={{
                                        maxWidth: '100%',   // 最大宽度不超过父容器
                                        height: 'auto',     // 高度自动调整
                                        maxHeight: '150px', // 设置最大高度
                                        objectFit: 'contain', // 保持图片比例，避免裁剪
                                        borderRadius: '8px', // 圆角效果
                                    }}
                                />
                                <Typography variant="body1" display="block">可见光</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} display="flex" justifyContent="center">
                            <Box sx={{textAlign: 'center'}}>
                                <img
                                    src={thermalurl ? thermalurl : "images/thermal.jpg"}
                                    alt="image-2"
                                    style={{
                                        maxWidth: '100%',   // 最大宽度不超过父容器
                                        height: 'auto',     // 高度自动调整
                                        maxHeight: '150px', // 设置最大高度
                                        objectFit: 'contain', // 保持图片比例，避免裁剪
                                        borderRadius: '8px', // 圆角效果
                                    }}
                                />
                                <Typography variant="body1" display="block">热成像</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} display="flex" justifyContent="center">
                            <Box sx={{textAlign: 'center'}}>
                                <img
                                    src={cameraurl ? cameraurl : "images/rgbd.jpg"}
                                    alt="image-3"
                                    style={{
                                        maxWidth: '100%',   // 最大宽度不超过父容器
                                        height: 'auto',     // 高度自动调整
                                        maxHeight: '150px', // 设置最大高度
                                        objectFit: 'contain', // 保持图片比例，避免裁剪
                                        borderRadius: '8px', // 圆角效果
                                    }}
                                />
                                <Typography variant="body1" display="block">相机</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs={3.7} sx={{
                        bgcolor: "",
                        ml: 1,
                        height: "20vh",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Grid xs={12} sx={{
                            height: "5vh",
                            mb: 1,
                            width: "80%",
                            bgcolor: "#cb5e3c",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}>
                            <IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                                <SavingsIcon/>
                                <Typography variant={"h6"}>生猪id</Typography>
                            </IconButton>
                            <Typography variant={"h6"}>{latestpig?.ID || 'N/A'}</Typography>
                        </Grid>
                        <Grid xs={12} sx={{
                            height: "5vh",
                            width: "80%",
                            mb: 1,
                            bgcolor: "#cb5e3c",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}><IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                            <ThermostatIcon/>
                            <Typography variant={"h6"}>生猪体温 (℃)</Typography>
                        </IconButton>
                            <Typography variant={"h6"}>{latestpig.CollectionTemperature?.Float64 || 'N/A'}</Typography></Grid>
                        <Grid xs={12} sx={{
                            height: "5vh",
                            width: "80%",
                            mb: 1,
                            bgcolor: "#cb5e3c",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            color: "#ffffff",
                        }}><IconButton sx={{color: "white"}} aria-label="Example" disableRipple>
                            <HistoryIcon/>
                            <Typography variant={"h6"}></Typography>
                        </IconButton>
                            <Typography
                                variant={"h6"}>{latestpig?.CollectionDatetime || "2024-01-01T18:08:52Z"}</Typography></Grid>
                    </Grid>

                </Grid>

            </Grid>
        </Box>)
}