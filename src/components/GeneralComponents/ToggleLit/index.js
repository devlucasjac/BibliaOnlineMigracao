import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import DarkMode from "../../../context/DarkMode";

import { useContext, useEffect } from "react";

function ToggleLit() {
  const { isLit, setIsLit } = useContext(DarkMode);

  useEffect(() => {
    console.log(isLit);
  }, [isLit]);

  return (
    <IconButton
      size="medium"
      aria-label="show 4 new mails"
      color="inherit"
      onClick={() => setIsLit(!isLit)}
    >
      {isLit ? <Badge color="error">☀️</Badge> : <Badge>🌒</Badge>}
    </IconButton>
  );
}

export default ToggleLit;
