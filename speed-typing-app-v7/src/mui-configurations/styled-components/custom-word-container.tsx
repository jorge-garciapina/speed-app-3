import { Container } from "@mui/material";
import { styled } from "@mui/material";
const CustomWordContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "40%",
  width: "90%",
  backgroundColor: theme.palette.primary.dark,
  //   backgroundColor: "red",
  marginTop: "10px",
}));

export default CustomWordContainer;
