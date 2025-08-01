import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {LineChart, ScatterChart} from "@mui/x-charts";
import Paper from "@mui/material/Paper";
import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {cssFileResolve} from "next/dist/build/webpack/config/blocks/css/loaders/file-resolve";
import * as Papa from "date-fns";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

async function getCsv4DataGrid(fileName) {
    // 拉取文本
    const response = await fetch(fileName);
    if (!response.ok) {
        throw new Error(`无法加载文件：${response.status} ${response.statusText}`);
    }
    const text = await response.text();

    // 拆分非空行
    const lines = text
        .trim()
        .split(/\r?\n/)
        .filter(line => line.trim().length > 0);

    if (lines.length < 1) {
        return {rows: [], columns: []};
    }

    // 自动检测分隔符
    const headerLine = lines[0];
    const delimiter = headerLine.includes(',')
        ? ','
        : headerLine.includes('\t')
            ? '\t'
            : ','; // 默认逗号

    // 解析表头
    const headers = headerLine.split(delimiter).map(h => h.trim());

    // 构造 columns 数组
    const columns = headers.map(header => ({
        field: header,
        headerName: header,  // 你也可以在这里做映射，比如去掉单位后缀等
    }));

    // 构造 rows 数组
    const rows = lines.slice(1).map((line, idx) => {
        const values = line.split(delimiter).map(v => v.trim());
        const row = {id: idx};
        headers.forEach((header, i) => {
            row[header] = values[i] || '';
        });
        return row;
    });

    return {rows, columns};
}

async function getCsv4LineChart(fileName) {
    // 拉取文本
    const response = await fetch(fileName);
    if (!response.ok) {
        throw new Error(`无法加载文件：${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    const lines = text
        .trim()
        .split(/\r?\n/)
        .filter(line => line.trim().length > 0);

    if (lines.length <= 1) {
        return {x: [], y: []};
    }

    // 自动检测分隔符（逗号或制表符）
    const delimiter = lines[0].includes(',') ? ',' : lines[0].includes('\t') ? '\t' : ',';

    const x = [];
    const y = [];
    lines.slice(1).forEach(line => {
        // 按逗号、制表符或空格任一分隔
        const parts = line.trim().split(/[\s,\t]+/);
        const xs = parts[0] ?? '';
        const ys = parts[1] ?? '';
        const xv = Number(xs);
        const yv = Number(ys);
        x.push(isNaN(xv) ? xs : xv);
        y.push(isNaN(yv) ? ys : yv);
    });

    return {xvalue: x, yvalue: y};

}

export default function GrowthModel({}) {
    const [csvModelPath, setCsvModelPath] = React.useState('');
    const handleSelectModelChange = (event) => {
        setCsvModelPath(event.target.value);
        // console.log(csvMap[csvModelIndex])
        updateChart(event.target.value);
    }
    const [csvModelIndex, setCsvModelIndex] = React.useState(0);
    const [csvModelName, setCsvModelName] = React.useState('');

    const [csvMap, setCsvMap] = useState({});
    const [XValue, setXValue] = React.useState([]);
    const [YValue, setYValue] = React.useState([]);
    const [Rows, setRows] = React.useState([]);
    const [Columns, setColumns] = React.useState([]);

    async function updateChart(csv_path) {
        try {
            const {xvalue, yvalue} = await getCsv4LineChart(csv_path[0]);

            const {rows, columns} = await getCsv4DataGrid(csv_path[1]);
            // console.log(rows, columns);
            // console.log(xvalue, yvalue);
            setRows(rows);
            setColumns(columns);
            setXValue(xvalue);
            setYValue(yvalue);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetch("/models_csv.json")
            .then((res) => res.json())
            .then((data) => {
                setCsvMap(data);
                // console.log(Object.values(data));//=="x.csv"
                // console.log(Object.keys(data));//=="xx模型"
                const initSelectKeys = Object.keys(data)[0];
                if (initSelectKeys) {
                    setCsvModelName(initSelectKeys);
                }
                const initSelectModelPath = Object.values(data)[0];
                if (initSelectModelPath) {
                    setCsvModelPath(initSelectModelPath);
                }
                updateChart(initSelectModelPath);
            })
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
                选择模型：
            </Typography>
            <FormControl variant="outlined" size="small" sx={{minWidth: 300}}>
                {/*<InputLabel id="robot-select-label">model</InputLabel>*/}
                <Select
                    variant="standard"
                    labelId="robot-select-label"
                    id="robot-select"
                    value={csvModelPath}
                    onChange={handleSelectModelChange}
                    label="model"
                >
                    {csvMap.length === 0 ? (
                        <MenuItem value="">
                            <em>暂无模型</em>
                        </MenuItem>) : (
                        Object.entries(csvMap).map(([name, path], index) => (
                            <MenuItem key={index} value={path} onClick={() => {
                                setCsvModelIndex(index)
                                setCsvModelName(name)
                            }}>
                                {/*{index}*/}
                                {name}
                                {/*{path}*/}
                            </MenuItem>
                        ))
                    )}

                </Select>
            </FormControl>
        </Box>
        <Paper
            sx={{
                m: 2, mt: 2, p: 1, display: 'flex', flexDirection: "column", minHeight: "85vh",
            }}
        >
            {/* 上半部分 */}
            <Box
                component="section"
                sx={{
                    flex: 1, // 占剩余空间的一半
                    m: 2, p: 2, border: '1px solid black', overflow: 'auto',
                }}
            >
                <Box sx={{ml: 0}}>
                    <Typography variant="h6">模型测试图：</Typography>
                </Box>
                <Box sx={{ml: 0}}>
                    <LineChart
                        title="title"
                        xAxis={[{
                            data: XValue,
                            label: "实际值" + (Object.keys(csvMap).length > 0 ? csvMap[csvModelName][2] : "0"),
                            shape: 'diamond',
                            showToolbar: true
                        }]}
                        series={[{
                            data: YValue,
                            label: "预测值" + (Object.keys(csvMap).length > 0 ? csvMap[csvModelName][3] : "0"),
                            curve: "monotoneY",
                            shape: 'diamond',
                            connectNulls: false,
                        },]}

                        height={300}
                    />
                </Box>


            </Box>
            <Box
                sx={{
                    overflow: 'auto', flex: 20, // 同样占一半
                    m: 2, p: 2, border: '1px solid gray',
                }}
            >
                <Typography variant="h6">模型训练数据：</Typography>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid columns={Columns} rows={Rows} columnBuffer={2} columnThreshold={2}/>
                </div>
            </Box>
        </Paper>
    </Box>)
}