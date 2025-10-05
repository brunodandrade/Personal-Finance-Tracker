# Personal Finance Tracker

A lightweight web app for tracking income, expenses, and savings.  
Built with JavaScript, Chart.js, and Parcel, it provides a simple and visual way to manage your finances directly in the browser.

---

## Features

- Dynamic pie chart using Chart.js
- Add, view, and delete transactions
- Persistent storage using browser `localStorage`
- Automatic savings rate and balance calculations
- Filter transactions by income or expense
- Responsive and user-friendly interface
- Fast development and build workflow with Parcel

---

## Tech Stack

| Tool / Library | Purpose |
|----------------|----------|
| JavaScript (ES6+) | Core app logic and DOM manipulation |
| Chart.js | Expense and income visualization |
| Parcel | Bundler and development server |
| HTML5 / CSS3 | Layout and styling |
| LocalStorage API | Persistent browser-based data |

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Then open the generated `dist/index.html` file in your browser.

---

## How It Works

- Each transaction is stored locally in the browser using `localStorage`.
- The app tracks:
    - Income and expenses
    - Total balance
    - Savings rate
    - Category-based expense distribution
- Data automatically updates across:
    - Transaction summaries
    - Recent transactions list
    - Category chart visualization
- Deleting a transaction removes it from both the UI and saved storage.

---

## Project Structure

```
Personal-Finance-Tracker/
├── icons/                     # Icons and images
├── src/
│   ├── buttons.js             # Handles opening/closing the transaction modal
│   ├── chartGen.js            # Chart.js setup
│   ├── display.js             # UI updates and chart refresh
│   ├── math.js                # Financial calculations (totals, averages)
│   ├── transactionPross.js    # Transaction logic, creation, deletion, storage
│   ├── index.js               # Entry point
│   └── style.css              # Styling and layout
├── dist/                      # Production build output
├── package.json
├── .gitignore
└── README.md
```
---

## License

This project is licensed under the **MIT License**.