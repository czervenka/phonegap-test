var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        var self = this;

        this.swiper = new Slider($('#swipeTest'), {
            marginRight: 80,
            slideMarginRight: 10,
            slideMarginLeft: -10,
            onSlide: function (slider, duration) {
                var width = $('#container').width();
                self.menuSlider.slideTo(-(width*0.15) + 0.15*(slider.xdist+slider.marginRight), 0, duration);
            }
        });

        this.menuSlider = new Slider($('#menu'), {
            draggable: false
        });

        this.swiper.slideTo(0, 0);

        // this.pageB = new Slider($('#pageB'), {
        //     direction: 'vertical',
        //     snap: false
        // });
        // this.pageB.slideMarginTop = -this.pageB.element.height();
        // this.pageB.slideMarginBottom = -this.pageB.element.height();
        this.pageA = new Slider($('#pageA'), {direction: 'vertical'});
        this.home = new Slider($('#home'), {direction: 'vertical'});
    }
}

