import React from 'react';
import CircularMenuSection from './CircularMenuSection';
import './CircularMenu.scss';

class CircularMenu extends React.Component {
    canvas;
    canvasListeners = [
        {
            eventName: 'mousemove',
            callback: e => {
                const rect = this.canvas.getBoundingClientRect();

                const position = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };

                this.state.sections.forEach(section => {
                    section.mouseMove(position);
                });
            }
        },
        {
            eventName: 'click',
            callback: () => {
                this.state.sections.forEach(section => {
                    section.click();
                });
            }
        }
    ];
    context;
    left = 0;
    top = 0;
    windowListeners = [
        {
            eventName: 'contextmenu',
            callback: e => {
                e.preventDefault();

                this.toggleContextMenu(e);
            }
        },
        {
            eventName: 'click',
            callback: () => {
                this.forceCloseToggleContextMenu();
            }
        },
        {
            eventName: 'mousemove',
            callback: e => {
                const relX = e.clientX - (this.left + 150);
                const relY = e.clientY - (this.top + 150);

                const rRelX = - Math.atan(relX / 1800) * 150;
                const rRelY = Math.atan(relY / 1800) * 150;

                console.log(relX, relY, this.canvas.style.transform);

                this.canvas.style.transform = `rotateX(${rRelY}deg) rotateY(${rRelX}deg) rotateZ(0)`;
            }
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            sections: []
        };

        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.canvas = document.getElementById('circular-menu-canvas');
        this.context = this.canvas.getContext('2d');

        this.bootAnimationFrame();
        this.bootWindowListeners();
        this.bootCanvasListeners();
        this.bootMenuSections();

        window.requestAnimationFrame(() => {
            this.draw(this.canvas);
        });
    }

    bootAnimationFrame() {
        window.requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 100 / 6);
            };
    }

    bootCanvasListeners() {
        this.canvasListeners.forEach(listener => {
            this.canvas.addEventListener(listener.eventName, listener.callback);
        });
    }

    bootWindowListeners() {
        this.windowListeners.forEach(listener => {
            window.addEventListener(listener.eventName, listener.callback);
        });
    }

    bootMenuSections() {
        const n = 6;
        const diff = 2 / n;
        const space = 0.02;

        let sections = [];

        for(let i = 0; i < n; i++) {
            let start = i * diff;
            let end = start + diff - space;

            let section = new CircularMenuSection({
                context: this.context,
                centerX: this.canvas.width / 2,
                centerY: this.canvas.height / 2, 
                angleStart: start * Math.PI, 
                angleEnd: end * Math.PI, 
                radius: 80,
                strokeWidth: 80, 
                label: 'Slice ' + i,
                callbackOnClick: (item) => {
                    console.log('item clicked!');
                    console.log(item.label);
                }
            });

            sections.push(section);
        }

        this.setState({
            sections: this.state.sections.concat(sections)
        });
    }

    componentWillUnmount() {
        this.windowListeners.forEach(listener => {
            window.removeEventListener(listener.eventName, listener.callback);
        });
    }

    draw(canvas) {
        window.requestAnimationFrame(() => {
            this.draw(canvas);
        });

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        this.state.sections.forEach(section => {
            section.draw();
        });
    }

    toggleContextMenu(e) {
        if (this.state.isOpen) {
            this.forceCloseToggleContextMenu();

            return;
        }

        this.canvas.style.transform = 'none';

        this.top = e.clientY - 150;
        this.left = e.clientX - 150;

        const canvasContainer = document.getElementById('circular-menu');

        canvasContainer.style.top = this.top + 'px';
        canvasContainer.style.left = this.left + 'px';

        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    forceCloseToggleContextMenu() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <div 
                id="circular-menu" 
                className={ 'circular-menu' + (this.state.isOpen ? ' is-open' : '') }
            >
                <canvas 
                    id="circular-menu-canvas" 
                    className="circular-menu-canvas"
                    height="300"
                    width="300"
                />
            </div>
        );
    }
}

export default CircularMenu;