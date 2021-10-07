"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";
import * as icons from '@mithril-icons/font-awesome/solid'

let equip = {
    oninit: function(vnode) {
        console.log(vnode.attrs.id);
        equipment.loadCategories,
        equipment.loadinwCategory(vnode.attrs.id)
    },

    view: function() {
        return [ m("div.contentHolder", [
                m("h1", "Equipment-page"),
                m("h3", "equipment for rent.")
            ]),
            m("div.hBox", equipment.currentEquipment.map(function (all) {
                return m("div.bBox", [
                    m("div", [
                        m("div.equipBox", [
                            m("h3.bTitle", all.machine),
                            m(icons[all.image], {height: "1em"})
                        ]),
                        m("div.equipBox", [
                            m("div.descBox", all.description)
                        ]),
                        m("div.equipBox", [
                            m("button.buttBox", {onclick: function(event) {
                                equipment.rent(all.id),
                                equipment.loadinBorrowed,
                                m.route.set("/home")
                            }}, "Rent"),
                            m("div.katBox", all.category),
                            m("div.conBox", all.condition)
                        ])
                    ])
                ]);
            }))
        ];
    }
}
export { equip };
