function ActivityIndicatorWindow(args) {
    var width = 180,
        height = 50;

    var args = args || {};
    var top = args.top || 140;
    var text = args.text || 'Loading ...';

    var win = Titanium.UI.createWindow({
        height:           height,
        width:            width,
        top:              top,
        borderRadius:     10,
        touchEnabled:     false,
        backgroundColor:  '#000',
        opacity:          0.6,
        navBarHidden: 	true
    });

    var view = Ti.UI.createView({
        width:   Ti.UI.FILL,
        height:  Ti.UI.FILL,
        center:  { x: (width/2), y: (height/2) },
        layout:  'horizontal'
    });

    function osIndicatorStyle() {
        style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;

        if ('iPhone OS' !== Ti.Platform.name) {
            style = Ti.UI.ActivityIndicatorStyle.DARK;
        }

        return style;
    }

    var activityIndicator = Ti.UI.createActivityIndicator({
        style:   osIndicatorStyle(),
        left:    0,
        height:  Ti.UI.FILL,
        width:   30
    });

    var label = Titanium.UI.createLabel({
        left:    10,
        width:   Ti.UI.FILL,
        height:  Ti.UI.FILL,
        text:    text,
        color:   '#fff',
        font:    { fontFamily: 'Helvetica Neue', fontSize: isTablet ? 16 : 14, fontWeight: 'bold' }
    });

    view.add(activityIndicator);
    view.add(label);
    win.add(view);

    function openIndicator() {
        win.open();
        activityIndicator.show();
    }

    win.openIndicator = openIndicator;

    function closeIndicator() {
        activityIndicator.hide();
        win.close();
    }

    win.closeIndicator = closeIndicator;

    return win;
}

// Public interface
module.exports = ActivityIndicatorWindow;