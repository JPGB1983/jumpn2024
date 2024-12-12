# JumpN - Executive Recruitment Platform

JumpN is a modern recruitment platform connecting organizations with experienced C-level executives.

## Features

- Executive talent search
- Company profiles
- Candidate profiles with video introductions
- Subscription-based access
- Real-time messaging
- Secure payment processing

## Tech Stack

- React 18
- TypeScript
- Vite
- Firebase (Auth, Firestore, Storage)
- Stripe Payments
- TailwindCSS
- React Router v6

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Firebase Hosting

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Core functionality
│   ├── auth/      # Authentication logic
│   ├── config/    # Configuration files
│   └── services/  # API services
├── pages/         # Page components
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT