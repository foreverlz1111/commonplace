import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Adb, DeviceThermostat, Dvr, LegendToggle, LocalSee, Savings, StickyNote2} from "@mui/icons-material";

export const mainListItems = (handlePageChange)=>(
    <React.Fragment>
        <ListItemButton onClick={()=>handlePageChange("机器人状态")}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="机器人状态"/>
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (handlePageChange) => (
    <React.Fragment>
        <ListSubheader component="div" inset>
            机器人管理
        </ListSubheader>
        <ListItemButton onClick={()=>handlePageChange("我的机器人")}>
            <ListItemIcon>
                <Adb/>
            </ListItemIcon>
            <ListItemText primary="我的机器人"/>
        </ListItemButton>
        <ListItemButton onClick={()=>handlePageChange("传感器信息")}>
            <ListItemIcon>
                <LocalSee/>
            </ListItemIcon>
            <ListItemText primary="传感器信息"/>
        </ListItemButton>
        <ListItemButton onClick={()=>handlePageChange("工作日志")}>
            <ListItemIcon>
                <StickyNote2/>
            </ListItemIcon>
            <ListItemText primary="工作日志"/>
        </ListItemButton>
        <ListItemButton onClick={()=>handlePageChange("环境因子数据")}>
            <ListItemIcon>
                <DeviceThermostat/>
            </ListItemIcon>
            <ListItemText primary="环境因子数据"/>
        </ListItemButton>
    </React.Fragment>
);
export const thirdListItems =(handlePageChange)=> (
    <React.Fragment>
        <ListItemButton onClick={()=>handlePageChange("生猪画像")}>
            <ListItemIcon>
                <Savings/>
            </ListItemIcon>
            <ListItemText primary="生猪画像"/>
        </ListItemButton>
        <ListItemButton onClick={()=>handlePageChange("生长模型")}>
            <ListItemIcon>
                <LegendToggle/>
            </ListItemIcon>
            <ListItemText primary="生长模型"/>
        </ListItemButton>
    </React.Fragment>
);

export const forthListItems =(handlePageChange)=> (
    <React.Fragment>
        <ListItemButton onClick={()=>handlePageChange("展示大屏")}>
            <ListItemIcon>
                <Dvr/>
            </ListItemIcon>
            <ListItemText primary="展示大屏"/>
        </ListItemButton>
    </React.Fragment>
);