
var Slider = function(element, config) {
    this.defaultConfig = config;
    this.draggable = true; // reacts to dragging
    this.direction = 'horizontal'; // lock to this direction
    this.element = element; // jQuery compatible element
    // margins to swap to (relative to container)
    this.marginLeft = 0;
    this.marginRight = 0;
    this.marginTop = 0;
    this.marginBottom = 0;
    // dragging stops on when this margin is reached
    this.slideMarginRight = 0;
    this.slideMarginLeft = 0;
    this.slideMarginTop = 0;
    this.slideMarginBottom = 0;
    this.snap = true; // snap to margins
    // distance from start of page
    this.xdist = 0;
    this.ydist = 0;
    // true if the object is currently being dragged
    this._isDragged = false;

    this._touch = function(event) {
        return event.touches[0];
    }

    this.slideTo = function (x, y, duration) {
        if (this._isDragged) {
            if (this.direction == 'horizontal' && (x > (this.pageWidth - this.slideMarginRight) || x < this.slideMarginLeft)) {
                console.log('Margin h', 'x', x, 'y', y, 'w', this.pageWidth, 'h', this.pageHeight);
                return;
            } else if (this.direction == 'vertical' && (y < this.slideMarginTop || y > (this.pageHeight - this.slideMarginBottom))) {
                console.log('Margin v', this.element.attr('id'), 'x', x, 'y', y, 'w', this.pageWidth, 'h', this.pageHeight);
                return;
            }
        }
        if (!duration) {
            duration = 0;
        }
        console.log('Sliding to.', x, y, duration, '(', this.xdist, this.ydist, ')');
        var s = this.element[0].style;
        s.webkitTransitionDuration = duration + 's';
        s.webkitTransform = 'translate3d('+x+'px,'+y+'px,0)';
        if (duration) {
            this.element.on('transitionEnd', function (e) { s.webkitTransitionDuration = '';});
        }
        this.xdist = x;
        this.ydist = y;
        if (this.onSlide) {
            this.onSlide(this, duration);
        }
        
    }

    this.slideOut = function (to, duration) {
        switch(to) {
            case 'left':
                to = [-(this.pageWidth + this.marginLeft), 0];
                break;
            case 'right':
                to = [this.pageWidth - this.marginRight, 0];
                break;
            case 'up':
                to = [0, -(this.pageHeight + this.marginTop)];
                break;
            case 'right':
                to = [0, this.pageHeight - this.marginBottom];
                break;
        }
        this.slideTo(to[0], to[1], duration);
    }

    this.slideIn = function (duration) {
        this.slideTo(this.marginLeft, this.marginTop, duration);
    }

    this.onTouchStart = function (event) {
        // event.preventDefault();
        this.startTouch = this._touch(event);
        this.startTouch.xdist = this.xdist;
        this.startTouch.ydist = this.ydist;
    }

    this.onTouchEnd = function (event) {
        // event.preventDefault();
        this.stopTouch = this._touch(event);
        if (this.snap && this._isDragged) {
            if (this.xdist > ((this.pageWidth-this.marginRight) / 2)) {
                this.slideOut('right', 0.25);
            } else if (this.ydist > ((this.pageHeight-this.marginBottom) / 2)) {
                this.slideOut('down', 0.25);
            } else {
                this.slideIn(0.25);
            }
        }
        this._isDragged = false;
    }

    this.onTouchMove = function (event) {
        // event.preventDefault();
        // console.log('Touch move', event);
        var touch = this._touch(event);
        var xDragDist = touch.clientX - this.startTouch.clientX
        var yDragDist = touch.clientY - this.startTouch.clientY
        var xdist = xDragDist + this.startTouch.xdist;
        var ydist = yDragDist + this.startTouch.ydist;
        if (!this._isDragged) {
            console.log('not drag', this.element.attr('id'), xdist, ydist)
            if (this.direction == 'horizontal' && Math.abs(xDragDist) > 15 && Math.abs(yDragDist) < 10) {
                this._isDragged = true;
            } if (this.direction == 'vertical' && Math.abs(yDragDist) > 15 && Math.abs(xDragDist) < 10) {
                this._isDragged = true;
            }
        }
        if (this._isDragged) {
            event.preventDefault()
            if (this.direction == 'horizontal') {
                this.slideTo(xdist, 0);
            } else if (this.direction == 'vertical') {
                this.slideTo(0, ydist);
            }
        }
    }

    this.init = function (config) {
        if (!config) {
            var config = this.defaultConfig;
        }
        for (k in config) {
            this[k] = config[k];
        }
        this.pageWidth = $('#container').width();
        this.pageHeight = $('#container').height();
        if (this.draggable) {
            var self = this;
            element.on('touchstart', function (e) {self.onTouchStart(e);});
            element.on('touchend', function (e) {self.onTouchEnd(e);});
            element.on('touchmove', function (e) {self.onTouchMove(e);});
        }
    }
    this.init();
}
