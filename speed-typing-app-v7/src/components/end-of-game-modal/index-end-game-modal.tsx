// This is the modal that will be displayed when the game finishes

import StatisticsVisualizer from "../statistics-visualizer/index-statistics-visualizer";

import { Typography, Paper, Button, Modal, styled } from "@mui/material";
// import { useContext } from "react";
// import { SpeedTypeContext } from "../../general-store/context-provider";

const CustomEndGameModal = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  borderStyle: "solid",
  borderBlockColor: "white",
  borderWidth: "5px",
  width: "80%",
  height: "90%",
  padding: "5px",
  top: "5%",
  left: "10%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

type EndGameModalPropsType = {
  open: boolean;
  handleClose: () => void;

  // I need to think more about the information recieved
};

export default function EndGameModal({
  open,
  handleClose,
}: // I need to think more about the information recieved
EndGameModalPropsType) {
  // const state = useContext(SpeedTypeContext);

  // console.log("END GAME MODAL OPEN: ", open);
  // console.log("END GAME MODAL STATE: ", state);
  return (
    <Paper>
      <CustomEndGameModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Typography variant="endGameModal">Game Finished</Typography>
          <StatisticsVisualizer />

          <Button
            onClick={() => {
              handleClose();
            }}
            variant="playAgain"
          >
            Play Again
          </Button>
        </>
      </CustomEndGameModal>
    </Paper>
  );
}
