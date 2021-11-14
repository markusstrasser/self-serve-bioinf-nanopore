export const queryParser = (fn1, fn2, v1, v2) => {
    const parseQuotes = str => str.replace(`"`, "").replace(`"`, "")
    const [var1, var2] = [v1, v2].map(parseQuotes).map(v => isNaN(parseFloat(v)) ? v : parseFloat(v))
    // console.log(var1, var2, "aaaa")
    return fn2 ? {
        "fn": fn1,
        "params": {
            "fn": fn2,
            "params": [
                var1,
                var2
            ]
        }
    } : {
            "fn": fn1,
            "params": [var1, var2]
        }
}
//! the ugliest thing I wrote in a long time
export const reverseQueryParse = (query) => {
    return {
        fn1: query.fn,
        fn2: query.params.fn,
        var1: query.params.fn ? query.params.params[0] : query.params[0],
        var2: query.params.fn ? query.params.params[1] : query.params[1]
    }
}
export const saveInStorage = (item, key) => localStorage.setItem(key, JSON.stringify(item))
export const getFromStorage = (key) => JSON.parse(localStorage.getItem(key))