import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ViewCarousel from "@mui/icons-material/ViewCarousel"
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {GitHub, TurnRight} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {wait} from "next/dist/lib/wait";


function Copyright(props) {
    return (
        <Grid variant="body2" color="text.secondary" align="center" {...props}>
        <GitHub sx={{verticalAlign: 'middle'}}/>{' '}
        <Typography
            sx={{
                display: 'inline-block',
                position: 'relative',
                top: '3px',
            }}>
            <Link variant="body2" href="https://github.com/foreverlz1111/commonplace/tree/main/robot-webui">
                foreverlz1111
            </Link>
            {' - '}
            {new Date().getFullYear()}
        </Typography>
    </Grid>);
}

const defaultTheme = createTheme();


export default function Index() {
    const router = useRouter();

    const [idAccount, setIdAccount] = useState('SYS505');
    const [pwdAccount, setPwdAccount] = useState('SYS505');
    const [idAccountError, setIdAccountError] = useState('');
    const [pwdAccountError, setPwdAccountError] = useState('');
    const [globalError, setGlobalError] = useState('');
    const [loginLoading, setLoginLoading] = React.useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();

        setIdAccountError('');
        setPwdAccountError('');
        setGlobalError('');

        try {
            setLoginLoading(true);
            wait(1000)
            const response = await fetch('/api/login/', {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_account: idAccount,
                    pwd_account: pwdAccount,
                }),
            });
            if (response.status === 200) {
                const data = await response.json(); // 解析 JSON 数据
                console.log('Login successful:', data);
                // localStorage: 存储的数据不会过期，除非手动清除（如通过 JavaScript 或清除浏览器缓存）。
                // sessionStorage: 存储的数据只在浏览器会话期间有效，当用户关闭浏览器或标签页时，数据会被清除。

                // 数据固化
                sessionStorage.setItem("loginAccount", JSON.stringify(data["data"]))
                sessionStorage.setItem("token", data["token"])

                await router.push('/main');
            } else {
                // 假设服务器返回 JSON 对象中有错误信息
                setGlobalError('请检查用户名或密码');
                const data = await response.json();
                console.log("登录失败，请检查用户名或密码", data)
                // 可以根据具体的错误信息设置 idAccountError 和 pwdAccountError
                // setIdAccountError('错误信息');
                // setPwdAccountError('错误信息');
            }
        } catch (error) {
            console.log('登录请求失败:', error);
            // setGlobalError('登录请求失败');
        } finally {
            setLoginLoading(false)
        }
    };


    useEffect(() => {
        const autologin = async ()=>{
            try {
                setLoginLoading(true);
                wait(1000)
                const response = await fetch('/api/login/', {
                    method: 'PUT', headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_account: idAccount,
                        pwd_account: pwdAccount,
                    }),
                });
                if (response.status === 200) {
                    const data = await response.json(); // 解析 JSON 数据
                    console.log('Login successful:', data);
                    // localStorage: 存储的数据不会过期，除非手动清除（如通过 JavaScript 或清除浏览器缓存）。
                    // sessionStorage: 存储的数据只在浏览器会话期间有效，当用户关闭浏览器或标签页时，数据会被清除。

                    // 数据固化
                    sessionStorage.setItem("loginAccount", JSON.stringify(data["data"]))
                    sessionStorage.setItem("token", data["token"])

                    await router.push('/main');
                } else {
                    // 假设服务器返回 JSON 对象中有错误信息
                    setGlobalError('请检查用户名或密码');
                    const data = await response.json();
                    console.log("登录失败，请检查用户名或密码", data)
                    // 可以根据具体的错误信息设置 idAccountError 和 pwdAccountError
                    // setIdAccountError('错误信息');
                    // setPwdAccountError('错误信息');
                }
            } catch (error) {
                console.log('登录请求失败:', error);
                // setGlobalError('登录请求失败');
            } finally {
                setLoginLoading(false)
            }
        }
        autologin()
    },[])
    return (<ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url("images/login_bg.png")',
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
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <ViewCarousel/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            机器人管理后台
                        </Typography>
                    </Box>
                    <Box component="form" noValidate onSubmit={handleLogin} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id_account"
                            label="登录名"
                            name="id_account"
                            autoComplete="email"
                            autoFocus
                            value={idAccount}
                            onChange={(e) => setIdAccount(e.target.value)}
                            error={!!idAccountError || !!globalError}
                            helperText={idAccountError || globalError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="pwd_account"
                            label="密码"
                            type="password"
                            id="pwd_account"
                            autoComplete="current-password"
                            value={pwdAccount}
                            onChange={(e) => setPwdAccount(e.target.value)}
                            error={!!pwdAccountError || !!globalError}
                            helperText={pwdAccountError || globalError}
                        />
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                        {/*    label="记住密码"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, position: 'relative'}}
                            disabled={loginLoading}
                        >
                            {loginLoading && (<CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '60%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />)}
                            {!loginLoading && (<span>登录</span>)}
                            {loginLoading && (<span>登录中</span>)}
                        </Button>
                        {/*<Grid container>*/}
                        {/*    <Grid item xs>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            忘记密码*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                        <Grid container justifyContent="right">
                            <Grid item>
                                <Link href="#">
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Avatar sx={{bgcolor: 'secondary.main', height: 17, width: 17}}>
                                            <TurnRight sx={{fontSize: 15}}/>
                                        </Avatar>
                                        生猪健康管理后台
                                    </Box>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Copyright sx={{
                                position: 'absolute', // 绝对定位在父容器底部
                                bottom: 0, textAlign: 'center',
                                mb: 4
                            }}/>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>);
}
