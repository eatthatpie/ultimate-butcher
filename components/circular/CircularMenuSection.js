class CircularMenuSection {
    constructor({ 
        context,
        centerX, 
        centerY, 
        angleStart, 
        angleEnd, 
        radius, 
        strokeWidth, 
        label,
        callbackOnClick
    }) {
        this.context = context;
        this.centerX = centerX;
        this.centerY = centerY;
        this.angleStart = angleStart;
        this.angleEnd = angleEnd;
        this.radius = radius;
        this.strokeWidth = strokeWidth;
        this.label = label;
        this.callbackOnClick = callbackOnClick;

        this.isHover = false;
        this.color = '#00000099';

        this.hover = this.hover.bind(this);

        return this;
    }

    click() {
        if (this.isHover) {
            this.callbackOnClick(this);
        }
    }

    draw() {
        this.context.beginPath();
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.strokeWidth;
        this.context.arc(this.centerX, this.centerY, this.radius, this.angleStart, this.angleEnd, false);
        this.context.stroke();
        this.context.closePath();
    }

    hover(isHover) {
        if (isHover) {
            this.color = '#000000ff';
        }
        else {
            this.color = '#00000099';
        }
    }

    mouseMove(position) {
        const polarCoords = this.toPolarCoords(position);

        if (this.angleStart <= polarCoords.a && polarCoords.a <= this.angleEnd) {
            this.handleHover(polarCoords);
        }
        else if (this.isHover === true) {
            this.isHover = false;
            this.hover(false);
        }
    }

    handleHover(polarCoords) {
        if (this.radius - (this.strokeWidth / 2) <= polarCoords.r 
            && polarCoords.r <= this.radius + (this.strokeWidth / 2) 
            && this.isHover !== true) {
            this.isHover = true;
            this.hover(true);
        }
        else if (this.isHover === true) {
            this.isHover = false;
            this.hover(false);
        }
    }

    toPolarCoords(position) {
        const x = position.x - this.centerX;
        const y = position.y - this.centerY;

        let angle = Math.atan2(y, x);
        const r = angle !== 0 ? y / Math.sin(angle) : x;

        angle = angle < 0 ? 2 * Math.PI + angle : angle;

        return {
            a: angle,
            r
        };
    }
}

export default CircularMenuSection;