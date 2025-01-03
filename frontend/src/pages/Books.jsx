import { useEffect, useState } from "react";
import Book from "../components/common/Book";
import Div from "../components/common/Div";
import Text from "../components/common/Text";
import { Pagination, Input } from "antd"; // Added Input for search
import { getBooks } from "../services/postApi";
import debounce from "lodash/debounce"; // Import debounce from lodash

const Books = () => {
  const ITEMS_PER_PAGE = 8; // Number of books per page
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [books, setBooks] = useState([]); // Fetched books
  const [totalBooks, setTotalBooks] = useState(0); // Total number of books
  const [loading, setLoading] = useState(false); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch books from API
  const fetchBooks = async (page, limit, search) => {
    setLoading(true);
    try {
      const data = await getBooks({ page, limit, search });
      setBooks(data.books); // Set fetched books
      setTotalBooks(data.total); // Set total count of books
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books whenever the page or searchQuery changes
  useEffect(() => {
    fetchBooks(currentPage, ITEMS_PER_PAGE, searchQuery);
  }, [currentPage, searchQuery]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Debounced search handler
  const handleSearch = debounce((value) => {
    setCurrentPage(1); // Reset to the first page on new search
    setSearchQuery(value);
  }, 500);

  return (
    <Div className={"px-10"}>
      <Div className={"flex flex-col sm:flex-row justify-between items-center"}>
        <Text tag={"h1"} className={"text-2xl font-bold"}>
          Book List
        </Text>

        {/* Search Field */}
        <Input
          placeholder="Search books..."
          className="w-full sm:w-1/3 mt-4 sm:mt-0"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Div>

      {/* Loading Indicator */}
      {loading ? (
        <Div className="flex justify-center mt-4">
          <Text tag={"p"} className="text-lg">Loading...</Text>
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
          <Div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={ITEMS_PER_PAGE}
              total={totalBooks}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </Div>
        </>
      )}
    </Div>
  );
};

export default Books;


