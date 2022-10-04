PerlinNoiseSource = (sketch, xScale, yScale, layers=1) => {
    let offsets = []

    for (let i = 0; i < layers; i++) {
        offsets.push([Math.random() * 100000, Math.random() * 100000])
    }

    return Source((x, y) => {
        let value = 0;

        for (let i = 1; i <= layers; i++) {
            value += sketch.noise(offsets[i - 1][0] + x / (xScale * (1 / i)), offsets[i - 1][1] + y / (yScale * (1 / i))) * 1 / i
        }

        return value
    })
}


MetaballsSource = (sketch, metaballCount, width, height, radius, power) => {
    let metaballs = []

    for (let i = 0; i < metaballCount; i++) {
        metaballs.push([sketch.random(0, width), sketch.random(0, height)])
    }

    return Source((x, y) => {
        let maxF = 0;

        for (let i = 0; i < metaballCount; i++) {
            let d = Math.sqrt((x - metaballs[i][0]) ** 2 + (y - metaballs[i][1]) ** 2)
            let f = -1 / (1 + Math.exp(-(10 * power / radius) * (d - radius))) + 1
            if (f > maxF) {
                maxF = f;
            }
        }

        return maxF
    })
}

Source = sourceFunction => (width, height) => {
    let result = []

    for (let i = 0; i < height; i++) {
        result.push([])
        for (let j = 0; j < width; j++) {
            result[i].push(sourceFunction(j, i))
        }
    }

    return result
}