import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { getPostDetail } from "@/firebase/firestore";
import { Post } from "@/interfaces/post";

interface PostDetailProps {
  title: string;
  content: string;
  timestamps: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const post: Post | undefined = await getPostDetail(params.id);

  return (
    <Container>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "16px",
            }}
            aria-label="text button group"
          >
            <Link href="/">
              <Button
                color="secondary"
                startIcon={<ArrowBackIcon />}
                sx={{ marginRight: "1" }}
              >
                Go Back
              </Button>
            </Link>
            <Link href={`/post/edit/${params.id}`}>
              <Button startIcon={<EditIcon />} sx={{ marginRight: "1" }}>
                Edit
              </Button>
            </Link>
          </Box>
        </Box>
        <Typography variant="h4" gutterBottom>
          {post?.title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {`Created At: `} {post?.createdAt?.toString()}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          {"Last Updated At: "} {post?.updatedAt?.toString()}
        </Typography>
        <Paper elevation={3} sx={{ padding: "20px", width: "100%" }}>
          <Box
            component="div"
            sx={{ margin: "20px 0" }}
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </Paper>
      </Box>
    </Container>
  );
}
