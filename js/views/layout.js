"use strict";

import m from 'mithril';

import { signin } from "../models/signin.js";

var path = window.location.href;
var current = path.substring(path.lastIndexOf('/')+1);
function myfunction(){
        if (current == "home") {
            m("a.active", { href: "#!/home" }, "Home"),
            m("a", { href: "#!/equipment" }, "Equipment"),
            m("a", { href: "#!/admin" }, "Admin"),
            m("a.bEnd", { href: "#!/logout" }, "Log Out")
        } else if (current == "equipment") {
            m("a", { href: "#!/home" }, "Home"),
            m("a.active", { href: "#!/equipment" }, "Equipment"),
            m("a", { href: "#!/admin" }, "Admin"),
            m("a.bEnd", { href: "#!/logout" }, "Log Out")
        } else if (current == "admin") {
            m("a", { href: "#!/home" }, "Home"),
            m("a", { href: "#!/equipment" }, "Equipment"),
            m("a.admin", { href: "#!/admin" }, "Admin"),
            m("a.bEnd", { href: "#!/logout" }, "Log Out")
        } else {
            m("a", { href: "#!/home" }, "Home"),
            m("a", { href: "#!/equipment" }, "Equipment"),
            m("a", { href: "#!/admin" }, "Admin"),
            m("a.bEnd", { href: "#!/logout" }, "Log Out")
        }
}

let layout = {
    view: function(vnode) {
        var path = window.location.href;
        var currentURL = path.substring(path.lastIndexOf('/')+1);
        if (signin.token && signin.title == "admin") {
            return [
                m("nav.top-nav",
                    { textContent: ""},
                    [
                        console.log(currentURL),
                        m("a", {
                            href: "#!/home",
                            class: currentURL == "home" ? "active" : ""
                        }, "Home"),
                        m("a", {
                            href: "#!/equipment",
                            class: currentURL == "equipment" ? "active" : ""
                        }, "Equipment"),
                        m("a", {
                            href: "#!/admin",
                            class: currentURL == "admin" ? "active" : ""
                        }, "Admin"),
                        m("a.bEnd", { href: "#!/logout" }, "Log Out")
                    ]),
                m("main.container", vnode.children)
            ];
        } else if (signin.token) {
            return [
                m("nav.top-nav",
                    { textContent: ""},
                    [
                        m("a", {
                            href: "#!/home",
                            class: currentURL == "home" ? "active" : ""
                        }, "Home"),
                        m("a", {
                            href: "#!/equipment",
                            class: currentURL == "equipment" ? "active" : ""
                        }, "Equipment"),
                        m("a.bEnd", { href: "#!/logout" }, "Log Out")
                    ]),
                m("main.container", vnode.children)
            ];
        }
        return [
            m("nav.top-nav",
                { textContent: ""},
                [
                    m("a", {
                        href: "#!/login",
                        class: currentURL == "login" ? "active" : ""
                    }, "Log in"),
                    m("a", {
                        href: "#!/register",
                        class: currentURL == "register" ? "active" : ""
                    }, "Register")
                ]),
            m("main.container", vnode.children)
        ];
    }
};

export { layout };
