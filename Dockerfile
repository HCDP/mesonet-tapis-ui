FROM node:16.19

RUN mkdir tapisui
RUN mkdir tapisui/src

WORKDIR /tapisui/src

# Copy the package json and package lock
COPY package.json ./
COPY package-lock.json ./

# Copy the rest of the files
COPY ./ ./

# Install all files in the package json
RUN npm install

RUN npm install -g serve
RUN npm run build

CMD ["serve", "-s", "build"]

# RUN npm run build

# Start the container
# CMD ["serve", "-s", "build"]
# CMD ["npm", "run", "build"]