# Specify Base Image
FROM node:alpine
# Set working directory
WORKDIR /usr/app
# Copy files 
COPY ./ ./
# Install dependencies
RUN npm install
# Expose port
EXPOSE 3000
# Run server
CMD [ "npm","start" ]