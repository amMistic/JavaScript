<p align="center">
	<img src="https://img.shields.io/github/license/amMistic/JavaScript?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/amMistic/JavaScript?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/amMistic/JavaScript?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/amMistic/JavaScript?style=default&color=0080ff" alt="repo-language-count">
</p>

# Modern Calculator

A sleek, responsive calculator web application with a modern UI built using HTML, CSS, and JavaScript.

![App Demo](Lecture-1/basic-calculator/assests/demo_cal.gif)

## Features

- Clean, responsive design with glassmorphism effect
- Standard arithmetic operations (addition, subtraction, multiplication, division)
- Error handling for invalid expressions
- Backspace functionality for correcting input
- Proper handling of decimal points
- Smooth hover animations

## Demo

You can see a live demo [here](#) (add your demo link once deployed).

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of web development (if you want to modify the code)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/modern-calculator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd modern-calculator
   ```

3. Open the `index.html` file in your web browser.

Alternatively, you can simply download the ZIP file of this repository and extract it to your local machine.

### Project Structure

```
modern-calculator/
├── index.html      # The main HTML file
├── index.css       # Custom CSS styles
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## Usage

- Click the numeric buttons to input numbers
- Use the operation buttons (+, -, *, /) to perform calculations
- Press "=" to evaluate the expression
- Click "C" to clear the display
- Use "backspace" to delete the last character
- The calculator prevents multiple consecutive operators
- After getting a result, entering a number will start a new calculation, while entering an operator will continue from the result

## Customization

### Changing Colors

The calculator uses Tailwind CSS for styling. You can modify the colors in the HTML file by changing the color classes (e.g., `bg-gray-800`, `bg-red-600`).

### Adding Features

To add more operations (like square root or percentage):
1. Add new buttons to the HTML grid
2. Update the JavaScript logic to handle the new operations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Tailwind CSS for the utility classes
- Inspiration from modern calculator designs
