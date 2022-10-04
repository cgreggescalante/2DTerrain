const mainSketch = (sketch) => {
    let result

    sketch.setup = () => {
        sketch.createCanvas(1000, 1000)

        result = Archipelago(sketch)
    }

    sketch.draw = () => {
        sketch.loadPixels()

        for (let i = 0; i < sketch.height; i++) {
            for (let j = 0; j < sketch.width; j++) {
                sketch.pixels[(i * sketch.width + j) * 4] = sketch.red(result[i][j]);
                sketch.pixels[(i * sketch.width + j) * 4 + 1] = sketch.green(result[i][j]);
                sketch.pixels[(i * sketch.width + j) * 4 + 2] = sketch.blue(result[i][j]);
                sketch.pixels[(i * sketch.width + j) * 4 + 3] = 255;
            }
        }

        sketch.updatePixels()

        sketch.noLoop()
    }
}

new p5(mainSketch, 'terrain')
