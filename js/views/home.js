"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";

let home = {
    oninit: equipment.loadin,

    view: function() {
        return [ m("h1", "Home"),
            m("div.hBox", equipment.currentEquipment.map(function (equip) {
                return m("div.bBox", [
                    m("p", equip.machine)
                ]);
            })),
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
