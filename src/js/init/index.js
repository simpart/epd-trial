/**
 * @file index.js
 * @brief index page initialize
 */
let mf = require('mofron');
require('expose-loader?app!../conf/namesp.js');

let Appbase = require('mofron-comp-appbase');
let Text = require('mofron-comp-text');
let Form = require('mofron-comp-form');
let Frame = require('mofron-comp-frame');
let Input = require('mofron-comp-input');
let Button = require('mofron-comp-button');
let Heading = require('mofron-comp-borderhdg');
let DropDown = require('mofron-comp-dropdown');
let Image = require('mofron-comp-image');
let Footer = require('mofron-comp-footer');
let Icon = require('mofron-comp-fontawesome');
let Msgdlg = require('mofron-comp-msgdlg');
let Loading = require('mofron-comp-loading');


let efCenter = require('mofron-effect-center');
let hrzCenter = require('mofron-layout-hrzcenter');
let Click = require('mofron-event-click');
let Shadow = require('mofron-effect-shadow');
let Fade = require('mofron-effect-fade');
let Margin = require('mofron-layout-margin');

/* app ctrl */
let theme = require('../conf/theme.js');
let config = require('../ctrl/config.js');


/* regist ctrl component */
config.comp.curfrm = new Frame({
    size   : new mf.Param(400, 300),
    effect : [ new efCenter(true, false) ],
});

config.comp.apikey = new Input({
    label   : "API Key",
    sendKey : "key",
    require : true
});

config.comp.loc = new Input({
    label   : "Location",
    sendKey : "loc",
    require : true
});


let cnfmsg = new Msgdlg({
    color  : new mf.Color(210,210,240)
});

let loading = new Loading({
    text    : '更新中',
    blur    : new mf.Param(app.root, 1),
    visible : false
});

/**
 * page init function
 * 
 * @param rc (mf.Component) root component
 */

//https://openweathermap.org/
let start = (rc) => {
    try {
        //rc.addLayout(new hrzCenter(70));
	rc.addChild(
            new Appbase({
                color  : new mf.Color(210,210,240),
                layout : [
                    new hrzCenter(40),
                    new Margin('top', 30)
                ],
                title  : "E-Paper Sample Tool",
                child  : [
                    new mf.Component({
                        layout : [ new Margin('top', 20) ],
                        child  : [
                            new Heading({
                                width : '100%',
                                text  : new Text({
                                    text : 'E-Paper Config',
                                    size : 30
                                })
                            }),
                            new DropDown({
                                horizon : new mf.Param(true, 20),
                                label   : "Type : ",
                                addList :  ["Y-Con W042(R)", "Y-Con P027B"],
                                size    : new mf.Param(150, 30)
                            }),
                            new Text({
                                text : "Current : ",
                                size : 30
                            }),
                            config.comp.curfrm,
                            new Button({
                                effect     : [ new efCenter(true, false) ],
                                size       : new mf.Param(250, 40),
                                text       : "Update",
                                clickEvent : new mf.Param(
                                    (btn, prm) => {
                                        prm.visible(true);
                                        config.updconts(prm);
                                    },
                                    loading
                                )
                            })
                        ]
                    }),
                    new mf.Component({
                        layout : [ new Margin('top', 20) ],
                        child  : [
                            new Heading({
                                width : '100%',
                                text  : new Text({
                                    text : 'OpenWeatherMap Config',
                                    size : 30
                                })
                            }),
                            new Form({
                                child : [ 
                                    config.comp.apikey,
                                    config.comp.loc
                                ],
                                uri        : "./src/php/apiconf/save.php",
                                submitText : "設定",
                                callback   : new mf.Param(
                                    (ret, fom, prm) => {
                                        prm.text('設定を保存しました。');
                                        if (null === prm.parent()) {
                                            app.root.addChild(prm);
                                        }
                                        prm.visible(true);
                                    },
                                    cnfmsg
                                )
                            })
                        ]
                    }),
                ]
            })
        );
        
        rc.addChild(
            new Footer({
                style  : { 'margin-top' : '20px' },
                height : 70,
                color  : new mf.Color(190,190,230),
                child  : [
                    new Icon({
                        path   : './font/font-awesome-4.7.0/css/font-awesome.min.css',
                        style  : {
                            'margin-left'  : 'auto',
                            'margin-right' : 'auto'
                        },
                        color  : new mf.Color(255,255,255),
                        size   : 70,
                        effect : [ new efCenter(true, true) ],
                        icon   : 'github',
                        event  : [
                            new Click(() => { window.open('https://github.com/simpart/epd-trial', '_blank'); })
                        ]
                    })
                ]
            })
        );
        rc.addChild(loading);
        
        rc.child()[0].header().addEffect(new Shadow(10));
        rc.addEffect(new Fade());
        
        config.init();
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}

try {
    theme.theme(app.root.theme());
    start(app.root);
    app.root.visible(true);
} catch (e) {
    console.error(e.stack);
}
/* end of file */
