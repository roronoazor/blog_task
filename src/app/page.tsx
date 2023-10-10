"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import MediaCard from "@/components/MediaCard";
import Link from "next/link";
import { Post } from "@/interfaces/post";
import { getPosts } from "@/firebase/firestore";
import DeletePostDialog from "@/components/DeletePostModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetchData";
import LoadingIndicator from "@/components/LoadingIndicator";
import { submitData, HttpMethod } from "@/utils/submitData";
import { Snackbar, AlertColor } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";

export default function HomePage() {
  //const posts: Post[] = await getPosts(10, "", "1");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [severity, setSeverity] = React.useState<AlertColor>("info");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const queryClient = useQueryClient();
  const result = useQuery(["posts"], () => fetchData(`/api/posts?page=&q=`), {
    retry: false,
    onSuccess: ({ posts, status, page }) => {
      // Handle the successful response here
      setPosts(posts);
    },
    onError: (error) => {
      // Handle errors here
      const e = error as Error;
    },
  });

  const mutation = useMutation(submitData, {
    onError: (error) => {
      // Handle the error here
      const message = error instanceof Error ? error.message : "Failed.";
      setOpenSnackbar(true);
      setSeverity("error");
      setAlertMessage(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setSelectedPost(null);
      setOpenDeleteModal(false);
      setOpenSnackbar(true);
      setAlertMessage("Deleted Successfully");
      setSeverity("success");
    },
  });

  const handleOpenDeleteModal = (post: Post) => {
    setSelectedPost(post);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPost(null);
  };

  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your submission logic here
    mutation.mutate({
      url: `/api/posts/${selectedPost?.id}`,
      payload_data: {},
      http_method: HttpMethod.DELETE,
    });
  };

  const closeAlert = () => {
    setOpenSnackbar(false);
    setSeverity("info");
    setAlertMessage("");
  };

  const handleSearch = () => {};

  if (result?.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginY: "1%",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: "8px", height: "8%" }}
              size="small"
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#000", height: "5%", marginRight: "4px" }}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Link href={"/post"}>
              <Button variant="contained" sx={{ backgroundColor: "#000" }}>
                Create Post
              </Button>
            </Link>
          </Box>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {posts.map((post) => (
              <Grid key={post.id} xs={6}>
                <MediaCard
                  post={post}
                  heading={`${post.title}`}
                  text=""
                  handleOpenDeleteModal={() => handleOpenDeleteModal(post)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <DeletePostDialog
          post={selectedPost}
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleSubmit={handleDelete}
          loading={mutation?.isLoading}
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={closeAlert}
        >
          <Alert
            onClose={closeAlert}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {`${alertMessage}`}
          </Alert>
        </Snackbar>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2%",
        }}
      >
        <Pagination count={10} variant="outlined" onChange={() => {}} />
      </Box>
    </>
  );
}
