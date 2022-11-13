import * as React from 'react';
import styled from "@emotion/styled";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { token } from "../store/atom";

const StyledToolbar = styled(Toolbar)`
  display:flex;
  justify-content: space-between;
`;

function DrawerAppBar() {
  const navigate = useNavigate();
  const [tokenValue, setToken] = useRecoilState(token);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <StyledToolbar>
          <Typography
            variant="h6"
            component="div"
          >
            Home
          </Typography>
          <Box>
            <Button sx={{ color: '#fff' }} onClick={() => {
              setToken("")
              navigate(`/login`)}
            }>
              {tokenValue ? "LOGGED OUT" : "LOGIN"}
            </Button>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default DrawerAppBar;