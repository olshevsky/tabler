export default{
    compareNumber: function (a, b) {
        return Number(b.value) - Number(a.value)
    },
    compareString: function(a, b) {
        return b.value.localeCompare(a.value)
    },
    compareDate: function(a, b) {
        if(!b.format)
            b.format = a.format
        return this.strToDate(b.value, b.format) - this.strToDate(a.value, a.format)
    },
    compare: function(a, b){
        let result = 0
        if(a && a.type){
            switch (a.type){
                case 'number':
                    result = this.compareNumber(a, b)
                    break
                case 'string':
                    result = this.compareString(a, b)
                    break
                case 'date':
                    result = this.compareDate(a, b)
                    break
            }
        }

        return result
    },
    search: function(fields, val){
        return function (row) {
            for (let id in fields) {
                if(row[fields[id].key] &&
                    row[fields[id].key].value &&
                    row[fields[id].key].value.toString().toLowerCase().replace(/ /g, '').indexOf(val.toString().toLowerCase().replace(/ /g, '')) > -1){
                    return true
                }
            }
        }
    },
    filter: function (filters) {
        let self = this
        return function (row) {
            let result = true
            for(let i in filters){
                let field = row[filters[i].key]
                let filter = filters[i]
                switch (filters[i].operator){
                    case '=':
                        result = (self.compare(field, filter) ===  0) ? true : false
                        break
                    case '!=':
                        result = (self.compare(field, filter) !==  0) ? true : false
                        break
                    case '<':
                        result = (self.compare(field, filter) <=  0) ? false : true
                        break
                    case '>':
                        result = (self.compare(field, filter) >=  0) ? false : true
                        break
                    case '>=':
                        result = (self.compare(field, filter) >  0) ? false : true
                        break
                    case '<=':
                        result = (self.compare(field, filter) <  0) ? false : true
                        break
                    default:
                        result = false
                }
                if(result === false) //AND, inverse for OR statement
                    break
            }

            return result
        }
    },
    sort: function(index) {
        let self = this
        return function (a, b) {
            if(a[index] && b[index])
                return self.compare(a[index], b[index])
        }
    },
    strToDate: function (val, format) {
        let normalized = val.replace(/[^a-zA-Z0-9]/g, '-')
        let normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
        let formatItems = normalizedFormat.split('-')
        let dateItems = normalized.split('-')
        let monthIndex  = formatItems.indexOf("mm")
        let dayIndex    = formatItems.indexOf("dd")
        let yearIndex   = formatItems.indexOf("yyyy")
        let hourIndex     = formatItems.indexOf("hh")
        let minutesIndex  = formatItems.indexOf("ii")
        let secondsIndex  = formatItems.indexOf("ss")
        let today = new Date()
        let year  = yearIndex > - 1  ? dateItems[yearIndex]      : today.getFullYear()
        let month = monthIndex > - 1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1
        let day   = dayIndex > - 1   ? dateItems[dayIndex]       : today.getDate()
        let hour    = hourIndex > - 1      ? dateItems[hourIndex]    : today.getHours()
        let minute  = minutesIndex > - 1   ? dateItems[minutesIndex] : today.getMinutes()
        let second  = secondsIndex > - 1   ? dateItems[secondsIndex] : today.getSeconds()
        return new Date(year, month, day, hour, minute, second)
    }
}