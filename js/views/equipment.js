"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";

let equip = {
    oninit: equipment.loadinAvailable,

    view: function() {
        return [ m("div.contentHolder", [
                m("h1", "Equipment-page"),
                m("h3", "equipment for rent.")
            ]),
            m("div.hBox", equipment.currentEquipment.map(function (all) {
                return m("div.bBox", [
                    m("h3.bTitle", all.machine),
                    m("button", {onclick: function(event) {
                        equipment.rent(all.id),
                        m.route.set("/home")
                    }}, "Rent"),
                    m("div.katBox", all.category),
                    m("div.conBox", all.condition)
                ]);
            }))
        ];
    }
}
export { equip };
