"use strict";

import m from "mithril";

import { signin } from "../models/signin.js";

let register = {

    view: function () {
        return [
            m("h1", "Log In"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    signin.register();
                }
            }, [
                m("lavel.input-label", "E-post"),
                m("input[type=email].input", {
                    oninput: function (event) {
                        signin.email = event.target.value;
                    },
                    value: signin.email
                }),
                m("lavel.input-label", "Password"),
                m("input[type=password].input", {
                    oninput: function (event) {
                        signin.password = event.target.value;
                    },
                    value: signin.password
                }),
                m("input[type=submit][value=Register].button", "Register")
            ])
        ];
    }
};

export { register };
