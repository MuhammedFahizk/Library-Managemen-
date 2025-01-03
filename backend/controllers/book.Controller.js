import { json } from "express";
import { Book } from "../models/Book.js";
import Borrow from "../models/Borrow.js";

/*
  1. CRETE NEW BOOK CONTROLLER 
*/
export const createBook = async (req, res) => {
  try {
    // Extract data from the request body
    const { title, author, isbn, pubYear, availableCopies, coverImg } = req.body.data;
    console.log(req);
    
    // Create a new book instance
    const newBook = new Book({
      uploadUser: req.userId, 
      title,
      author,
      isbn,
      pubYear,
      availableCopies,
      coverImg,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    // Respond with success
    res.status(201).json({
      message: "Book created successfully",
      book: savedBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);

    // Handle duplicate ISBN error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A book with this ISBN already exists",
      });
    }

    // Respond with an error
    res.status(500).json({
      message: "Failed to create book",
      error: error.message,
    });
  }
};


/*
 2.GET ALL BOOK WITH PAGINATION 
*/

export const fetchBooks = async (req, res) => {
    try {
        const { page = 1, limit = 8 , } = req.params; 
        const {search: searchQuery} = req.body
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        // Fetch books from database with pagination
        const books = await Book.find({
            title: { $regex: searchQuery, $options: "i" }, 
          })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        // Count total books for pagination
        const totalBooks = await Book.countDocuments();
            console.log(books);
            
        // Send the books and total count
        res.status(200).json({ books, total: totalBooks });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Error fetching books", error });
    }
};

/*
3.BORROW BOOK BY ID 
*/
export const borrowBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.userId; // Assume req.user contains the authenticated user's data
    
        // Find the book
        const book = await Book.findById(bookId);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
    
        // Check if there are available copies
        if (book.availableCopies <= 0) {
          return res.status(400).json({ message: "No copies available" });
        }
    
        // Calculate due date (14 days from now)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // Add 14 days
    
        // Create a borrowing record
        const borrowRecord = new Borrow({
          user: userId,
          book: bookId,
          dueDate: dueDate,
        });
    
        // Save the borrowing record
        await borrowRecord.save();
    
        // Decrease the available copies of the book
        book.availableCopies -= 1;
        await book.save();
    
        res.status(200).json({ message: "Book borrowed successfully", borrowRecord });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
  };

  /*
4. FETCH HISTORY OF BORROWING BOOK BY USER 
*/
export const fetchHistory = async( req, res) => {
    try {
        const userId = req.userId;
    const history = await Borrow.find({ user: userId })
      .populate("book", "title author isbn pubYear availableCopies")
      .sort({ borrowDate: -1 });

    if (!history || history.length === 0) {
      return res.status(404).json({ message: "No borrowing history found." });
    }

    return res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching borrowing history:", error);

    return res.status(500).json({
      message: "An error occurred while fetching your borrowing history.",
    });
  }
}  


 /*
4. RETURN BORROWING BOOK FOR  USER 
*/

export const returnBook = async (req, res) => {
    try {
      const { borrowId } = req.params;
      const userId = req.userId;
      console.log(borrowId);
      
      const borrowRecord = await Borrow.findById(borrowId);
      if (!borrowRecord) {
        console.log(
            "Borrow record not found with id:",
        );
        
        return res.status(404).json({ message: "Borrow record not found" });
      }
      
      if (borrowRecord.user.toString() !== userId) {
        return res.status(403).json({ message: "You can only return books you borrowed" });
      }
      
      if (borrowRecord.status === "returned") {
        return res.status(400).json({ message: "This book has already been returned" });
      }
  
      borrowRecord.returnDate = new Date();
      borrowRecord.status = "returned";
      
      await borrowRecord.save();
      
      const book = await Book.findById(borrowRecord.book);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      book.availableCopies += 1;
      await book.save();
      
      res.status(200).json({ message: "Book returned successfully", borrowRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };