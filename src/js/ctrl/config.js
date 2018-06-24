/**
 * @file config.js
 */
let mf = require('mofron');
require('expose-loader?app!../conf/namesp.js');
let Msgdlg = require('mofron-comp-msgdlg');
let Image = require('mofron-comp-image');

require('tetraring4js');

let thisobj = null;

let errmsg = new Msgdlg({
    color   : new mf.Color(255,200,200),
    title   : "Error",
    visible : false
});

try {

    if (null !== thisobj) {
        module.exports = thisobj;
    }
    
    thisobj = {
        comp : {
            apikey : null,
            loc    : null,
            type   : null
        },
        current : null,
        init : () => {
            try {
                ttrg.rest.get(
                    "./src/php/conts/current.php",
                    null,
                    (ret, obj) => {
                        try {
                            //obj.current = ret.message + ".bmp";
                            obj.updconts(ret.message);
                            return;
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    thisobj
                );
                
                ttrg.rest.get(
                    "./src/php/apiconf/get.php",
                    null,
                    (ret) => {
                        try {
                            thisobj.comp.apikey.value(
                                ret.message.key
                            );
                            thisobj.comp.loc.value(
                                ret.message.loc
                            );
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    null
                );
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        },
        seltype : () => {
            try {
                thisobj.updconts(thisobj.current);
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        },
        update : (ldg) => {
            try {
                ttrg.rest.post(
                    "./src/php/conts/update.php",
                    { 'type' : thisobj.comp.type.value() },
                    (ret,obj) => {
                        try {
                            ldg.visible(false);
                            if (false === ret.result) {
                                if (null === errmsg.parent()) {
                                    app.root.addChild(errmsg);
                                }
                                errmsg.text(ret.message);
                                errmsg.visible(true);
                                return;
                            }
                            obj.updconts(ret.message);
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    thisobj
                );
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        },
        updconts : (wet) => {
            try {
                let img_pth = "./img/";
                if (0 === thisobj.comp.type.value()) {
                    img_pth += "p027b/";
                } else if (1 === thisobj.comp.type.value()) {
                    img_pth += "w042/";
                } else if (2 === thisobj.comp.type.value()) {
                    img_pth += "w042r/";
                }
                thisobj.current = wet;
                
                if (0 === thisobj.comp.curfrm.child().length) {
                    thisobj.comp.curfrm.addChild(
                        new Image({
                            path : img_pth + thisobj.current + ".bmp",
                            size : new mf.Param('100%', '100%')
                        })
                    );
                } else {
                    let old = thisobj.comp.curfrm.child()[0];
                    thisobj.comp.curfrm.updChild(
                        old,
                        new Image({
                            path : img_pth + thisobj.current + ".bmp",
                            size : new mf.Param('100%', '100%')
                        })
                    );
                }
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
    };
    module.exports = thisobj;
    
} catch (e) {
    console.error(e.stack);
    throw e;
}
/* end of file */
