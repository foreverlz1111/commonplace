import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ViewCarousel from "@mui/icons-material/ViewCarousel"
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {GitHub, TurnRight} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useState} from "react";

function Copyright(props) {
    return (<Typography variant="body2" color="text.secondary" align="center" {...props}>
        <GitHub/>
        {' '}
        <Link color="inherit" href="https://github.com/foreverlz1111/commonplace/tree/main/robot-webui">
            foreverlz1111
        </Link>
        {' - '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>);
}

const defaultTheme = createTheme();


export default function Index() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'), password: data.get('password'),
        });
    };
    const router = useRouter();

    const [idAccount, setIdAccount] = useState('admin');
    const [pwdAccount, setPwdAccount] = useState('admin');

    const handleLogin = () => {
        // 验证逻辑

        if (idAccount === 'admin' && pwdAccount === 'admin') {
            // 如果验证通过，跳转到 main.js

            router.push('/main');
        } else {
            // 如果验证失败，显示错误信息或进行其他处理
            alert('登录名或密码错误');
        }
    };
    return (<ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url("/static/images/login_bg.png")',
                    backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}
                >
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <ViewCarousel/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            机器人管理后台
                        </Typography>
                    </Box>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id_account"
                            label="登录名"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={idAccount}
                            onChange={(e) => setIdAccount(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="pwd_account"
                            label="密码"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={pwdAccount}
                            onChange={(e) => setPwdAccount(e.target.value)}

                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="记住密码"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleLogin}
                        >
                            登录
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    忘记密码
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={"right"}>
                            <Grid item>
                                <Link href="#" variant="body2" sx={{color: 'secondary.main'}}>
                                    <Box sx={{display: "flex", alignItems: "center"}}>

                                        <Avatar sx={{bgcolor: 'secondary.main', height: 20, width: 20}}>
                                            <TurnRight sx={{fontSize: 16}}/>
                                        </Avatar>
                                        生猪健康管理后台
                                    </Box>
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{mt: 5}}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>);
}
