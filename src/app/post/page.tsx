"use client";

import * as React from "react";
import "react-quill/dist/quill.snow.css";
import PostForm from "@/components/PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitData } from "@/utils/submitData";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { useRouter } from "next/navigation";
import DeletePostDialog from "@/components/DeletePostModal";
import { Post } from "@/interfaces/post";

export default function CreatePost() {
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [severity, setSeverity] = React.useState<AlertColor>("info");
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
    setSeverity("info");
    setAlertMessage("");
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({
      url: `/api/posts`,
      payload_data: {
        title,
        content,
      },
    });
  };

  const mutation = useMutation(submitData, {
    onError: (error) => {
      // Handle the error here
      const message = error instanceof Error ? error.message : "Failed.";
      setOpenSnackbar(true);
      setSeverity("error");
      setAlertMessage(message);
    },
    onSuccess: ({ data: { message, post } }) => {
      setOpenSnackbar(true);
      setSeverity("success");
      setAlertMessage("Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(`/post/detail/${post.id}`);
    },
  });

  return (
    <>
      <PostForm
        formTitle="Create Post"
        title={title}
        content={content}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
        handleSubmit={handleSubmit}
        loading={mutation?.isLoading}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {`${alertMessage}`}
        </Alert>
      </Snackbar>
    </>
  );
}
