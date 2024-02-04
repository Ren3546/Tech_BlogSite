const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Render all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render one post
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post with that id! "});
      return;
    }
    res.render('post', {
        title: postData.title,
        content: postData.content,
        username: postData.user ? postData.user.username : null,
        comments: postData.comments,
        createdAt:postData.createdAt,
        logged_in: req.session.logged_in, }); // Assuming 'post' is the Handlebars view
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post with a logged-in user
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post with a logged-in user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id, userId: req.session.user_id },
    });

    if (!updatedPost[0]) {
      res.status(404).json({ message: "No post with that id!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete all comments
    await Comment.destroy({
      where: { postId: req.params.id },
    });

    const deletedPost = await Post.destroy({
      where: { id: req.params.id, userId: req.session.user_id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "No post that id!" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
