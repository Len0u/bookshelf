# 📚 BookLog - Personal Reading Tracker

A modern, feature-rich web application for tracking your reading progress, managing your book collection, and setting reading goals. Built with React and designed for book lovers who want to organize their reading journey.

![BookLog Screenshot](https://via.placeholder.com/800x400/5A6B33/FFFFFF?text=BookLog+Reading+Tracker)

## ✨ Features

### 🏠 **Home Dashboard**
- **Welcome Message** - Personalized greeting with current time
- **Reading Progress Bar** - Visual progress tracking with statistics
- **Currently Reading** - Display books you're actively reading with full management
- **TBR Suggestions** - Quick access to your "To Be Read" list
- **Book Search** - Search and add books from Google Books API

### 📖 **Book Management**
- **Comprehensive Book Cards** - Full book details with cover images
- **Reading Status Tracking** - TBR → Reading → Finished
- **Star Ratings** - Rate books from 1-5 stars
- **Personal Reviews** - Write and edit detailed reviews
- **Reading Dates** - Track start and end dates for each book
- **Reading Duration** - Automatic calculation of reading time

### 📊 **Reading Statistics**
- **Progress Tracking** - Set and monitor yearly reading goals
- **Visual Progress Bar** - Beautiful animated progress indicators
- **Genre Analytics** - Pie chart showing your reading preferences
- **Rating Distribution** - Visual breakdown of your book ratings
- **Reading Timeline** - Monthly reading activity visualization
- **Reading Statistics** - Average ratings, most read genres, and more

### 🎯 **Reading Goals**
- **Custom Goal Setting** - Set your yearly reading target
- **Interactive Input** - Increment/decrement buttons for easy goal adjustment
- **Progress Visualization** - Real-time progress tracking
- **Motivational Messages** - Encouraging feedback when goals are reached

### 📱 **Responsive Design**
- **Mobile-First** - Optimized for all screen sizes
- **Touch-Friendly** - Easy navigation on mobile devices
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Accessibility** - Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/booklog.git
   cd booklog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables
- **Icons**: React Icons
- **Charts**: Recharts
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Persistence**: LocalStorage
- **External API**: Google Books API

## 📁 Project Structure

```
booklog/
├── public/
├── src/
│   ├── components/
│   │   ├── BookCard.jsx          # Individual book display
│   │   ├── CurrentReads.jsx      # Currently reading section
│   │   ├── GenrePieChart.jsx     # Genre analytics chart
│   │   ├── NavBar.jsx            # Navigation component
│   │   ├── ProgressBar.jsx       # Reading progress visualization
│   │   ├── RatingsPieChart.jsx   # Rating distribution chart
│   │   ├── ReadingTimeline.jsx   # Monthly reading activity
│   │   ├── SearchBookCard.jsx    # Search results display
│   │   ├── TbrSuggestions.jsx    # TBR suggestions section
│   │   └── WelcomeMessage.jsx    # Welcome dashboard message
│   ├── contexts/
│   │   └── BookContext.jsx       # Global state management
│   ├── css/
│   │   ├── App.css              # Global styles and variables
│   │   ├── BookCard.css         # Book card styling
│   │   ├── CurrentReads.css     # Current reads styling
│   │   ├── Home.css             # Home page styling
│   │   ├── NavBar.css           # Navigation styling
│   │   ├── ProgressBar.css      # Progress bar styling
│   │   ├── ReadingGoals.css     # Reading stats styling
│   │   ├── ReadingTimeline.css  # Timeline styling
│   │   ├── SearchBookCard.css   # Search results styling
│   │   ├── Shelf.css            # Shelf page styling
│   │   └── TbrSuggestions.css   # TBR styling
│   ├── pages/
│   │   ├── Home.jsx             # Home dashboard
│   │   ├── ReadingStats.jsx     # Reading statistics page
│   │   └── Shelf.jsx            # Book shelf management
│   ├── services/
│   │   └── api.js               # Google Books API integration
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point
├── package.json
└── README.md
```

## 🎨 Design System

The application uses a consistent design system with CSS variables:

### Colors
- **Primary**: `#5A6B33` (Forest Green)
- **Primary Dark**: `#3F4C1A`
- **Primary Light**: `#8DA76E`
- **Accent**: `olivedrab`
- **Background**: `#B7C48B` (Light Green)

### Spacing
- **XS**: `0.25rem`
- **SM**: `0.5rem`
- **MD**: `1rem`
- **LG**: `1.5rem`
- **XL**: `2rem`

### Border Radius
- **SM**: `4px`
- **MD**: `6px`
- **LG**: `8px`
- **XL**: `10px`
- **Full**: `50%`

## 📖 Usage Guide

### Adding Books
1. Use the search bar on the home page
2. Browse search results and click the "+" button to add books
3. Books are automatically added to your TBR list

### Managing Your Reading
1. **Change Status**: Use the dropdown in each book card
2. **Set Dates**: Add start and end dates to track reading time
3. **Rate Books**: Click the stars to rate from 1-5
4. **Write Reviews**: Add personal thoughts and notes

### Setting Goals
1. Navigate to "Reading Stats"
2. Use the increment/decrement buttons or type your goal
3. Monitor progress through the visual progress bar

### Viewing Statistics
- **Home Page**: Quick overview of current progress
- **Reading Stats**: Detailed analytics and charts
- **Shelf**: Complete book management with filtering and sorting

## 🔧 Customization

### Adding New Features
The modular component structure makes it easy to add new features:
- Create new components in `src/components/`
- Add corresponding CSS files in `src/css/`
- Update the context for new state management needs

### Styling Changes
- Modify CSS variables in `src/css/App.css` for global changes
- Update individual component CSS files for specific styling
- The design system ensures consistency across the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Books API** for book data
- **React Icons** for beautiful icons
- **Recharts** for data visualization
- **Vite** for fast development experience

## 📞 Support

If you have any questions or need help with the application, please open an issue on GitHub or contact the maintainers.

---

**Happy Reading! 📚✨**

