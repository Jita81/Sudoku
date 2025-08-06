# Kudzai's Sudoku Paradise 🧩

[![CI/CD Pipeline](https://github.com/Jita81/Sudoku/actions/workflows/ci.yml/badge.svg)](https://github.com/Jita81/Sudoku/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Coverage](https://img.shields.io/codecov/c/github/Jita81/Sudoku)](https://codecov.io/gh/Jita81/Sudoku)

A modern, accessible, and fully-featured Sudoku web application built with React, TypeScript, and Tailwind CSS. Features a beautiful UI, comprehensive game mechanics, and mobile-first design.

## 🌐 Live Demo

Visit the game at any of these URLs:
- **Primary**: https://kudzai-sudoku.vercel.app
- **Alternative**: https://kudzai-sudoku-game.vercel.app
- **Full URL**: https://kudzai-sudoku-automated-agile.vercel.app

## ✨ Features

### Core Gameplay
- **4 Difficulty Levels**: Easy, Medium, Hard, and Expert
- **Puzzle Generation**: Unique puzzles with guaranteed solutions
- **Real-time Validation**: Instant feedback on moves and conflicts
- **Auto-save**: Progress saved automatically to local storage

### Game Features
- **Pencil Marks/Notes**: Track possible numbers in cells
- **Undo/Redo**: Full history of moves
- **Hints System**: Get help when stuck
- **Timer**: Track solving time
- **Mistake Counter**: Monitor accuracy
- **Error Highlighting**: Visual feedback for conflicts
- **Pause/Resume**: Take breaks without losing time

### User Experience
- **Responsive Design**: Works perfectly on desktop and mobile
- **Mobile-Optimized**: Bottom sheet menu for mobile controls
- **Keyboard Shortcuts**: Full keyboard support for desktop
- **Beautiful Animations**: Smooth transitions and effects
- **Victory Celebration**: Confetti and scoring system

## 🎮 How to Play

### Desktop
- Click any cell to select it
- Type 1-9 to fill the cell
- Use arrow keys to navigate
- Press Delete/Backspace to clear
- Press N to toggle notes mode
- Press H for hints
- Ctrl/Cmd + Z to undo

### Mobile
- Tap any empty cell to open the number selection popup
- Select a number from the popup to fill the cell
- Tap the menu button (☰) for game controls
- Access hints, undo, new game, and more from the slide-up menu

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/yourusername/soduku.git
cd soduku
npm install
```

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Deployment
The app is configured for automatic deployment to Vercel:
```bash
vercel --prod
```

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Confetti** - Victory Effects
- **Vercel** - Hosting

## 📱 Mobile Features

The mobile experience includes:
- Responsive grid that scales to screen size
- **Number selection popup** when tapping empty cells
- Bottom sheet menu for all game controls
- Compact stats display
- Floating action button for easy menu access
- Clean interface with maximum screen space for the puzzle

## 🎨 Customization

The app features a beautiful purple and pink color scheme with:
- Gradient backgrounds
- Smooth animations
- Custom typography
- Responsive design patterns

## 💝 Made for Kudzai

This Sudoku game was crafted with care to provide endless hours of puzzle-solving enjoyment. Every feature was designed to create the best possible experience!

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Logic functions in `src/utils/__tests__`
- **Component Tests**: React components in `src/components/__tests__`
- **Integration Tests**: Hook behaviors in `src/hooks/__tests__`

## 🔧 Code Quality

We maintain high code quality standards:

- **ESLint**: Enforces coding standards
- **Prettier**: Ensures consistent formatting
- **TypeScript**: Strict type checking
- **Husky**: Pre-commit hooks for quality checks

```bash
# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

## 🚀 Performance

The app is optimized for performance:

- **Code Splitting**: Lazy loading of components
- **Memoization**: React.memo for expensive renders
- **Efficient State Management**: Minimal re-renders
- **PWA Ready**: Can be installed as a mobile app

## ♿ Accessibility

We prioritize accessibility:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Clear focus indicators

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes
6. Run tests: `npm test`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Originally created for Kudzai Muza with love and care
- Built with React, TypeScript, and Tailwind CSS
- Inspired by classic Sudoku gameplay
- Special thanks to all contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Jita81/Sudoku/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Jita81/Sudoku/discussions)
- **Security**: See [SECURITY.md](SECURITY.md)

---

<p align="center">Made with ❤️ by the community</p>