"use strict";

import m from 'mithril';

import { dogs } from "../models/dogs.js";

let login = {
    view: function() {
        return [
            m("h1", "Log In"),
            m("form.login-form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    dogs.login();
                }
            }, [
                m("lavel.input-label", "E-post"),
                m("input[type=email].input", {
                    oninput: function (event) {
                        //console.log(event.target.value);
                        dogs.email = event.target.value;
                    },
                    value: dogs.email
                }),
                m("lavel.input-label", "Password"),
                m("input[type=password].input", {
                    oninput: function (event) {
                        dogs.password = event.target.value;
                    },
                    value: dogs.password
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
