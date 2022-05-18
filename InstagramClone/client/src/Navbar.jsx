import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';;


const NavBar = (props) => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {(props.appName) ? props.appName : "Loading...."}
                    </Typography>


                    <Box sx={{ marginLeft: 100 }}>

                        {
                            (props.account) ? <Typography variant="subtitle1" color="initial">
                                {props.account}
                            </Typography> : <Typography>Not Connected</Typography>
                        }



                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
