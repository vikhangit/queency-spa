# ===== BASE =====
FROM node:22-alpine AS base
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ===== DEPENDENCIES =====
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# ===== BUILD =====
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ===== PRODUCTION =====
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# T?o user non-root
RUN addgroup -S app && adduser -S app -G app

# Copy c?n thi?t cho runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./

USER app

EXPOSE 3003

CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3003"]
