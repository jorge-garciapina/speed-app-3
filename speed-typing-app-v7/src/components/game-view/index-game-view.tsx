import CustomPaper from "../../mui-configurations/styled-components/custom-paper";
import { Grid, Container } from "@mui/material";
import { memo } from "react";

import LateralMenuComponent from "../lateral-menu/index-lateral-menu";
import GameAppBar from "../app-bar/index-app-bar";
import CurrentWordVisualizer from "../word-visualizer/index-word-visualizer";

import WritingComponent from "../writing-component/index-writing";

import CustomGameView from "../../mui-configurations/styled-components/custom-game-view";
import CustomWordContainer from "../../mui-configurations/styled-components/custom-word-container";

const GameView = memo(() => {
  return (
    <CustomGameView>
      <GameAppBar />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <LateralMenuComponent />
          </Grid>
          <Grid item xs={10}>
            <CustomPaper elevation={24}>
              <CustomWordContainer>
                <CurrentWordVisualizer />
              </CustomWordContainer>
              <CustomWordContainer>
                <WritingComponent />
              </CustomWordContainer>
            </CustomPaper>
          </Grid>
        </Grid>
      </Container>
    </CustomGameView>
  );
});

export default GameView;
