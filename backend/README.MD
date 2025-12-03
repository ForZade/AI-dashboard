# Backend

## Backend File Structure
```
backend/
├── prisma/              # Database schema & migrations
│   └── schema.prisma
├── src/                 # Main source code
│   ├── db/              # Database client & queries
│   ├── features/        # Feature-specific logic
│   │   ├── auth/        # Authentication routes & logic
│   │   └── projects/    # Projects routes & logic
│   ├── lib/             # Utility functions & helpers
│   │   ├── utils/       # Helper utilities
│   │   └── exceptions/  # Custom error classes
│   ├── middleware/      # Fastify middleware
│   ├── plugins/         # Fastify plugins & extensions
│   ├── services/        # Business logic & external service integrations
│   └── main.ts          # Application entry point
├── tests/               # Test files
├── jest.config.ts       # Jest testing config
├── tsconfig.json        # TypeScript config
├── playwright.config.ts # E2E testing config
├── pnpm-lock.yaml       # Dependency lock file
├── package.json         # Project dependencies
└── .env                 # Environment variables (not in repo)
```

## API Routes
Collection routes (getting/creating stuff) live under their parent. Single resource routes just use the ID directly.

Example: 

When you create a chat, it goes in a project so it's `POST /projects/:projectId/chats`.
But updating that chat later? Just `PATCH /chats/:chatId` since you already know which chat you're messing with.

### Authentication

```
POST   /login                    - Login user
POST   /register                 - Register new user
POST   /logout                   - Logout user

GET    /google                   - Google OAuth redirect
GET    /google/callback          - Google OAuth callback

POST   /password/change          - Change password
POST   /password/reset/request   - Request password reset
POST   /password/reset           - Reset password via OTP sent to email
POST   /password/reset/verify    - Verify OTP for password reset

POST   /verify                   - Verify email
POST   /verify/resend            - Resend verification email
```

### Projects

```
GET    /projects                 - Get all projects
POST   /projects                 - Create new project
PATCH  /projects/:projectId      - Update project
DELETE /projects/:projectId      - Delete project
```

### Chats & Categories

```
GET    /projects/:projectId/chats           - Get all chats in project
POST   /projects/:projectId/chats           - Create chat in project
PATCH  /chats/:chatId                       - Update chat (name, etc)
DELETE /chats/:chatId                       - Delete chat
POST   /chats/:chatId/pin                   - Pin/unpin chat
```

### Messages

```
POST   /chats/:chatId/messages              - Send message to chat
GET    /chats/:chatId/messages              - Get messages in chat
POST   /messages/:messageId/pin             - Pin/unpin message
```