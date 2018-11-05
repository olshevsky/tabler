# Tabler Documentation

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
| trans       | Object   | {}                        | Object with all translations.                          |

## Available field types

* string
* number
* date
* checkbox
* button
* img
* audio

### default fields properties

All field types has or may has this properties.

| __Name__ | __Type__ | __Description__                                      |
| key      | String   | Key from :json to get field value. Must be unique.   |
| type     | String   | One of field types listed below. string, number etc. |
| title    | String   | Table column title.                                  |
| trClass  | String   |                                                      |
| tdClass  | String   |                                                      |

### string
Only default properties.

### number
Only default properties.

### date
| __Name__ | __Type__ | __Description__                                                                            |
| format   | String   | Date format. Is required for correct sort and filter work. For example dd.mm.yyyy hh:ii:ss |

### checkbox
Only default properties.

### button
| __Name__ | __Type__ | __Description__       |
| name     | String   | Text inside button.   |
| icon     | String   | Button <i> tag class. |

### img
| __Name__ | __Type__ | __Description__            |
| width    | Number   | <img> tag width property.  |
| height   | Number   | <img> tag height property. |

### audio
Only default properties.

## Events

Table component may rise this events.

* @clicked
* @checked
