/**
 * @file config.js
 */
let mf = require('mofron');
let Image = require('mofron-comp-image');

require('tetraring4js');

let thisobj = null;

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
                            obj.current = ret.message + ".bmp";
                            obj.seltype();
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
                let img_pth = "./img/";
                if (0 === thisobj.comp.type.value()) {
                    img_pth += "p027b/";
                } else if (1 === thisobj.comp.type.value()) {
                    img_pth += "w042/";
                } else if (2 === thisobj.comp.type.value()) {
                    img_pth += "w042r/";
                }
                
                if (0 === thisobj.comp.curfrm.child().length) {
                    thisobj.comp.curfrm.addChild(
                        new Image({
                            path : img_pth + thisobj.current,
                            size : new mf.Param('100%', '100%')
                        })
                    );
                } else {
                    let old = thisobj.comp.curfrm.child()[0];
                    thisobj.comp.curfrm.updChild(
                        old,
                        new Image({
                            path : img_pth + thisobj.current,
                            size : new mf.Param('100%', '100%')
                        })
                    );
                }
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        },
        updconts : (ldg) => {
            try {
                ttrg.rest.get(
                    "./src/php/conts/update.php",
                    null,
                    (ret) => {
                        try {
                            thisobj.comp.curfrm.updChild(
                                thisobj.comp.curfrm.child()[0],
                                new Image({
                                    path : "./img/"+ ret.message +".bmp",
                                    size : new mf.Param('100%', '100%')
                                })
                            );
                            ldg.visible(false);
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
        }
    };
    module.exports = thisobj;
    
} catch (e) {
    console.error(e.stack);
    throw e;
}
/* end of file */
