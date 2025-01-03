import React from "react";
import { Button, Card, Modal, Typography } from "antd";
import { borrowBook } from "../../services/postApi"; // Import the borrowBook API function
import Div from "./Div";

const defaultBookImage = "https://via.placeholder.com/150"; 

const { Text, Title } = Typography;

const Book = ({ book, setBooks }) => { 

  const handleBorrow = () => {
    if (book.availableCopies > 0) {
      Modal.confirm({
        title: 'Are you sure you want to borrow this book?',
        content: `You are about to borrow "${book.title}".`,
        onOk: async () => {
          try {
            // Call the borrowBook API to borrow the book
            const data = await borrowBook({ bookId: book._id });
            console.log('Book borrowed successfully:', data);

            
          } catch (error) {
            console.error('Error borrowing the book:', error);
            Modal.error({
              title: 'Error',
              content: 'An error occurred while borrowing the book. Please try again later.',
            });
          }
        },
        onCancel() {
          console.log('Borrowing action cancelled');
        },
      });
    }
  };

  return (
    <Div className="book-card h-fit ">
      <Card
        className="min-h-[400px]"
        hoverable
        style={{
          width: 240,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
        cover={
          <img
            alt={book.title}
            src={defaultBookImage}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        }
      >
        <Div className="p-1 bg-white rounded-lg">
          <Title level={4} className="text-lg font-semibold">{book.title}</Title>
          
          <Text type="secondary" className="text-sm">{book.author}</Text>
          <br />
          
          <Text type="secondary" className="text-sm">ISBN: {book.isbn}</Text>
          <br />

          {/* Availability */}
          {book.availableCopies > 0 ? (
            <Text className="text-green-500 mt-2 text-sm">
              <span className="font-medium">Available Copies:</span> {book.availableCopies}
            </Text>
          ) : (
            <Text className="text-red-500 mt-2 text-sm">
              <span className="font-medium">No copies available</span>
            </Text>
          )}
          
          {/* Borrow Button */}
          <Div className="flex justify-end py-2">
            <Button
              disabled={book.availableCopies === 0}
              className="btn-primary"
              onClick={handleBorrow}
            >
              Borrow
            </Button>
          </Div>
        </Div>
      </Card>
    </Div>
  );
};

export default Book;
