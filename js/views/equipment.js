"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";

let equip = {
    view: function() {
        return [
            m("h1", "Log In"),
            m("form.login-form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    equipment.loadin();
                }
            }, [
                m("lavel.input-label", "E-post")
            ])
        ];
    }
}
