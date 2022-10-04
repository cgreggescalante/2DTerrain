let NoiseFilter = (...filters) => {
    return source => (width, height) => filters.reduce((prev, filter) => filter(prev), source(width, height))
}

Terrain = sketch => {
    let perlinLayer = PerlinNoiseSource(sketch, 160, 160)(sketch.width, sketch.height)

    let noiseFilter = NoiseFilter(
        MultiplyLayers(perlinLayer),
        MapFilter(0, 1)
    )

    let source = PerlinNoiseSource(sketch, 40, 40, 5)

    let heightMap = noiseFilter(source)(sketch.width, sketch.height)

    return TerrainShader(sketch)(heightMap)
}

Island = sketch => {
    let perlinLayer = PerlinNoiseSource(sketch, 160, 160)(sketch.width, sketch.height)

    let noiseFilter = NoiseFilter(
        CircleFilter(sketch.width * .35, .3),
        MultiplyLayers(perlinLayer),
        MapFilter(0, 1)
    )

    let source = PerlinNoiseSource(sketch, 40, 40, 5)

    let heightMap = noiseFilter(source)(sketch.width, sketch.height)

    return TerrainShader(sketch)(heightMap)
}

Archipelago = sketch => {
    let metaballLayer = MetaballsSource(sketch, 10, sketch.width, sketch.height, 200, .2)(sketch.width, sketch.height)
    let perlinLayer = PerlinNoiseSource(sketch, 160, 160)(sketch.width, sketch.height)

    let noiseFilter = NoiseFilter(
        MultiplyLayers(metaballLayer),
        // MultiplyLayers(perlinLayer, 5),
        MapFilter(0, 1),
        ExponentialFilter(2),
        MapFilter(0, 1)
    )

    let source = PerlinNoiseSource(sketch, 40, 40, 5)

    let heightMap = noiseFilter(source)(sketch.width, sketch.height)

    return TerrainShader(sketch)(heightMap)
}

Metaballs = sketch => {
    let perlinLayer = MapFilter(.5, 1)(
        PerlinNoiseSource(sketch, 100, 100)(sketch.width, sketch.height)
    )

    let noiseFilter = NoiseFilter(

        MapFilter(0, 1),
        MultiplyLayers(perlinLayer),
        SteppedFilter(.1)
    )

    let source = MetaballsSource(sketch, 10, sketch.width, sketch.height, 1000)

    let heightMap = noiseFilter(source)(sketch.width, sketch.height)

    let shader = GradientShader(sketch, sketch.color(0, 10, 77), sketch.color(255, 0, 251))

    return shader(heightMap)
}