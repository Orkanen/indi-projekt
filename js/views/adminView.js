"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";
import { layout } from './layout';
import * as icons from '@mithril-icons/font-awesome/solid'

let admin = {
    oninit: equipment.loadinUserRent,

    view: function() {
        return [ m("div.contentHolder", [
                m("h1", "Administration - Equipments"),
                m("button.crtBox", {onclick: function(event) {
                    m.route.set("/admin/crteq")
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
                                    m.route.set(`/admin/editeq/${all.id}`)
                                }}, "Edit"),
                                m("button.buttBox", {onclick: function(event) {
                                    m.route.set(`/admin/deleq/${all.id}`)
                                }}, "Delete")
                            ]),
                            m("div.userBox", all.userEmail),
                            m("div.katBox", all.category),
                            m("div.conBox", all.condition)
                        ])
                    ])
                ]);
            }))
            ];
    }
};


export { admin };
