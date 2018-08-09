export default{
    compareNumber: function (a, b) {
        return Number(b.value) - Number(a.value)
    },
    compareString: function(a, b) {
        return b.value.localeCompare(a.value)
    },
    compareDate: function(a, b) {
        return this.strToDate(b.value, b.format) - this.strToDate(a.value, a.format)
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
        return function (a) {
            let result = false
            for(let i in filters){
                let key = filters[i].key
                console.log(a[key].value)
                if(a[key].value == filters[i].value){
                    result = true
                    break
                }
            }

            return result
        }
    },
    sort: function(index) {
        let self = this
        return function (a, b) {
            if(a[index] && b[index]){
                let result
                switch (a[index].type){
                    case 'number':
                        result = self.compareNumber(a[index], b[index])
                        break
                    case 'string':
                        result = self.compareString(a[index], b[index])
                        break
                    case 'date':
                        result = self.compareDate(a[index], b[index])
                        break
                    default:
                        result = 0
                }
                return result
            }
        }
    }
}