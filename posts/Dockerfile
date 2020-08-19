# Speficy an existing docker image as a base image - will look up on Dockerhub if not found locally
FROM node:alpine

# Set working directory - any following command will be executed relative to this path in container.
# This way, you won't e.g. overwrite stuff from base image.
WORKDIR /app
# Install some dependencies (happens through copying the package.json and then running npm install)
# `COPY` is to copy files from path relative to build context, to path relative to container root,(or of WORKDIR in this case). 
# For example, if we didn't copy the package.json before `npm i`, then `npm i` would fail for lack of a package.json file.
# To avoid for Docker having to reinstall all node modules everytime there is a change in the repo (but outside of package.json), 
# we separate that step out and first ONLY copy package.json and run npm install. This way, the cache will be used for the node modules, 
# speeding up the rebuild process. 
COPY package.json ./
RUN npm install
COPY ./ ./

# Set default command for image, i.e. tell the image what to do when it starts as a container
CMD ["npm", "start"]