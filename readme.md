How to run this monorepo:
    Prereqs: 
        -Auth0
        -Postgres database
        -OpenAI API Key
    -create .env using .env.example files in node & website
    -pnpm install
    Postgres/prisma Database: 
        -npx prisma migrate dev --name init
        -npx prisma generate
    -(in root dir) -pnpm run dev