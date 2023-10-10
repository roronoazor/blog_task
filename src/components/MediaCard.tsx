import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Post } from "@/interfaces/post";

export default function MediaCard({
  heading,
  text,
  post,
  handleOpenDeleteModal,
}: {
  heading: string;
  text: string;
  post: Post;
  handleOpenDeleteModal: () => void;
}) {
  return (
    <Card>
      <Image
        alt="Random image"
        //src="https://source.unsplash.com/random"
        src="https://www.wpbeginner.com/wp-content/uploads/2017/08/fallbackthumbnail.png"
        width={640}
        height={480}
        style={{
          maxWidth: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/post/detail/${post.id}`}>
          <Button size="small">View More</Button>
        </Link>
        <Button
          size="small"
          sx={{ color: "red" }}
          onClick={handleOpenDeleteModal}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
