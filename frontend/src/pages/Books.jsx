import { useEffect, useState } from "react";
import { BookOutlined, SearchOutlined } from "@ant-design/icons";
import Book from "../components/common/Book";
import Div from "../components/common/Div";
import Text from "../components/common/Text";
import { Pagination, Input, Spin, Button } from "antd"; // Import new components
import { getBooks } from "../services/postApi";
import debounce from "lodash/debounce";

const Books = () => {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async (page, limit, search) => {
    setLoading(true);
    try {
      const data = await getBooks({ page, limit, search });
      setBooks(data.books);
      setTotalBooks(data.total);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, ITEMS_PER_PAGE, searchQuery);
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = debounce((value) => {
    setCurrentPage(1);
    setSearchQuery(value);
  }, 500);

  return (
    <Div className={"px-8 sm:px-16"}>
      <Div className={"flex flex-col sm:flex-row justify-between items-center py-6"}>
        <Text tag={"h1"} className={"text-3xl font-extrabold text-gray-800"}>
          Book List
        </Text>

        {/* Search Field with clear button */}
        <div className="relative mt-4 sm:mt-0 w-full sm:w-1/3">
          <Input
            placeholder="Search books..."
            className="w-full pr-12"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
          />
          {searchQuery && (
            <Button
              type="text"
              className="absolute right-2 top-2"
              icon={<BookOutlined />}
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </Div>

      {/* Loading Spinner */}
      {loading ? (
        <Div className="flex justify-center mt-10">
          <Spin size="large" />
        </Div>
      ) : (
        <>
          {/* Book Grid */}
          <Div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 rounded-lg">
            {books.map((book, index) => (
              <Book key={index} book={book} />
            ))}
          </Div>

          {/* Pagination */}
          <Div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={ITEMS_PER_PAGE}
              total={totalBooks}
              onChange={handlePageChange}
              showSizeChanger={false}
              className="pagination-style"
            />
          </Div>
        </>
      )}

     
     
    </Div>
  );
};

export default Books;
