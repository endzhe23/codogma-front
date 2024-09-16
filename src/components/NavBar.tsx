"use client";
import * as React from 'react';
import {memo, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Link from "next/link";
import {useAuth} from "@/components/AuthProvider";
import {ThemeToggleButton} from "@/components/ThemeContext";
import {ButtonGroup, Skeleton} from "@mui/material";
import {logout} from "@/helpers/authApi";
import {UserRole} from "@/types";
import {useRouter} from "next/navigation";
import {AvatarImage} from "@/components/AvatarImage";
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from "@mui/icons-material/Create";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const {state} = useAuth();
    console.log(state);

    const handleLogout = () => {
        logout().then(() => router.push('/articles'));
        handleCloseUserMenu();
    };

    const handleProfile = () => {
        router.push(`/users/${state.user?.username}`);
        handleCloseUserMenu();
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <AppBar className="nav-app-bar">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Link href="/">
                        <Typography
                            variant="h5"
                            noWrap
                            component="h5"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LINKED<StickyNote2OutlinedIcon/>
                        </Typography>
                    </Link>
                    <ButtonGroup variant="text" sx={{display: {xs: 'flex'}, mr: 1, ml: 'auto', color: "inherit"}}>
                        <Link href="/articles/#search-input">
                            <IconButton color="inherit">
                                <SearchIcon/>
                            </IconButton>
                        </Link>
                        <IconButton color="inherit">
                            <LanguageIcon/>
                        </IconButton>
                        <ThemeToggleButton sx={{color: "inherit"}}/>
                    </ButtonGroup>
                    <Box sx={{flexGrow: 0}}>
                        {!state.isAuthenticated && (
                            <>
                                <Link href={`/sign-up`}><Button color="inherit">Register</Button></Link>
                                <Link href={`/sign-in`}><Button color="inherit"><LoginIcon/></Button></Link>
                            </>
                        )}
                        {state.isAuthenticated && (
                            <>
                                {loading ? (
                                    <div className="Open settings">
                                        <Skeleton variant="rounded" width={40} height={40}/>
                                    </div>
                                ) : (
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} color="inherit" sx={{p: 0}}>
                                            <AvatarImage alt={state.user?.username} key={new Date().getTime()}
                                                         variant="rounded"
                                                         src={state.user?.avatarUrl} size={40}/>
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleProfile}>
                                        <Typography
                                            textAlign="center"><PersonIcon className="mr-2"
                                                                           fontSize="small"/>Profile</Typography>
                                    </MenuItem>
                                    {state.user?.role === UserRole.ROLE_AUTHOR && (
                                        <Link href={`/create-article`}>
                                            <MenuItem>
                                                <Typography textAlign="center"><CreateIcon fontSize="small"/> Create
                                                    article</Typography>
                                            </MenuItem>
                                        </Link>
                                    )}
                                    {state.user?.role === UserRole.ROLE_ADMIN && (
                                        <Link href={`/create-category`}>
                                            <MenuItem>
                                                <Typography textAlign="center"><CategoryIcon fontSize="small"/> Create
                                                    category</Typography>
                                            </MenuItem>
                                        </Link>
                                    )}
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center"><LogoutIcon fontSize="small"/> Log
                                            out</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default memo(NavBar);
