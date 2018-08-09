# Install dependencies
npm install

# Build lib
cd ./src/components

vue build --target lib --name tabler tabler.vue

# Run demo app
cd ./src
vue serve
