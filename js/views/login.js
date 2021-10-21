"use strict";

import m from 'mithril';

import { signin } from "../models/signin.js";

let login = {
    view: function() {
        return [
            m("div.startBox", [
                m("h1", "Log In"),
                m("form.login-form", {
                    onsubmit: function (event) {
                        event.preventDefault();
                        signin.login();
                    }
                }, [
                    m("div.formBoxLog", [
                        m("label.input-label", "E-post: "),
                        m("input[type=email].input", {
                            oninput: function (event) {
                                //console.log(event.target.value);
                                signin.email = event.target.value;
                            },
                            value: signin.email
                        }),
                        m("label.input-label", "Password: "),
                        m("input[type=password].input", {
                            oninput: function (event) {
                                signin.password = event.target.value;
                            },
                            value: signin.password
                        })
                    ]),
                    m("div.formButtBox", [
                        m("input[type=submit][value=Log in].login-button", "Log In"),
                        m(m.route.Link, {
                            selector: "button",
                            href: "/register",
                            class: "form-button"
                        }, "Register")
                    ])
                ])
            ])
        ];
    }
};

export { login };
