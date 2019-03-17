module.exports = {
    /**
     * @param {Array} inputColorArray Color should be grayscaled, so defined by one number (not an array). 
     */
    applyFilter(inputColorArray) {
        // @TODO: this should be a class property (along with inputColorArray set in constructor)
        const imageData = this.getImageData(inputColorArray);

        let colorArray = [].concat(inputColorArray);
        let colorArrayBlurX = [];
        let colorArrayBlurY = [];

        for (let row = 0; row < imageData.rowsCount; row++) {
            colorArrayBlurX[row] = [];
            colorArrayBlurY[row] = [];

            for (let col = 0; col < imageData.columnsCount; col++) {
                colorArrayBlurX[row][col] = this.computePixelKernelX(imageData, colorArray, row, col).reduce(function (a, b) { 
                    return a + b; 
                }, 0);

                colorArrayBlurY[row][col] = this.computePixelKernelY(imageData, colorArray, row, col).reduce(function (a, b) { 
                    return a + b; 
                }, 0);
            }
        }

        return this.combineAxialColorArrays(colorArrayBlurX, colorArrayBlurY);
    },

    getImageData(imageData) {
        if (!imageData) {
            throw new Error(`Image data cannot be null.`);
        }

        const rowsCount = imageData.length;
        const columnsCount = imageData[0].length;

        return {
            rowsCount,
            columnsCount
        }
    },

    // @TODO: DRY
    computePixelKernelX(imageData, colorArray, row, col) {
        let pixelFactors = [
            col > 1 ? colorArray[row][col - 2] : 255, 
            col > 0 ? colorArray[row][col - 1] : 255, 
            colorArray[row][col], 
            col < imageData.cols - 1 ? colorArray[row][col + 1] : 255, 
            col < imageData.cols - 2 ? colorArray[row][col + 2] : 255
        ];

        const gaussianKernel = this.getGaussianKernel();

        return [
            pixelFactors[0] * gaussianKernel[0],
            pixelFactors[1] * gaussianKernel[1],
            pixelFactors[2] * gaussianKernel[2],
            pixelFactors[3] * gaussianKernel[3],
            pixelFactors[4] * gaussianKernel[4]
        ];
    },

    // @TODO: DRY
    computePixelKernelY(imageData, colorArray, row, col) {
        let pixelFactors = [
            row > 1 ? colorArray[row - 2][col] : 255, 
            row > 0 ? colorArray[row - 1][col] : 255, 
            colorArray[row][col], 
            row < imageData.rows - 1 ? colorArray[row + 1][col] : 255, 
            row < imageData.rows - 2 ? colorArray[row + 2][col] : 255
        ];

        const gaussianKernel = this.getGaussianKernel();

        return [
            pixelFactors[0] * gaussianKernel[0],
            pixelFactors[1] * gaussianKernel[1],
            pixelFactors[2] * gaussianKernel[2],
            pixelFactors[3] * gaussianKernel[3],
            pixelFactors[4] * gaussianKernel[4]
        ];
    },

    getGaussianKernel: () => {
        return [0.06136, 0.24477, 0.38774, 0.24477, 0.06136];
    },

    combineAxialColorArrays(colorArrayX, colorArrayY) {
        let out = [];

        for (let row = 0; row < colorArrayX.length; row++) {
            out[row] = [];

            for (let col = 0; col < colorArrayX[row].length; col++) {
                out[row][col] = Math.sqrt(colorArrayX[row][col] * colorArrayY[row][col]);
            }
        }

        return out;
    }
}