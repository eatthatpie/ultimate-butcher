module.exports = {
    getFactorsStrategy: strategyName => {
        const strategies = {
            'computer': {
                r: 1/3,
                g: 1/3,
                b: 1/3
            },
            'human': {
                r: 0.3,
                g: 0.59,
                b: 0.11
            }
        }

        if (strategies.hasOwnProperty(strategyName)) {
            return strategies[strategyName];
        }

        return null;
    },

    applyFilter: function(inputColorArray) {
        let out = [];
        const factorsStrategy = this.getFactorsStrategy('computer');

        for (let i = 0; i < inputColorArray.length; i++) {
            out[i] = [];

            for (let j = 0; j < inputColorArray[i].length; j++) {
                // @TODO: alpha factor?
                const r = inputColorArray[i][j][0] * factorsStrategy.r;
                const g = inputColorArray[i][j][1] * factorsStrategy.g;
                const b = inputColorArray[i][j][2] * factorsStrategy.b;
                
                const sum = r + g + b;

                out[i][j] = sum;

            }
        }

        return out;
    }
}