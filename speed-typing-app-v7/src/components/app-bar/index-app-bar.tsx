import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { memo, useContext, useState } from "react";
import { Box, styled, IconButton } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";
import CustomAvatar from "../custom-avatar/index-custom-avatar";
import databaseSingleton from "../../utils/database-operations";
import StatisticsModal from "../statistics-modal/index-statistics-modal";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const CustomAppBar = styled(AppBar)(() => ({
  maxHeight: "70px",
}));

const CustomAvatarContainer = styled(Box)(() => ({
  width: "70px",
  height: "70px",
}));
const GameAppBar = memo(() => {
  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statisticsInformation, setStatisticsInformation] = useState("");

  function closeModal() {
    setIsModalOpen(false);
  }
  async function callUSerGameInfo() {
    try {
      const result = await databaseSingleton.getUserGameData({
        email: state?.validatedUserEmail as string,
      });

      if (result.success) {
        setStatisticsInformation(result.data as string);
        setIsModalOpen(true);
      } else {
        console.log(`Failed to retrieve game data: ${result.message}`);
      }
    } catch (error) {
      console.error("Error retrieving user game data:", error);
    }
  }

  function logoutHandler() {
    dispatch!({ type: "notify-user-offline" });
    navigate("/login");
  }

  return (
    <CustomAppBar position="static">
      <Toolbar>
        <StatisticsModal
          open={isModalOpen}
          handleClose={closeModal}
          statistics={statisticsInformation}
        />

        <CustomAvatarContainer>
          <CustomAvatar src={state?.validatedUserAvatar as string} />
        </CustomAvatarContainer>

        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {state?.validatedUserName || "*testing*"}
        </Typography>

        <IconButton onClick={callUSerGameInfo}>
          <EqualizerIcon />
        </IconButton>

        <IconButton onClick={logoutHandler}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </CustomAppBar>
  );
});

export default GameAppBar;
