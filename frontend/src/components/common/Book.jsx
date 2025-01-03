import React from "react";
import { Button, Card, Modal, Typography, notification } from "antd";
import { borrowBook } from "../../services/postApi"; // Import the borrowBook API function
import Div from "./Div";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const defaultBookImage = "https://via.placeholder.com/150"; 

const { Text, Title } = Typography;

const Book = ({ book, setBooks }) => { 
  const { isLoggedIn } = useSelector(state => state.auth);

  const handleBorrow = () => {
    if (book.availableCopies > 0) {
      Modal.confirm({
        title: 'Are you sure you want to borrow this book?',
        content: `You are about to borrow "${book.title}".`,
        onOk: async () => {
          try {
            const data = await borrowBook({ bookId: book._id });
            console.log('Book borrowed successfully:', data);

            // Show success notification
            notification.success({
              message: 'Book Borrowed',
              description: `You have successfully borrowed "${book.title}". Enjoy reading!`,
              placement: 'topRight',
              duration: 3,
            });
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
    <Div className="book-card h-fit">
      <Card
        className="min-h-[400px] shadow-lg rounded-xl transition-transform transform hover:scale-105"
        hoverable
        style={{
          width: 240,
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
        <Div className="p-3 bg-white rounded-lg">
          <Title level={4} className="text-lg font-semibold mb-2 text-gray-900">
            {book.title}
          </Title>
          
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
          <Div className="flex justify-center py-3">
            {
              isLoggedIn ? (
                <Button
                  disabled={book.availableCopies === 0}
                  className={`btn-primary w-full ${book.availableCopies === 0 ? 'bg-gray-300' : 'bg-blue-600'} hover:bg-blue-700 transition duration-300`}
                  onClick={handleBorrow}
                >
                  {book.availableCopies === 0 ? 'Out of Stock' : 'Borrow'}
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white text-center py-2 rounded-md"
                >
                  Login to Borrow
                </Link>
              )
            }
          </Div>
        </Div>
      </Card>
    </Div>
  );
};

export default Book;
