# Kudzai's Sudoku Paradise 🧩

[![CI/CD Pipeline](https://github.com/Jita81/Sudoku/actions/workflows/ci.yml/badge.svg)](https://github.com/Jita81/Sudoku/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://kudzai-sudoku.vercel.app)

A modern, accessible, and fully-featured Sudoku web application built with React, TypeScript, and Tailwind CSS. Features a beautiful UI, comprehensive game mechanics, mobile-first design, and support for multiple grid sizes including a special kiddie mode.

## 🌐 Live Demo

**🎮 Play Now**: [https://kudzai-sudoku.vercel.app](https://kudzai-sudoku.vercel.app)

Experience the full-featured Sudoku game with all difficulty levels, including our special kiddie mode for beginners!

## ✨ Features

### Core Gameplay
- **5 Difficulty Levels**: Kiddie (4x4), Easy, Medium, Hard, and Expert (9x9)
- **Multiple Grid Sizes**: 4x4 grid for beginners, traditional 9x9 for standard play
- **Puzzle Generation**: Unique puzzles with guaranteed solutions for all difficulty levels
- **Real-time Validation**: Instant feedback on moves and conflicts
- **Auto-save**: Progress saved automatically to local storage
- **Adaptive UI**: Interface automatically adjusts to grid size

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
- **Mobile-Optimized**: Touch-friendly number selection popup and bottom sheet menu
- **Keyboard Shortcuts**: Full keyboard support for desktop
- **Beautiful Animations**: Smooth transitions and effects powered by Framer Motion
- **Victory Celebration**: Confetti animation and comprehensive scoring system
- **Adaptive Controls**: Interface adapts to different grid sizes seamlessly
- **Touch-Optimized**: Large, finger-friendly touch targets for mobile devices

## 🎮 How to Play

### Desktop
- Click any cell to select it
- Type 1-9 (or 1-4 for kiddie mode) to fill the cell
- Use arrow keys to navigate
- Press Delete/Backspace to clear
- Press N to toggle notes mode
- Press H for hints
- Ctrl/Cmd + Z to undo

### Mobile
- Tap any empty cell to open the number selection popup
- Select a number from the popup (1-4 for kiddie, 1-9 for standard)
- The popup automatically adapts to the current difficulty level
- Tap the menu button (☰) for game controls
- Access hints, undo, new game, and more from the slide-up menu

### Getting Started
1. **Choose Your Level**: Start with Kiddie mode if you're new to Sudoku
2. **Select Difficulty**: Kiddie (4x4), Easy, Medium, Hard, or Expert (9x9)
3. **Fill the Grid**: Each row, column, and box must contain unique numbers
4. **Use Hints**: Get help when you're stuck
5. **Celebrate**: Complete the puzzle to see your victory animation!

## 👶 Kiddie Mode - Perfect for Beginners!

Our special **Kiddie Mode** features a 4x4 grid (2x2 boxes) designed for:
- **New Players**: Perfect introduction to Sudoku rules
- **Children**: Smaller grid is less overwhelming and more manageable
- **Quick Games**: Faster completion for immediate satisfaction
- **Learning**: Understand Sudoku logic before tackling larger grids

**Kiddie Mode Features:**
- 4x4 grid with numbers 1-4
- 2x2 boxes instead of 3x3
- Larger, touch-friendly cells on mobile
- Special victory messages for encouragement
- Reduced complexity while maintaining core Sudoku rules

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/Jita81/Sudoku.git
cd Sudoku
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
- **Responsive grids** that scale perfectly to screen size (4x4 and 9x9)
- **Smart number selection popup** when tapping empty cells
  - Automatically shows 1-4 for kiddie mode or 1-9 for standard modes
  - Large, touch-friendly buttons optimized for finger input
- **Bottom sheet menu** for all game controls with smooth animations
- **Compact stats display** that adapts to different grid sizes
- **Floating action button** for easy menu access
- **Clean interface** with maximum screen space dedicated to the puzzle
- **Touch-optimized cells** with larger targets for kiddie mode

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

The app is optimized for performance across all grid sizes:

- **Dynamic Loading**: Efficient handling of different grid sizes (4x4 and 9x9)
- **Memoization**: React.memo and useCallback for expensive renders
- **Efficient State Management**: Minimal re-renders with optimized game state
- **Fast Grid Generation**: Optimized algorithms for both small and large grids
- **Smooth Animations**: Hardware-accelerated transitions with Framer Motion

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

- Originally created for Kudzai with love and care
- Built with React, TypeScript, and Tailwind CSS
- Inspired by classic Sudoku gameplay
- Special thanks to all contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Jita81/Sudoku/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Jita81/Sudoku/discussions)
- **Live Demo**: [Play the Game](https://kudzai-sudoku.vercel.app)

---

<p align="center">Made with ❤️ by the community</p>