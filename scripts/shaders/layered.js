LayeredShader = layers => Shader(height => {
    for (let i = 0; i < layers.length; i++) {
        if (layers[i][0] >= height) {
            return layers[i][1](height)
        }
    }

    return color(0, 0, 0)
})

Layer = (layerFunction, minHeight=0, maxHeight=1) => height => {
    return layerFunction((height - minHeight) / (maxHeight - minHeight))
}

SimpleLayer = (layerColor) => Layer(height => layerColor)

GradientLayer = (skt, v0, v1, c0, c1) => Layer(height => {
    let r = skt.red(c0) + height * (skt.red(c1) - skt.red(c0))
    let g = skt.green(c0) + height * (skt.green(c1) - skt.green(c0))
    let b = skt.blue(c0) + height * (skt.blue(c1) - skt.blue(c0))

    return skt.color(r, g, b)
}, v0, v1)