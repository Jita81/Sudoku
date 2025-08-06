#!/bin/bash

# GitHub Setup Script for Kudzai's Sudoku Paradise
# This script helps you set up the GitHub repository

echo "🎮 Setting up Kudzai's Sudoku Paradise for GitHub..."
echo ""

# Check if git remote exists
if git remote | grep -q 'origin'; then
    echo "⚠️  Git remote 'origin' already exists"
    echo "Current remote URL:"
    git remote -v | grep origin | head -1
    echo ""
    read -p "Do you want to update it? (y/n): " update_remote
    if [[ $update_remote == "y" ]]; then
        read -p "Enter your GitHub username: " github_username
        git remote set-url origin "https://github.com/$github_username/Soduku.git"
        echo "✅ Remote URL updated!"
    fi
else
    read -p "Enter your GitHub username: " github_username
    git remote add origin "https://github.com/$github_username/Soduku.git"
    echo "✅ Remote URL added!"
fi

echo ""
echo "📝 Updating README with your username..."
# Update README.md with actual username
if [[ ! -z "$github_username" ]]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/yourusername/$github_username/g" README.md
        sed -i '' "s/yourusername/$github_username/g" CONTRIBUTING.md
        sed -i '' "s/yourusername/$github_username/g" SECURITY.md
        sed -i '' "s/yourusername/$github_username/g" .github/workflows/ci.yml
    else
        # Linux
        sed -i "s/yourusername/$github_username/g" README.md
        sed -i "s/yourusername/$github_username/g" CONTRIBUTING.md
        sed -i "s/yourusername/$github_username/g" SECURITY.md
        sed -i "s/yourusername/$github_username/g" .github/workflows/ci.yml
    fi
    echo "✅ Documentation updated with your username!"
fi

echo ""
echo "📦 Creating initial commit..."
git add .
git commit -m "Initial commit: Kudzai's Sudoku Paradise

- Full-featured Sudoku web application
- Built with React, TypeScript, and Tailwind CSS
- Comprehensive test suite
- CI/CD pipeline configured
- Mobile-responsive design
- Accessibility features included"

echo ""
echo "🚀 Ready to push to GitHub!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub named 'Soduku'"
echo "2. Run: git push -u origin main"
echo "3. Add the following secrets in your GitHub repository settings:"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_ORG_ID"
echo "   - VERCEL_PROJECT_ID"
echo "   - CODECOV_TOKEN (optional)"
echo ""
echo "✨ Your project is ready for open source!"