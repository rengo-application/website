# --- deps ---
FROM node:22-alpine AS deps
WORKDIR /website
COPY package*.json ./
RUN npm ci

# --- build ---
FROM node:22-alpine AS builder
WORKDIR /website
COPY --from=deps /website/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runner ---
FROM node:22-alpine AS runner
WORKDIR /website
ENV NODE_ENV=production
COPY --from=builder /website/package*.json ./
COPY --from=builder /website/node_modules ./node_modules
COPY --from=builder /website/.next ./.next
COPY --from=builder /website/public ./public

EXPOSE 3000
CMD ["npm","run","start"]
