const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const PostModel = require('../models/post')
const async = require('async')
const multer = require('multer')
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`)
  }
})

const upload = multer({ storage: storage })

// GET help message.
router.get('/', (req, res, next) => {
  res.send(`This is an API that allows you to get my, Angry3vilbot's, blog posts.\n In order to use it in your front end you will have to use the correct URIs. Here is the list of all of them: \n /blogs ———— Provides all blog posts as JSON \n /blog/:id ———— Provides a specific blog post by its _id \n`)
});

// GET all non-hidden blog posts.
router.get('/blogs', async (req, res) => {
  try {
    const posts = await PostModel.find({ isHidden: false })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET all blog posts
router.get('/blogs/admin', async (req, res) => {
  try {
    const posts = await PostModel.find()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET blog post by _id.
router.get('/blog/:id', async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id)
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST pre-made blogs for testing purposes.
router.post('/blogs/test', async (req, res) => {

  const postA = new PostModel({
    title: "This is post number one",
    date: new Date(),
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  })

  const postB = new PostModel({
    title: "This is a post too",
    date: new Date(),
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  })

  const postC = new PostModel({
    title: "This is number 3 of the posts",
    date: new Date("12.12.2019"),
    content: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
  })
  
  async.parallel({
    postA_res(callback) {
      postA.save(callback)
    },
    postB_res(callback) {
      postB.save(callback)
    },
    postC_res(callback) {
      postC.save(callback)
    }
  }, (err, res) => {
    if(err) {
      console.error(err)
    }
  })
})

// POST new post.
router.post('/', upload.single('imageUpload'), (req, res) => {
  let imageData = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
  let imageType = req.file.mimetype

  const blogPost = new PostModel({
    title: req.body.title,
    content: req.body.content,
    image: {
      data: imageData,
      contentType: imageType,
    },
    date: new Date(),
    comments: []
  })
  blogPost.save()
})

// POST new comment.
router.post('/blog/:id', async (req, res, next) => {
  const comment = {
    username: req.body.username,
    comment: req.body.comment,
    date: new Date()
  }

  await PostModel.findByIdAndUpdate(req.params.id, { $push: { comments: comment } })
  .catch(err => next(err))
  res.json({success: true})
})

// POST deletion of a post
router.post('/blog/:id/delete', async (req, res, next) => {
  await PostModel.findByIdAndDelete(req.params.id)
  .catch(err => next(err))
  res.json({success: true})
})

// POST hidden status change.
router.post('/blog/:id/hide', async (req, res, next) => {
  let post = await PostModel.findById(req.params.id).catch(err => next(err))
  await PostModel.findByIdAndUpdate(post._id, { $set: { isHidden: !post.isHidden } })
  .catch((err) => next(err))
  res.json({success: true})
})

module.exports = router;