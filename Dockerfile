# FROM node:10

# # Create app directory, this is in our container/in our image
# WORKDIR /thomas/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# RUN npm run build

# EXPOSE 8080
# CMD [ "node", "dist/main" ]

FROM node:alpine
LABEL description="Instant high-performance GraphQL API for your PostgreSQL database https://github.com/graphile/postgraphile"

# Install PostGraphile and PostGraphile connection filter plugin
RUN npm install -g postgraphile

EXPOSE 5000
ENTRYPOINT ["postgraphile", "-n", "0.0.0.0"]