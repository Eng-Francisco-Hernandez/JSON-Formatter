import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AceEditor from "react-ace";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [open, setOpen] = React.useState(false);

  const onChangeInput = (newValue: string) => {
    setInput(newValue);
  };

  const onChangeOutput = (newValue: string) => {
    setOutput(newValue);
  };

  const formatInput = () => {
    if (!input.trim().length) {
      setOutput("");
      return;
    }
    try {
      const parsedInput = JSON.parse(input);
      setOutput(JSON.stringify(parsedInput, null, "\t"));
    } catch (e) {
      setOutput("Invalid input JSON");
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    formatInput();
  }, [input]);

  return (
    <Box m={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
          >
            <Typography color="GrayText">JSON Formatter</Typography>
            <Stack gap={1} direction="row">
              <Button variant="outlined" size="small" onClick={formatInput}>
                Format
              </Button>
              <Tooltip
                title="Copy output"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  handleClick();
                }}
              >
                <IconButton size="small">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <AceEditor
            value={input}
            onChange={onChangeInput}
            name="input"
            wrapEnabled
            height="85vh"
            width="100%"
            mode="java"
            theme="github"
            tabSize={2}
            showPrintMargin={false}
          />
        </Grid>
        <Grid item xs={6}>
          <AceEditor
            value={output}
            onChange={onChangeOutput}
            name="output"
            wrapEnabled
            height="85vh"
            width="100%"
            mode="java"
            theme="github"
            tabSize={2}
            showPrintMargin={false}
          />
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Output copied to clipboard
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
