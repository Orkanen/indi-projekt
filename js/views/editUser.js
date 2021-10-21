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
                      m("p", "Are you sure you wish to EDIT this USER?"),
                      m("button.buttBox", {onclick: function(event) {
                          signin.editUser(id);
                          console.log(id)
                          m.route.set("/admin")
                      }}, "Edit"),
                      m("button.buttBox", {onclick: function(event) {
                          modal.event("", ""),
                          groupVisible = false
                      }}, "Close")
                  ])
                ];
    }
}

let editUser = {
    oninit: function(vnode) {
        console.log(vnode.attrs.id);
        signin.getUser(vnode.attrs.id)
        groupVisible = false;
    },

    view: function () {
        return [
            m("div.startBox", [
                m("h1", "Edit User"),
                m("form.login-form", {
                    onsubmit: function (event) {
                        event.preventDefault();
                        groupVisible = true
                    }
                },
                 [
                    m("div.formBox", [
                        m("label.input-label", "Title: "),
                        m('select', {
                            oninput: function(event){
                                signin.temptitle = event.target.value;
                         }},[
                          ["", "Admin", "User"].map(function(d){
                            return m('option', { value : d, innerHTML : d })
                          })
                        ]),
                        m("label.input-label", "Id: "),
                        m("input[type=text].input", {
                            readonly: true,
                            value: signin.currentUser.id
                        }),
                        m("label.input-label", "Email: "),
                        m("input[type=text].input", {
                            oninput: function (event) {
                                signin.email = event.target.value;
                            },
                            placeholder: signin.currentUser.email
                        })
                    ]),
                    m("div.formButtBox", [
                        m("input[type=submit][value=Edit User].login-button", "Add")
                    ])
                ])
            ]),
            m("div", [
                    groupVisible ? m.fragment({
                        oninit: modal.log(),
                    }, [
                        modal.view(signin.currentUser.id)
                    ]) : null
                ])
            ];
    }
};

export { editUser };
