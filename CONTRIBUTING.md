# Contributing to FlixBase

Thank you for your interest in contributing to FlixBase! 🎬

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear title describing the problem
- Steps to reproduce the issue
- What you expected to happen
- What actually happened
- Screenshots if applicable

### Suggesting Features

Got an idea? Open an issue with the label `enhancement` and describe:
- What the feature does
- Why it would be useful
- Any examples or references

### Submitting Code

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test everything works: `npm run dev`
5. Commit your changes: `git commit -m "Add: your feature description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request on GitHub

## Code Style

- Use clear, readable variable and function names
- Keep components small and focused
- Follow the existing file and folder structure
- Use Tailwind CSS classes for styling where possible
- Use Framer Motion for animations

## Commit Message Format

```
Add: new feature description
Fix: bug description
Update: what was updated
Remove: what was removed
```

## Environment Setup

See the [README](README.md) for full setup instructions.

```bash
git clone https://github.com/k4hav/FlixBase.git
cd FlixBase
npm install
cp .env.local.example .env.local
# Fill in your Supabase credentials
npm run dev
```

## Questions?

Open an issue or reach out on GitHub. All contributions, big or small, are appreciated!
