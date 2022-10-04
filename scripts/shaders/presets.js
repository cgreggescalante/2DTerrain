let TerrainShader = skt => LayeredShader(
    [
        // Water
        [.21, GradientLayer(skt, 0, .1, skt.color(0, 50, 90), skt.color(0, 104, 196))],
        // Sand
        [.22, SimpleLayer(skt.color(248, 208, 146))],
        // Grass / Trees
        [.55, GradientLayer(skt, .23, .55, skt.color(104, 159, 56), skt.color(34, 98, 37))],
        // Low Mountains
        [.7, SimpleLayer(skt.color(74, 48, 46))],
        // High Mountains
        [.8, SimpleLayer(skt.color(108, 103, 96))],
        // Snow
        [1, SimpleLayer(skt.color(225, 230, 250))]
    ]
)