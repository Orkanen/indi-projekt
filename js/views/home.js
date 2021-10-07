"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";
import { layout } from './layout';
import * as icons from '@mithril-icons/font-awesome/solid'

let home = {
    oninit: equipment.loadinBorrowed,

    view: function() {
        return [ m("div.contentHolder", [
                m("h1", "Home"),
                m("h3", "Welcome Home.")
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
                                equipment.return(all.id),
                                equipment.loadinBorrowed,
                                m.route.set("/equipment")
                            }}, "Return"),
                            m("div.katBox", all.category),
                            m("div.conBox", all.condition)
                        ])
                    ])
                ]);
            }))
        ];
    }
};


export { home };
