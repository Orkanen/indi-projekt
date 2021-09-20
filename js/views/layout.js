"use strict";

import m from 'mithril';

let layout = {
    view: function(vnode) {
        return [
            m("nav.top-nav",
                { textContent: "Projekt"},
            m("main.container", vnode.children)
        )];
    }
};

export { layout };
