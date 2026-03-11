FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN  bun install

# Copy source code
COPY . .

# Build for production
RUN bun run build

# Install serve to serve static files
RUN bun add serve

EXPOSE 3000

ENV PORT=3000

CMD ["bunx", "serve", "-s", "dist", "-l", "3000"]
