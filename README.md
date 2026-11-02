![Categories](screenshot/1.png)

# Universal Currency Converter

A simple, responsive and user-friendly currency converter built with HTML, CSS and Vanilla JavaScript. It allows users to convert between multiple currencies using exchange rate data provided by the Frankfurter API.

## Overview

Universal Currency Converter is a lightweight web application designed to make currency conversion simple and accessible.

Users can enter an amount, select source and target currencies, swap currencies and view the converted amount along with the available exchange rate information.

The application uses the Frankfurter API, which provides exchange rate data based on reference rates published by central banks.

## Features

- Convert between multiple supported currencies.
- Automatically load available currencies from the API.
- Select source and target currencies.
- Swap selected currencies instantly.
- Display country flags for supported currencies.
- Show the converted amount.
- Display the exchange rate and rate date.
- Responsive design for desktop, tablet and mobile.
- Input validation and error handling.
- No API key required.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| Vanilla JavaScript | Application logic and API integration |
| Frankfurter API | Currency and exchange rate data |

## Project Structure

```text
Universal-Currency-Converter/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   └── images/
│
└── README.md
```

## API Integration

This project uses the Frankfurter API.

**API Base URL:**

`https://api.frankfurter.dev/v2`

### Endpoints Used

**1. Get Supported Currencies**

```http
GET https://api.frankfurter.dev/v2/currencies
```

Retrieves the available currencies and their names.

**2. Get Exchange Rate**

```http
GET https://api.frankfurter.dev/v2/rate/USD/INR
```

Retrieves the exchange rate between the selected source and target currencies.

### API Information

- Free to use.
- No API key required.
- Provides historical and reference exchange rate data.
- Rates are not real-time market trading quotes.
- Exchange rate availability depends on the API's supported currencies and data.

API documentation: https://frankfurter.dev/

## Getting Started

### Prerequisites

You only need:

- A modern web browser.
- A code editor such as Visual Studio Code.
- Internet connection for fetching exchange rate data.

### Installation

**Step 1: Clone the repository**

```bash
git clone https://github.com/your-username/Universal-Currency-Converter.git
```

**Step 2: Navigate to the project directory**

```bash
cd Universal-Currency-Converter
```

**Step 3: Open the project**

Open the project folder in Visual Studio Code.

**Step 4: Run the application**

Open `index.html` in your browser, or use the Live Server extension in VS Code.

No build process or package installation is required.

## How It Works

1. The application fetches the supported currency list from the Frankfurter API.
2. Currency options are populated dynamically.
3. The user enters an amount.
4. The user selects the source and target currencies.
5. The application requests the corresponding exchange rate.
6. JavaScript calculates the converted amount.
7. The result and exchange rate information are displayed.

## Error Handling

The application includes basic validation and error handling for:

- Empty amount input.
- Invalid or non-positive amounts.
- Missing currency selections.
- Failed API requests.
- Unavailable exchange rates.
- Currency loading errors.

## Limitations

- Exchange rates are reference rates, not tick-by-tick live market rates.
- An internet connection is required for API requests.
- Available currencies and historical data depend on the Frankfurter API.
- The application does not provide transaction, payment or money transfer functionality.

## Future Improvements

Potential enhancements include:

- Currency conversion history.
- Favorite currencies.
- Historical exchange rate charts.
- Recent currency pairs.
- Improved accessibility.
- Additional language support.
- Progressive Web App (PWA) support.

## License

This project is open-source and available for learning and personal development.

You may modify and extend it according to your requirements.

---

**Developed as a simple currency conversion project using HTML, CSS and Vanilla JavaScript.**
