import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col, Spin, Alert, Modal, message } from "antd";
import { getHistory } from "../services/getApi";
import { returnBook } from "../services/putApi";

const { Title, Text } = Typography;
const defaultBookImage = "https://via.placeholder.com/150";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        console.log(data);
        
        setHistory(data.history);
      } catch (err) {
        setError("Failed to fetch borrowing history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const showModal = (book) => {
    setSelectedBook(book);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedBook) {
      try {
        console.log(selectedBook);
        
        const response = await returnBook(selectedBook._id );
        message.success(`Successfully returned the book: ${selectedBook.title}`);
        setHistory((prevHistory) =>
          prevHistory.map((record) =>
            record._id === selectedBook._id

              ? { ...record, status: "returned", returnDate: response.returnDate }
              : record
          )
        );
      } catch (error) {
        message.error(`Failed to return the book: ${selectedBook.title}`);
      }
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Borrowing History</Title>
      {history.length === 0 ? (
        <Text>No borrowing history found.</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {history.map((record) => (
            <Col xs={24} sm={12} md={8} lg={6} key={record._id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={record.book.title}
                    src={defaultBookImage}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                }
                actions={[
                  <Button
                    type={record.status === "borrowed" ? "primary" : "default"}
                    disabled={record.status === "returned"}
                    onClick={() => showModal(record)} // Open the modal when clicking Return
                  >
                    {record.status === "borrowed" ? "Return" : "Returned"}
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={record.book.title}
                  description={`Author: ${record.book.author}`}
                />
                <Text type="secondary">
                  Borrowed on: {new Date(record.borrowDate).toLocaleDateString()}
                </Text>
                <br />
                <Text type="secondary">
                  Due Date: {new Date(record.dueDate).toLocaleDateString()}
                </Text>
                {record.returnDate && (
                  <div>
                    <Text type="success">
                      Returned on: {new Date(record.returnDate).toLocaleDateString()}
                    </Text>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal for confirmation */}
      <Modal
        title="Confirm Return"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Return Book"
        cancelText="Cancel"
      >
        <p>Are you sure you want to return the book " {selectedBook?.title}"?</p>
      </Modal>
    </div>
  );
};

export default History;
