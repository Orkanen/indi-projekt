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

let adminUsers = {
    oninit: equipment.loadinUsers,

    view: function() {
        return [ m("div.contentHolder", [
                m("h1", "Administration - Users"),
                m("button.crtBox", {onclick: function(event) {
                    m.route.set("/admin")
                }}, "Equipment")
            ]),
            m("div.hBox", equipment.currentUsers.map(function (all) {
                return m("div.bBox", [
                    m("div", [
                        m("div.equipBox", [
                            m("h3.bTitle", all.email)
                        ]),
                        ]),
                        m("div.equipBox", [
                            m("div.adminBox", [
                                m("button.buttBox", {onclick: function(event) {
                                    m.route.set(`/admin/editusr/${all.id}`)
                                }}, "Edit"),
                                m("button.buttBox", {onclick: function(event) {
                                    m.route.set(`/admin/delusr/${all.id}`)
                                }}, "Delete")
                            ]),
                            m("div.katBox", all.title),
                            m("div.conBox", all.id)
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


export { adminUsers };
