# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our software seriously. If you believe you have found a security vulnerability in Kudzai's Sudoku Paradise, please report it to us as described below.

### Please do NOT:
- Open a public GitHub issue
- Tweet about the vulnerability
- Blog about the vulnerability

### Please DO:
- Email us at: security@[YOUR-EMAIL-HERE]
- Include the following information:
  - Type of issue (e.g., XSS, CSRF, SQL injection, etc.)
  - Full paths of source file(s) related to the issue
  - Location of the affected source code (tag/branch/commit or direct URL)
  - Step-by-step instructions to reproduce the issue
  - Proof-of-concept or exploit code (if possible)
  - Impact of the issue

### What to expect:
- You'll receive a response acknowledging your report within 48 hours
- We'll work to verify the issue and determine its impact
- We'll notify you when the issue is fixed
- We'll publicly acknowledge your responsible disclosure (unless you prefer to remain anonymous)

## Security Best Practices for Contributors

When contributing to this project, please follow these security guidelines:

1. **Dependencies**: 
   - Always use `npm audit` before submitting PRs
   - Keep dependencies up to date
   - Avoid adding unnecessary dependencies

2. **Input Validation**: 
   - Validate all user inputs
   - Use TypeScript types for additional safety
   - Sanitize any data before display

3. **Data Storage**: 
   - Never store sensitive data in localStorage
   - Use secure methods for any data transmission
   - Follow principle of least privilege

4. **Code Review**: 
   - All code must be reviewed before merge
   - Security-sensitive changes require additional review
   - Use automated security scanning tools

## Known Security Features

This application implements several security features:

- **Content Security Policy**: Restricts resource loading
- **XSS Protection**: React's built-in escaping
- **No Server Communication**: All data stays local
- **Input Validation**: All game inputs are validated
- **Type Safety**: TypeScript prevents many vulnerabilities

## Contact

For any security concerns, please contact:
- Primary: security@[YOUR-EMAIL-HERE]
- Secondary: Create a private security advisory on GitHub

Thank you for helping keep Kudzai's Sudoku Paradise and its users safe!