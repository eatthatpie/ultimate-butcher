const { 
    GrayscaleFilter, 
    GaussianBlurFilter 
} = require('./filters');

module.exports = {
    test: () => {
        console.log('[Smart Butcher] Testing');

        let colorArray = [
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 255, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [255, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        ];

        // @TODO: 1. Canny Edge Detection
        // @TODO(?): put it to the chainable object like colorArray = image.apply('grayscale').apply('gaussian') or 
        // image.apply([
        //     new GrayscaleFilter(),    
        //     new GaussianBlurFilter()
        // ])
        try {
            colorArray = GrayscaleFilter.applyFilter(colorArray);
            colorArray = GaussianBlurFilter.applyFilter(colorArray);
        }
        catch(e) {
            console.error(e);
        }

        // @TODO: 2. Hough transform
        
        return colorArray;
    }
}