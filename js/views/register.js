"use strict";

import m from "mithril";

import { dogs } from "../models/dogs.js";

let register = {

    view: function () {
        return [
            m("h1", "Log In"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    dogs.register();
                }
            }, [
                m("lavel.input-label", "E-post"),
                m("input[type=email].input", {
                    oninput: function (event) {
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
                m("input[type=submit][value=Register].button", "Register")
            ])
        ];
    }
};

export { register };
