"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";
import * as icons from '@mithril-icons/font-awesome/solid'


var groupVisible = false;
var modal = {
    id: "",
    name: "",
    condition: "",
    category: "",
    image: "",
    event: function(eventId, eventName, eventCon, eventCat, eventImage) {
        modal.id = eventId,
        modal.name = eventName,
        modal.condition = eventCon,
        modal.category = eventCat,
        modal.image = eventImage
    },
    log: function() {
        console.log("group is now visible")
    },
    view: function() {
        return  [ m("div.modal", [
                      m("div.equipModal", [
                          m("h3.capitalize", modal.name),
                          m(icons[modal.image], {height: "1em"}),
                      ]),
                      m("p", modal.condition),
                      m("p", modal.category),
                      m("button.buttBox", {onclick: function(event) {
                          equipment.rent(modal.id),
                          equipment.loadinBorrowed,
                          m.route.set("/home")
                      }}, "Rent"),
                      m("button.buttBox", {onclick: function(event) {
                          modal.event("", ""),
                          groupVisible = false
                      }}, "Close")
                  ])
                ];
    }
}

let equip = {
    oninit: function(vnode) {
        console.log(vnode.attrs.id);
        equipment.currentEquipment = [];
        equipment.loadCategories,
        equipment.loadinwCategory(vnode.attrs.id)
        groupVisible = false;
    },

    view: function() {
        return [ m("div.contentHolder",
            m("div.capitalize", [
                m("h1", equipment.cat+"s"),
                m("h3", "Choose equipment to rent.")
            ])
        ),
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
                                //equipment.rent(all.id),
                                //equipment.loadinBorrowed,
                                //groupVisible = false
                                modal.event(all.id, all.machine, all.condition,
                                    all.category, all.image)
                                groupVisible = true
                                //m.route.set("/home")
                            }}, "Rent"),
                            m("div.katBox", all.category),
                            m("div.conBox", all.condition)
                        ])
                    ])
                ]);
            })),
            m("div", [
                groupVisible ? m.fragment({
                    oninit: modal.log(),
                }, [
                    modal.view()
                ]) : null
            ])
        ];
    }
}
export { equip };
