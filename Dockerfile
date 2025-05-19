# Use Node base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 3000

CMD ["npm", "run", "dev"]
