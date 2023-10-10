import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PostFormProps } from "../interfaces/post";
import { LoadingButton } from "@mui/lab";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
export default function PostForm({
  formTitle,
  title,
  content,
  onTitleChange,
  onContentChange,
  handleSubmit,
  loading,
}: PostFormProps) {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {`${formTitle}`}
        </Typography>
        <Paper elevation={3} sx={{ padding: "20px", width: "100%" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={onTitleChange}
              sx={{ marginBottom: 2 }}
              required
            />
            <Typography variant="h6" gutterBottom>
              Content
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              <QuillNoSSRWrapper
                theme="snow"
                value={content}
                onChange={onContentChange}
                modules={modules}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 2,
              }}
            >
              <Link href="/">
                <Button startIcon={<ArrowBackIcon />} variant="outlined">
                  Go Back
                </Button>
              </Link>
              <LoadingButton
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: 2 }}
                loading={loading}
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
