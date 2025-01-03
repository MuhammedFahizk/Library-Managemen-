import express from "express";
import bookController from "../controllers/index.js";
import { requireAuthentication } from "../middleware/autchCheck.js";

const router = express.Router();

/**
 * @method POST
 * @route /api/books/upload
 * @description This route allows authenticated users to upload a new book.
 * @access Private (requires authentication)
 */
router.post("/upload", requireAuthentication, bookController.createBook);

/**
 * @method POST
 * @route /api/books/fetchBooks/:page/:limit
 * @description This route fetches a list of books with pagination.
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of books to fetch per page.
 * @access Private (requires authentication)
 */
router.post(
  "/fetchBooks/:page/:limit/",
  requireAuthentication,
  bookController.fetchBooks
);

/**
 * @method POST
 * @route /api/books/borrow/:bookId
 * @description This route allows users to borrow a book. It decreases the available copies when the user borrows a book.
 * @param {string} bookId - The ID of the book to borrow.
 * @access Private (requires authentication)
 */
router.post(
  "/borrow/:bookId",
  requireAuthentication,
  bookController.borrowBook
);

/**
 * @method GET
 * @route /api/users/history
 * @description This route retrieves a user's borrowing history.
 * @access Private (requires authentication)
 */

router.get("/history", requireAuthentication, bookController.fetchHistory);

/**
 * @method PUT
 * @route /api/users/return/:borrowId
 * @description This route allows a user to return a borrowed book.
 * @access Private (requires authentication)
 */

router.put("/return/:borrowId", requireAuthentication, bookController.returnBook);

export default router;
