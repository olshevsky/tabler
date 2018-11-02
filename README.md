# Install dependencies
npm install

# Run demo app
cd ./src
vue serve

# Build lib
cd ./src/components
vue build --target lib --name tabler tabler.vue


## Props

| __Name__   | __Type__ | __Description__ |
| ---------- |:--------:| ---------------:|
| fields     | Array    |                 |
| json       | -        |                 |
| search-by  | String   |                 |
| table-class| String   |                 |
| page       | Number   |                 |
| per-page   | Number   |                 |


