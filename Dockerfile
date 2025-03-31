# Dockerfile
# 1. Use official Node image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy project files
COPY . .

# 4. Install dependencies using pnpm
RUN corepack enable && pnpm install

# 5. Build the app
RUN pnpm build

# 6. Expose port
EXPOSE 3000

# 7. Start the app
CMD ["pnpm", "start"]
