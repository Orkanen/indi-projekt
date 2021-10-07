"use strict";

import m from "mithril";

import { signin } from "../models/signin.js";

let register = {

    view: function () {
        return [
            m("div.startBox", [
                m("h1", "Register"),
                m("form.login-form", {
                    onsubmit: function (event) {
                        event.preventDefault();
                        signin.register();
                    }
                }, [
                    m("div.formBox", [
                        m("label.input-label", "E-post: "),
                        m("input[type=email].input", {
                            oninput: function (event) {
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
                        m("input[type=submit][value=Register].button", "Register")
                    ])
                ])
            ])
        ];
    }
};

export { register };
