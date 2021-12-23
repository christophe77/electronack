import React, { FC } from 'react';
import { AppBar, Toolbar, Button } from 'react95';
import styled from 'styled-components';

type BottomBarProps = {
  startListening: () => void,
  serverStatus: string
}
const Wrapper = styled.div`
  position: absolute;
  bottom:0;
 
`;
export const BottomBar: FC<BottomBarProps> = (props) => {
  const { startListening, serverStatus } = props;
  return (
    <Wrapper>
      <AppBar style={{bottom:0, top:"500px"}}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button
              onClick={startListening}
              style={{ fontWeight: 'bold' }}
            >
              Connect
            </Button>
          </div>
          <span>server status :  {serverStatus}</span>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};