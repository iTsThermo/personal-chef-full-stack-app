# Personal Chef 🍳

A full-stack AI-powered recipe recommendation application that helps you create delicious meals based on your available ingredients. Built with React, Express, Prisma, and OpenAI.

## ✨ Features

- 🔐 **Secure Authentication** - Auth0 integration for user management
- 📝 **Ingredient Management** - Track your pantry inventory with quantities and measurements
- 🤖 **AI Recipe Generation** - Get personalized recipe recommendations using OpenAI GPT-4
- 💾 **Save Recipes** - Store your favorite recipes for future reference
- 🎨 **Modern UI** - Responsive design with Tailwind CSS and shadcn/ui components
- 🔒 **Rate Limited API** - Protected endpoints with rate limiting
- 🐳 **Docker Support** - Containerized deployment ready

## 🏗️ Architecture

This is a **pnpm monorepo** with the following structure:

```
personal-cook/
├── apps/
│   ├── node/          # Express API server with Prisma ORM
│   └── website/       # React frontend with Vite
└── packages/
    └── utils/         # Shared types and utilities
```

### Tech Stack

**Frontend:**
- React 19 with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- React Router for navigation
- Auth0 React SDK
- Tailwind CSS + shadcn/ui
- Axios for API calls

**Backend:**
- Node.js with Express 5
- TypeScript
- Prisma ORM with PostgreSQL
- OpenAI SDK for AI generation
- Auth0 JWT authentication
- Express rate limiting
- CORS enabled

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **pnpm** (v10.15.0 or higher)
- **PostgreSQL** database
- **Auth0** account and application
- **OpenAI** API key

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd personal-cook-main
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create `.env` files in both `apps/node` and `apps/website` directories.

**`apps/node/.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/personal_chef"
PORT=3000
AUTH0_AUDIENCE=your-auth0-api-audience
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
OPENAI_API_KEY=your-openai-api-key
```

**`apps/website/.env`:**
```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-auth0-api-audience
VITE_API_URL=http://localhost:3000
```

### 4. Database Setup

Run Prisma migrations to set up your database schema:

```bash
cd apps/node
npx prisma migrate dev --name init
npx prisma generate
cd ../..
```

### 5. Run the Application

**Development mode (runs both frontend and backend):**
```bash
pnpm run dev
```

**Run individually:**
```bash
# Frontend only
pnpm run dev-website

# Backend only
pnpm run dev-node
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Run both frontend and backend concurrently |
| `pnpm run dev-website` | Run frontend only |
| `pnpm run dev-node` | Run backend only |
| `pnpm run build:all` | Build both apps |
| `pnpm run build:website` | Build frontend |
| `pnpm run build:node` | Build backend |
| `pnpm run start:all` | Start production builds |
| `pnpm run list-packages` | List all workspace packages |

## 🐳 Docker Deployment

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t personal-chef .

# Run the container
docker run -p 3000:3000 --env-file apps/node/.env personal-chef
```

## 📊 Database Schema

### Ingredients Table
```prisma
model ingredients {
  id          Int     @id @default(autoincrement())
  ingredient  String
  quantity    Float
  measurement String?
  user_id     String
}
```

### Recipes Table
```prisma
model recipes {
  id          Int      @id @default(autoincrement())
  user_id     String
  name        String
  description String
  ingredients Json
  steps       String[]
}
```

## 🔌 API Endpoints

### Ingredients
- `GET /ingredients` - Fetch user's ingredients
- `POST /ingredients` - Add new ingredient
- `PUT /ingredients/:id` - Update ingredient
- `DELETE /ingredients/:id` - Delete ingredient

### Recipes
- `GET /recipe` - Generate AI recipes based on ingredients
- `GET /recipe/saved` - Fetch saved recipes
- `POST /recipe` - Save a recipe
- `DELETE /recipe/:id` - Delete a saved recipe

All endpoints require Auth0 JWT authentication.

## 🛡️ Security Features

- JWT token validation via Auth0
- Rate limiting on all API endpoints
- CORS protection
- Environment variable security
- SQL injection prevention via Prisma

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created with ❤️ by [iTsThermo](https://github.com/iTsThermo)

## 🙏 Acknowledgments

- OpenAI for the GPT-4 API
- Auth0 for authentication services
- The React and Express communities
- shadcn/ui for beautiful components