import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {LineChart} from "@mui/x-charts";
import Paper from "@mui/material/Paper";
import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';


function useData(rowLength, columnLength) {
    const [data, setData] = React.useState({columns: [], rows: []});

    React.useEffect(() => {
        const rows = [];

        for (let i = 0; i < rowLength; i += 1) {
            const row = {
                id: i,
            };

            for (let j = 1; j <= columnLength; j += 1) {
                row[`price${j}M`] = `${i.toString()}, ${j} `;
            }

            rows.push(row);
        }

        const columns = [];

        for (let j = 1; j <= columnLength; j += 1) {
            columns.push({field: `price${j}M`, headerName: `${j}M`});
        }

        setData({
            rows, columns,
        });
    }, [rowLength, columnLength]);
    return data;
}

export default function GrowthModel({}) {
    const [selectedModel, setSelectModel] = React.useState('');
    const handleSelectModelChange = (event) => {
        setSelectModel(event.target.value);
    }
    const data = useData(100, 1000);

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
            <FormControl variant="outlined" size="small" sx={{minWidth: 200}}>
                <InputLabel id="robot-select-label">model</InputLabel>
                <Select
                    variant="standard"
                    labelId="robot-select-label"
                    id="robot-select"
                    value={selectedModel}
                    onChange={handleSelectModelChange}
                    label="model"
                >
                    {/*<MenuItem value="robot1">null</MenuItem>*/}
                    {selectedModel.length === 0 ? (<MenuItem value="">
                        <em>暂无模型</em>
                    </MenuItem>) : (<MenuItem value="">
                            <em>暂无模型</em>
                        </MenuItem>
                        // selectedModel.map((robot, index) => (
                        //     <MenuItem key={index} value={robot}>
                        //         {robot}
                        //     </MenuItem>
                        // )
                        // )
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
                <Box sx={{mb: 0}}>
                    <Typography variant="h6">模型展示图：</Typography>
                </Box>


                <LineChart
                    xAxis={[{data: [1, 2, 3, 5, 8, 10]}]}
                    series={[{
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },]}
                    height={300}
                />
            </Box>
            <Box
                sx={{
                    overflow: 'auto', flex: 20, // 同样占一半
                    m: 2, p: 2, border: '1px solid gray',
                }}
            >
                <Typography variant="h6">模型数据：</Typography>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid {...data} columnBuffer={2} columnThreshold={2}/>
                </div>
            </Box>
        </Paper>
    </Box>)
}