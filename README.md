## Install dependencies
npm i

## Run demo app
cd ./src
vue serve

## Build lib
cd ./src/components
vue build --target lib --name tabler tabler.vue

## Props

| __Name__    | __Type__ | __Default__               | __Description__                                        |
| ----------- | -------- | ------------------------- |------------------------------------------------------- |
| fields      | Array    | []                        | Schema describing how to parse :json.                  |
| json        | -        | []                        | Json with data.                                        |
| url         | String   | null                      | Optional. URL for :json auto fetch. HTTP GET is used.  |
| search      | Bool     | true                      | Enable search or not.                                  |
| search-by   | String   | null                      | Search bar current value.                              |
| table-class | String   | 'uk-table uk-table-hover' | Table css class.                                       |
| page        | Number   | 1                         | Current table page.                                    |
| per-page    | Number   | 10                        | Rows count per page to show.                           |
| caption     | String   | null                      | Table caption.                                         |
| trans       | Object   | {}                        | Object with all text translations.                     |

## Events

* @clicked
* @checked

## Available field types

* string
* number
* date
* checkbox
* button
* img
* audio
