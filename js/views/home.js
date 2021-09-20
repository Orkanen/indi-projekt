"use strict";

import m from 'mithril';

let home = {
    view: function() {
        return [ m("h1", "Home"),
            m("h3", "Welcome Home."),
            m(m.route.Link, {
                selector: "button",
                href: "/logout",
                class: "form-button"
            }, "Logout")

        ];

    }
};

export { home };
