/**
 * @file index.js
 * @brief index page initialize
 */
let mf = require('mofron');
require('expose-loader?app!../conf/namesp.js');
let Text = require('mofron-comp-text'); 
let SSR = require('mofron-ssrender');

/* app ctrl */
let theme = require('../conf/theme.js');

/**
 * page init function
 * 
 * @param rc (mf.Component) root component
 */
let start = (rc) => {
    try {
        let ssr = new SSR();
	rc.size(264, 176)
	rc.addChild(new Text('aaaaaaaaaaaa'));
	
	ssr.render(rc);
	
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}

try {
    theme.theme(app.root.theme());
    start(app.root);
} catch (e) {
    console.error(e.stack);
}
/* end of file */
