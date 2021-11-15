const express = require("express");
let router = express.Router();
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
const { sortArgsHelper } = require("../../config/helpers");
require("dotenv").config();

const { Article } = require("../../models/articleModel");
const { route } = require("./users");

router
  .route("/admin/addarticle")
  .post(
    checkLoggedIn,
    grantAccess("createAny", "article"),
    async (req, res) => {
      try {
        const article = new Article({
          ...req.body
        });
        const result = await article.save();
        res.status(200).json(article);
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: "Error adding article.", error: error });
      }
    }
  );

router
  .route("/admin/:id")
  .get(checkLoggedIn, grantAccess("readAny", "article"), async (req, res) => {
    try {
      const _id = req.params.id;
      const article = await Article.findById(_id);
      if (!article || article.length === 0) {
        return res.status(400).json({ message: "Article not found." });
      }
      res.status(200).json(article);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error retrieving info. ", error });
    }
  })
  .patch(
    checkLoggedIn,
    grantAccess("updateAny", "article"),
    async (req, res) => {
      try {
        const _id = req.params.id;
        const article = await Article.findOneAndUpdate(
          { _id },
          { $set: req.body },
          { new: true }
        );

        if (!article) {
          return res.status(400).json({ message: "Article not found." });
        }

        res.status(200).json(article);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating article. ", error });
      }
    }
  )
  .delete(
    checkLoggedIn,
    grantAccess("deleteAny", "article"),
    async (req, res) => {
      try {
        const _id = req.params.id;
        const article = await Article.findOneAndRemove(_id);

        if (!article) {
          return res.status(400).json({ message: "Article not found." });
        }

        res.status(200).json(article);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error deleting article. ", error });
      }
    }
  );

router
  .route("/admin/paginate")
  .post(checkLoggedIn, grantAccess("readAny", "articles"), async (req, res) => {
    try {
      const limit = req.body.limit ? req.body.limit : 5;
      const aggQuery = Article.aggregate();
      const options = {
        page: req.body.page,
        limit: limit,
        sort: { _id: "desc" }
      };
      const articles = await Article.aggregatePaginate(aggQuery, options);
      res.status(200).json(articles);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Pagination error. ", error });
    }
  });

router.route("/getbyid/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    const article = await Article.find({ _id: _id, status: "public" });
    if (!article || article.length === 0) {
      return res.status(400).json({ message: "Article not found." });
    }
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error retrieving article. ", error });
  }
});

router.route("/loadmore").post(async (req, res) => {
  try {
    let sortArgs = sortArgsHelper(req.body);
    const articles = await Article.find({ status: "public" })
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);
    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error loading more. ", error });
  }
});

module.exports = router;
