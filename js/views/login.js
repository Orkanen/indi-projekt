"use strict";

import m from 'mithril';

import { signin } from "../models/signin.js";

let login = {
    view: function() {
        return [
            m("h1", "Log In"),
            m("form.login-form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    signin.login();
                }
            }, [
                m("lavel.input-label", "E-post"),
                m("input[type=email].input", {
                    oninput: function (event) {
                        //console.log(event.target.value);
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
                m("input[type=submit][value=Log in].login-button", "Log In"),
                m(m.route.Link, {
                    selector: "button",
                    href: "/register",
                    class: "form-button"
                }, "Register User")
            ])
        ];
    }
};

export { login };
