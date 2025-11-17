# Multi AI Model Chat Platform
A high-performance, collaborative AI chat platform that seamlessly integrates multiple AI models. Switch between GPT-4, Claude, and other models mid-conversation, collaborate with multiple users in real-time, and organize discussions with threaded conversations.

**Why this exists:** Current AI chat platforms frustrate me in three ways: (1) they treat model switching as an afterthought, (2) their dashboards are bloated and slow (looking at you, high CPU usage), and (3) they don't let you truly experiment with AI interactions. This platform tries to fix all three — clean performance, natural model switching, and the freedom to make AI models actually talk to each other.

## ✨ Features by Version

### V1 - Core Chat Experience
- 💬 **Clean Chat Interface:** Fast, distraction-free chat experience
- 🔄 **Mid-Conversation Model Switching:** Switch between AI models (GPT-4, Claude, Gemini, etc.) without losing context
- 🧵 **Message Threads:** Discord-style threaded conversations for focused discussions
- 🏗️ **Project Organization:** Group chats into projects/servers (think Discord servers)

### V2 - Multi-User Collaboration
- 👥 **Real-Time Collaboration:** Multiple users in the same chat with live updates via WebSockets
- 🔗 **Shared Context:** All users see the same conversation state instantly
- 🔒 **Permission Management:** Control who can access and participate in chats

### V3 - Multi-AI Conversations
- 🤖 **Multiple AI Models in One Chat:** Different AI models discuss together in the same conversation
- 🧠 **Cross-Model Insights:** Compare and combine responses from multiple models
- 💡 **AI-to-AI Interactions:** Watch models debate, collaborate, and build on each other's responses

## Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, CVA, ShadCN, Solar Icons, React Hook Form |
| Backend | Next.js API Routes, WebSockets (planned) |
| Database | PostgreSQL (metadata), ScyllaDB (messages), Redis (caching) |
| ORM & Auth | Prisma, Cassandra Driver, NextAuth, Argon2 |
| Validation | Zod |
| Dev Tools | Storybook, ESLint |


## 🏗️ Architecture

### Database Strategy
- **PostgreSQL:** Users, authentication, projects, chat metadata, relationships
- **ScyllaDB:** Message storage, conversation memory (high-volume, time-series data)
- **Redis:** Session caching, real-time data

### Why ScyllaDB for Messages?
Chat messages are append-heavy and grow fast. ScyllaDB's columnar storage and horizontal scaling make it perfect for this workload, while keeping complex relational data in PostgreSQL.