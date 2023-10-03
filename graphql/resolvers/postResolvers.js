const Post = require("./../../models/postSchema");

const postQueryMutat = {
  Query: {
    getPosts: async (req, res) => {
      try {
        const posts = await Post.find();
        console.log(posts);
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
module.exports = postQueryMutat;
