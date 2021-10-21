"use strict";

import m from "mithril";

import { signin } from "../models/signin.js";
import { equipment } from "../models/equipment.js";
import * as icons from '@mithril-icons/font-awesome/solid'

var groupVisible = false;
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
                      m("p", "Are you sure you wish to CREATE this ITEM?"),
                      m("button.buttBox", {onclick: function(event) {
                          equipment.addEquipment();
                          m.route.set("/admin")
                      }}, "Create"),
                      m("button.buttBox", {onclick: function(event) {
                          modal.event("", ""),
                          groupVisible = false
                      }}, "Close")
                  ])
                ];
    }
}

let crtEquipment = {
    oninit: function() {
        groupVisible = false;
    },
    view: function () {
        return [
            m("div.startBox", [
                m("h1", "Create Equipment"),
                m("form.login-form", {
                    onsubmit: function (event) {
                        event.preventDefault();
                        groupVisible = true
                    }
                }, [
                    m("div.formBox", [
                        m("label.input-label", "Title: "),
                        m("input[type=text].input", {
                            oninput: function (event) {
                                equipment.machine = event.target.value;
                            },
                            value: equipment.machine
                        }),
                        m("label.input-label", "Condition: "),
                        m("input[type=text].input", {
                            oninput: function (event) {
                                equipment.condition = event.target.value;
                            },
                            value: equipment.condition
                        }),
                        m("label.input-label", "Category: "),
                        m("input[type=text].input", {
                            oninput: function (event) {
                                equipment.category = event.target.value;
                            },
                            value: equipment.category
                        }),
                        m("label.input-label", "Description: "),
                        m("textarea.input", {
                            oninput: function (event) {
                                equipment.description = event.target.value;
                            },
                            value: equipment.description
                        }),
                        m("label.input-label", "Image: "),
                        m('select', {
                            oninput: function(event){
                                equipment.image = event.target.value;
                         }},[
                          ["", "Laptop", "Tablet", "Mobile"].map(function(d){
                            return m('option', { value : d, innerHTML : d })
                          })
                        ])
                    ]),
                    m("div.formButtBox", [
                        m("input[type=submit][value=Create Equipment].login-button", "Add")
                    ])
                ])
            ]),
            m("div", [
                    groupVisible ? m.fragment({
                        oninit: modal.log(),
                    }, [
                        modal.view()
                    ]) : null
                ])
            ];
    }
};

export { crtEquipment };
