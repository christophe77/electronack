import React, { FC } from 'react';
import styled from 'styled-components';
import { AppBar, Bar, Button, Toolbar, } from 'react95';
import useSocket from './useSocket';
import { BottomBar } from './BottomBar';
const Wrapper = styled.div`
position:relative;
  padding: 5rem;
  width:100%;
  height:100%;
  background: teal;
 
`;
const Home: FC = () => {
    const { bots, broadcast, startListening, serverStatus } = useSocket();
    return (
        <Wrapper>
            <AppBar>
                <Toolbar>
                    <Bar size={35} />
                    <span>ElectronAck</span>
                    <Bar size={35} />
                </Toolbar>
            </AppBar>

            <Button onClick={() => { broadcast("son of a bit") }}>broadcast</Button>

            {bots?.length > 0 && bots.map((bot, i) => {
                return (
                    <p key={i}>{bot.name}</p>
                )
            })}
            <BottomBar startListening={startListening} serverStatus={serverStatus} />
        </Wrapper>
    )
}
export default Home

