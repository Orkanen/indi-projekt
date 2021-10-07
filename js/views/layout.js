"use strict";

import m from 'mithril';

import { signin } from "../models/signin.js";

let layout = {
    view: function(vnode) {
        if (signin.token) {
            return [
                m("nav.top-nav",
                    { textContent: ""},
                    [
                        m("a", { href: "#!/home" }, "Home"),
                        m("a", { href: "#!/equipment" }, "Equipment"),
                        m("a.bEnd", { href: "#!/logout" }, "Log Out")

                    ]),
                m("main.container", vnode.children)
            ];
        }
        return [
            m("nav.top-nav",
                { textContent: ""},
                [
                    m("a", { href: "#!/login" }, "Log In"),
                    m("a", { href: "#!/register" }, "Register")
                ]),
            m("main.container", vnode.children)
        ];
    }
};

export { layout };
