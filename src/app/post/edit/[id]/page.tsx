"use client";

import * as React from "react";
import PostForm from "@/components/PostForm";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";
import LoadingIndicator from "@/components/LoadingIndicator";
import { submitData } from "@/utils/submitData";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { HttpMethod } from "@/utils/submitData";
import { useRouter } from "next/navigation";

export default function EditPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [severity, setSeverity] = React.useState<AlertColor>("info");
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const router = useRouter();

  const result = useQuery(
    ["post"],
    () => fetchData(`/api/posts/${params.id}`),
    {
      retry: false,
      onSuccess: ({ post, status }) => {
        // Handle the successful response here
        setTitle(post?.title);
        setContent(post?.content);
      },
      onError: (error) => {
        // Handle errors here
        const e = error as Error;
      },
    }
  );

  const handleClose = () => {
    setOpenSnackbar(false);
    setSeverity("info");
    setAlertMessage("");
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const mutation = useMutation(submitData, {
    onError: (error) => {
      // Handle the error here
      console.error("Mutation error:", error);
      const message = error instanceof Error ? error.message : "Failed.";
      setOpenSnackbar(false);
      setSeverity("error");
      setAlertMessage(message);
    },
    onSuccess: () => {
      setOpenSnackbar(true);
      setSeverity("success");
      setAlertMessage("Edited Successfully");
      router.push(`/post/detail/${params.id}`);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your submission logic here
    mutation.mutate({
      url: `/api/posts/${params.id}`,
      payload_data: {
        title,
        content,
      },
      http_method: HttpMethod.PUT,
    });
  };

  if (result?.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <PostForm
        formTitle="Edit Post"
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
