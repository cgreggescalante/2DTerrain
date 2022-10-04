SimpleFilter = filterFunction => source => {
    for (let i = 0; i < source.length; i++) {
        for (let j = 0; j < source[0].length; j++) {
            source[i][j] = filterFunction(source[i][j])
        }
    }

    return source;
}

ExponentialFilter = power => SimpleFilter(current => {
    return Math.pow(current, power)
})

SteppedFilter = stepSize => SimpleFilter(current => {
    return current - (current % stepSize)
})

FloorFilter = floor => SimpleFilter(current => {
    return Math.max(current, floor)
})

CeilingFilter = ceiling => SimpleFilter(current => {
    return Math.min(current, ceiling)
})