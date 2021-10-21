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
    view: function(id) {
        return  [ m("div.modal", [
                      m("p", "Are you sure you wish to EDIT this ITEM? This will result in return of item."),
                      m("button.buttBox", {onclick: function(event) {
                          equipment.editEquipment(id);
                          console.log(id)
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

let editEquipment = {
    oninit: function(vnode) {
        console.log(vnode.attrs.id);
        equipment.loadinwId(vnode.attrs.id)
        groupVisible = false;
    },

    view: function () {
        return [
            m("div.startBox", [
                m("h1", "Edit Equipment"),
                m("form.login-form", {
                    onsubmit: function (event) {
                        event.preventDefault();
                        groupVisible = true
                    }
                },
                 [
                    m("div.formBox", [
                        m("label.input-label", "Title: "),
                        m("input[type=text].input", {
                            oninput: function (event) {
                                equipment.machine = event.target.value;
                            },
                            placeholder: equipment.currentEquipment.machine
                        }),
                        m("label.input-label", "Condition: "),
                        m("input[type=text].input", {
                            oninput: function (event) {
                                equipment.condition = event.target.value;
                            },

                            placeholder: equipment.currentEquipment.condition
                        }),
                        m("label.input-label", "Category: "),
                        m("input[type=text].input", {
                            oninput: function (event) {
                                equipment.category = event.target.value;
                            },
                            placeholder: equipment.currentEquipment.category
                        }),
                        m("label.input-label", "Description: "),
                        m("textarea.input", {
                            oninput: function (event) {
                                equipment.description = event.target.value;
                            },
                            placeholder: equipment.currentEquipment.description
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
                        m("input[type=submit][value=Edit Equipment].login-button", "Add")
                    ])
                ])
            ]),
            m("div", [
                    groupVisible ? m.fragment({
                        oninit: modal.log(),
                    }, [
                        modal.view(equipment.currentEquipment.id)
                    ]) : null
                ])
            ];
    }
};

export { editEquipment };
