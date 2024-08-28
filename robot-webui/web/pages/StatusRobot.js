import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, ListItem, MenuItem, Select} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

export default function StatusRobot({selectedRobot, handleRobotChange}) {

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
                    <MenuItem value="robot1">SYS505R01</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Paper
            sx={{
                m: 2, mt: 0, p: 1, display: 'flex', flexDirection: 'row', minHeight: "80vh",

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
                    src="static/images/robot.png" // 替换为实际图片链接
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
                    </Typography><Typography variant="body2" sx={{m: 1}}>
                    状态
                </Typography>
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
                                    <Typography align="left">90%</Typography>
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
                                    <Typography align="left">30℃</Typography>
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
                                    <Typography align="left">1 A</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography align="left">电池温压：</Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left">1 V</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography align="left">充电状态：</Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left">1</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={8}>
                                <Typography align="left">充电次数：</Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left">50</Typography>
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
                                    <Typography align="left">96</Typography>
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
                                    <Typography align="left">2430</Typography>
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
                                    <Typography align="left">热成像，深度相机，激光雷达</Typography>
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
                                    <Typography align="left">2024-08-24 17时49分</Typography>
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
                                <Grid item xs={4}>
                                    <Typography align="left">NavisBoard：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">NavisBrain：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">NavisBridge：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography align="left">移动平台软件：</Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography align="left">移动平台硬件：</Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/><ListItem>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography align="left">激光雷达软件：</Typography>
                            </Grid>
                            <Grid item>
                                <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                        <Divider component="li"/>

                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">激光雷达硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">激光雷达软件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">惯性传感器软件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">惯性传感器硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">视觉传感器软件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">视觉传感器硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">核心计算单元软件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            <Grid container alignItems="center">
                                <Grid item xs={4}>
                                    <Typography align="left">核心计算单元硬件：</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography align="left">Lorem ipsum dolor sit amet</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Paper>
    </Box>)
}