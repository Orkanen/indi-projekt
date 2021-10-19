"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";
import { layout } from './layout';
import * as icons from '@mithril-icons/font-awesome/solid'

var grpVisible = false;
var modal = {
    name: "",
    id: "",
    event: function(eventId, eventName) {
        modal.id = eventId;
        modal.name = eventName
    },
    log: function() {
        console.log("group is now visible")
    },
    view: function() {
        return  [ m("div.modal", [
                      m("p", modal.id),
                      m("p", modal.name),
                      m("button.buttBox", {onclick: function(event) {
                          grpVisible = false,
                          m.route.set("/equipment")
                      }}, "Return"),
                      m("button.buttBox", {onclick: function(event) {
                          modal.event("", ""),
                          grpVisible = false
                      }}, "Close")
                  ])
                ];
    }
}

let admin = {
    oninit: equipment.loadinUserRent,

    view: function() {
        return [ m("div.contentHolder", [
                m("h1", "Administration"),
                m("button.crtBox", {onclick: function(event) {
                    grpVisible = true
                }}, "Create"),
                m("button.crtBox", {onclick: function(event) {
                    m.route.set("/admin/users")
                }}, "Users")
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
                            m("div.adminBox", [
                                m("button.buttBox", {onclick: function(event) {
                                    grpVisible = true
                                }}, "Edit"),
                                m("button.buttBox", {onclick: function(event) {
                                    grpVisible = true
                                }}, "Delete")
                            ]),
                            m("div.userBox", all.userEmail),
                            m("div.katBox", all.category),
                            m("div.conBox", all.condition)
                        ])
                    ])
                ]);
            })),
            m("div", [
                    grpVisible ? m.fragment({
                        oninit: modal.log(),
                    }, [
                        modal.view()
                    ]) : null
                ])
            ];
    }
};


export { admin };
