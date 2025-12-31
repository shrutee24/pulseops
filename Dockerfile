# 1️⃣ Lightweight Node image
FROM node:20-alpine

# 2️⃣ Create app directory
WORKDIR /app

# 3️⃣ Copy package files first (cache optimization)
COPY package*.json ./

# 4️⃣ Install production dependencies only
RUN npm install

# 5️⃣ Copy application code
COPY . .

# 6️⃣ Expose application port
EXPOSE 3000

# 7️⃣ Health check (IMPORTANT)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# 8️⃣ Start application
CMD ["node", "src/app.js"]
