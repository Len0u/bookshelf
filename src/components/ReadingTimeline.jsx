import { useBookContext } from "../contexts/BookContext";
import "../css/ReadingTimeline.css";

function ReadingTimeline() {
  const { shelf } = useBookContext();

  // Filter books that have start dates
  const booksWithDates = shelf.filter(book => book.startDate && book.endDate);
  
  
  // Group books by month
  const getMonthKey = (date) => {
    // Handle both Date objects and date strings
    const dateObj = date instanceof Date ? date : new Date(date);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
  };

  const getMonthName = (monthKey) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Generate colors based on position (index)
  const generatePositionColor = (index) => {
    const colors = ["#FF9CCF", "#7ED7FF", "#FFE799", "#9FD79D", "#BCA3E3", "#FF8C7A"];
    return colors[index % colors.length];
  };

  // Create monthly data structure
  const monthlyData = {};
  
  booksWithDates.forEach(book => {
    // Get the date part from the ISO string to avoid timezone issues
    const dateString = book.endDate.slice(0, 10); // "2024-01-01"
    const [year, month, day] = dateString.split('-').map(Number);
    const endDate = new Date(year, month - 1, day); // month is 0-indexed
    const monthKey = getMonthKey(endDate);
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        books: []
      };
    }
    
    // Add the book to the month when it was finished (endDate)
    monthlyData[monthKey].books.push(book);
  });

  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyData).sort();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    // Get the date part from the ISO string to avoid timezone issues
    const datePart = dateString.slice(0, 10); // "2024-01-01"
    const [year, month, day] = datePart.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString();
  };

  if (sortedMonths.length === 0) {
    return (
      <div className="reading-timeline">
        <h3>Monthly Reading Activity</h3>
        <div className="timeline-empty">
          <p>No reading data available yet.</p>
          <p>Add start and end dates to your books to see your monthly reading activity!</p>
        </div>
      </div>
    );
  }

  // Calculate total books per month
  const getTotalBooksInMonth = (monthKey) => {
    return monthlyData[monthKey].books.length;
  };

  const getMaxBooksInMonth = () => {
    return Math.max(...sortedMonths.map(month => getTotalBooksInMonth(month)));
  };

  const maxBooks = getMaxBooksInMonth();

  // Sort books consistently across all months
  const sortBooksForDisplay = (books) => {
    return books.sort((a, b) => {
      // First sort by start date
      const startDateA = new Date(a.startDate);
      const startDateB = new Date(b.startDate);
      if (startDateA.getTime() !== startDateB.getTime()) {
        return startDateA - startDateB;
      }
      // If start dates are the same, sort by book ID for consistency
      return a.googleBookId.localeCompare(b.googleBookId);
    });
  };

  return (
    <div className="reading-timeline">
      <h3>Monthly Reading Activity</h3>
      <div className="timeline-container">
        <div className="chart-container">
          <div className="chart-bars">
            {sortedMonths.map((monthKey) => {
              const data = monthlyData[monthKey];
              const sortedBooks = sortBooksForDisplay(data.books);
              const totalBooks = sortedBooks.length;
              const maxHeight = 200; // Maximum height in pixels
              const barHeight = totalBooks > 0 ? (totalBooks / maxBooks) * maxHeight : 0;
              
              return (
                <div key={monthKey} className="month-bar-container">
                  <div className="month-label">{getMonthName(monthKey)}</div>
                  <div className="month-bar" style={{ height: `${barHeight}px` }}>
                    {sortedBooks.map((book, index) => (
                      <div 
                        key={`${monthKey}-${book.googleBookId}`}
                        className="bar-segment book-segment"
                        style={{ 
                          height: `${100 / totalBooks}%`,
                          backgroundColor: generatePositionColor(index)
                        }}
                        title={`${book.title} (${formatDate(book.startDate)} - ${formatDate(book.endDate)}) - ${book.status}`}
                      >
                      </div>
                    ))}
                  </div>
                  <div className="month-total">{totalBooks}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="timeline-legend">
          <div className="legend-note">
            <small>Hover over segments to see book details</small>
          </div>
        </div>
      </div>
      
      <div className="timeline-stats">
        <div className="stat-item">
          <span className="stat-label">Total Books:</span>
          <span className="stat-value">{booksWithDates.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Months Active:</span>
          <span className="stat-value">{sortedMonths.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg Books/Month:</span>
          <span className="stat-value">
            {(booksWithDates.length / sortedMonths.length).toFixed(1)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Peak Month:</span>
          <span className="stat-value">
            {getMonthName(sortedMonths.reduce((maxMonth, month) => 
              getTotalBooksInMonth(month) > getTotalBooksInMonth(maxMonth) ? month : maxMonth
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReadingTimeline; 