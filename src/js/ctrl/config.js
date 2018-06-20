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
            loc    : null
        },
        init : () => {
            try {
                ttrg.rest.get(
                    "./src/php/conts/current.php",
                    null,
                    (ret) => {
                        try {
                            thisobj.comp.curfrm.addChild(
                                new Image({
                                    path : "./img/"+ ret.message +".bmp",
                                    size : new mf.Param('100%', '100%')
                                })
                            );
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    null
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
