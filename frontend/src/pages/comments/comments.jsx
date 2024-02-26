import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Comments = ({ post }) => {
  //* Redux =========================
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // auth.isLoggedIn, auth.token, auth.userId;
  const { userProfile } = useSelector((state) => state.users);

  // =========================================

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleShare = () => {
    setShareCount(shareCount + 1);
  };

  // =========================================
  const [open, setOpen] = useState(false);

  const commentsModel = () => setOpen(true);
  const sharesModel = () => setOpen(true);
  const likeModel = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // =========================================

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // getLikesByPostId ===================================

  const [postLikes, setPostLikes] = useState([]);
  // [{post_id: 7, user_id: 2, user_name: 'Hunter', image: "URL"}]

  const getLikesByPostId = async () => {
    try {
      // console.log('auth.userId', auth.userId)

      // postsRouter.get("/like/:post_id", authentication, getLikesByPostId);
      const likes = await axios.get(
        `http://localhost:5000/posts/like/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      // console.log("likes.data.result", likes.data.result);
      setPostLikes(likes.data.result);
    } catch (error) {
      console.log("getLikesByPostId", error);
    }
  };
  useEffect(() => {
    getLikesByPostId();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid container item alignItems="center" xs={4}>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          onClick={handleLike}
        >
          {postLikes.includes(auth.userId) ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
          onClick={likeModel}
        >
          {post.likes} Likes
        </Link>
      </Grid>

      <Grid container item justifyContent="center" alignItems="center" xs={4}>
        <IconButton variant="plain" color="neutral" size="sm">
          <ModeCommentOutlined />
        </IconButton>
        <Link
          onClick={commentsModel}
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          {post.comments} comments
        </Link>
      </Grid>

      <Grid container item justifyContent="right" alignItems="center" xs={4}>
        <IconButton variant="plain" color="neutral" size="sm">
          <SendOutlined />
        </IconButton>
        <Link
          onClick={sharesModel}
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          {post.shares} shares
        </Link>
      </Grid>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          {/* <Face /> */}
          <Avatar size="sm" src={userProfile.image} />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
        />
        <Link underline="none" role="button">
          Post
        </Link>
      </CardContent>

      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* Modal /////////////////////// */}
      {/* //* ///////////////////////////// */}
      {/* //* ///////////////////////////// */}

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Likes
            <hr />
          </Typography>
          {postLikes.map((like) => (
            <Typography id="keep-mounted-modal-description">
              <Link
                component="span"
                underline="none"
                fontSize="16px"
                sx={{ color: "black", my: 0.5 }}
              >
                <Avatar
                  component="span"
                  sx={{ mr: 3 }}
                  size="sm"
                  src={like.image}
                />
                {like.user_name}
              </Link>
            </Typography>
          ))}
        </Box>
      </Modal>
    </Grid>
  );
};

export default Comments;
