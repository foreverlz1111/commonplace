import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {forthListItems, mainListItems, secondaryListItems, thirdListItems} from './listItems';

import ViewCarousel from "@mui/icons-material/ViewCarousel";
import Avatar from "@mui/material/Avatar";
import {AccountCircle, GitHub} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";

import Myrobot from "./Myrobot";
import Mysensor from "./Mysensor";
import Logrobot from "./Logrobot";
import StatusRobot from "./StatusRobot";
import Envrobot from "./Envrobot";
import Pigface from "./Pigface";
import Screen from "./Screen";
import {useRouter} from "next/router";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();

export default function Main() {
    const router = useRouter();
    const [loginAccount, setLoginAccount] = useState(null);
    const [welcome, setWelcome] = useState("user");
    useEffect(() => {
        try {
            const storedAccount = JSON.parse(sessionStorage.getItem('loginAccount'));
            if (storedAccount) {
                setLoginAccount(storedAccount); // 如果有数据，则更新状态
                setWelcome(
                    storedAccount.IDAccount+" - "+storedAccount.DeptAccount.String
                )
                // console.log('Stored account:', storedAccount); // 打印的是正确的存储的值
            } else {
                console.log('No login account found in sessionStorage.');
            }
        } catch (error) {
            console.error('Error reading loginAccount from sessionStorage:', error);
        }
    }, []);

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [selectedPage, setSelectedPage] = useState('机器人状态');

    const handlePageChange = (page) => {
        setSelectedPage(page);
    };


    const exitButton = () =>{
        // 清空 sessionStorage 和 localStorage
        sessionStorage.clear();
        // 重定向到首页
        router.push('/');
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            bgcolor: "#6750A4",
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            {selectedPage}
                        </Typography>
                        <IconButton href={"https://github.com/foreverlz1111/commonplace/tree/main/robot-webui"}
                                    color="inherit">
                            <Badge color="secondary">
                                <GitHub/>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        |
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <AccountCircle/>
                            </Badge>
                        </IconButton>
                        {welcome}
                        <Button sx={{m: 1, width: 2, height: 25}} variant="contained" color="secondary" onClick={exitButton}>
                            退出
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <Box sx={{display: 'flex', alignItems: 'center', mx: 'auto'}}>
                            <Avatar sx={{height: 28, width: 28}}>
                                <ViewCarousel sx={{fontSize: 16}}/>
                            </Avatar>
                            <Typography variant="h6" noWrap>
                                <b>管理后台</b>
                            </Typography>
                        </Box>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        {mainListItems(handlePageChange)}
                        <Divider sx={{my: 1}}/>
                        {secondaryListItems(handlePageChange)}
                        <Divider sx={{my: 1}}/>
                        {thirdListItems(handlePageChange)}
                        <Divider sx={{my: 1}}/>
                        {forthListItems(handlePageChange)}
                    </List>
                </Drawer>
                <Box component="main"
                     sx={{
                         backgroundColor: (theme) =>
                             theme.palette.mode === 'light'
                                 ? theme.palette.grey[100]
                                 : theme.palette.grey[900],
                         flexGrow: 1,
                         height: '100vh',
                         overflow: 'auto',
                     }}>
                    {selectedPage === '机器人状态' && (
                        <StatusRobot />
                    )}
                    {selectedPage === "我的机器人" && (
                        <Myrobot/>
                    )}
                    {selectedPage === "传感器信息" && (
                        <Mysensor/>
                    )}
                    {selectedPage === "工作日志" && (
                        <Logrobot/>
                    )}
                    {selectedPage === "环境因子数据" && (
                        <Envrobot></Envrobot>
                    )}
                    {selectedPage === "生猪画像" && (
                        <Pigface></Pigface>
                    )}
                    {selectedPage === "展示大屏" && (
                        <Screen ></Screen>
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}