# Contributing to Kudzai's Sudoku Paradise

First off, thank you for considering contributing to Kudzai's Sudoku Paradise! It's people like you that make this project better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

- A clear and descriptive title
- Detailed description of the proposed feature
- Why this enhancement would be useful
- Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Run tests (`npm test`)
5. Ensure code quality (`npm run lint` and `npm run type-check`)
6. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/Jita81/Sudoku.git
cd Soduku

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check
```

## Style Guide

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types
- Export types/interfaces from `src/types`
- Use descriptive variable and function names

### React

- Use functional components with hooks
- Implement proper error boundaries
- Add accessibility attributes (ARIA labels, keyboard navigation)
- Memoize expensive computations

### Testing

- Write tests for all new features
- Maintain minimum 80% code coverage
- Test both happy path and edge cases
- Use meaningful test descriptions

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

Example:
```
Add hint animation feature

- Implement smooth animation when hint is used
- Add configuration for animation duration
- Update tests for new feature

Fixes #123
```

## Project Structure

```
src/
├── components/      # React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── __tests__/      # Test files
```

## Testing

- Unit tests for utility functions
- Integration tests for React components
- E2E tests for critical user flows
- Accessibility tests

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉