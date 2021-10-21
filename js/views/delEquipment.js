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
                      m("p", "Are you sure you wish to DELETE this ITEM?"),
                      m("button.buttBox", {onclick: function(event) {
                          equipment.delEquipment(id);
                          //console.log(id);
                          m.route.set("/admin")
                      }}, "Delete"),
                      m("button.buttBox", {onclick: function(event) {
                          modal.event("", ""),
                          groupVisible = false
                      }}, "Close")
                  ])
                ];
    }
}

let delEquipment = {
  oninit: function(vnode) {
      console.log(vnode.attrs.id);
      equipment.loadinwId(vnode.attrs.id)
      groupVisible = false;
  },

  view: function () {
      return [
          m("div.startBox", [
              m("h1", "Delete Equipment"),
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
                          readonly: true,
                          oninput: function (event) {
                              equipment.machine = event.target.value;
                          },
                          value: equipment.currentEquipment.machine
                      }),
                      m("label.input-label", "Condition: "),
                      m("input[type=text].input", {
                          readonly: true,
                          oninput: function (event) {
                              equipment.condition = event.target.value;
                          },

                          value: equipment.currentEquipment.condition
                      }),
                      m("label.input-label", "Category: "),
                      m("input[type=text].input", {
                          oninput: function (event) {
                              equipment.category = event.target.value;
                          },
                          value: equipment.currentEquipment.category
                      }),
                      m("label.input-label", "Description: "),
                      m("textarea.input", {
                          readonly: true,
                          oninput: function (event) {
                              equipment.description = event.target.value;
                          },
                          value: equipment.currentEquipment.description
                      }),
                      m("label.input-label", "Image: "),
                      m("input[type=text].input", {
                          readonly: true,
                          oninput: function (event) {
                              equipment.description = event.target.value;
                          },
                          value: equipment.currentEquipment.image
                      })
                  ]),
                  m("div.formButtBox", [
                      m("input[type=submit][value=Delete Equipment].login-button", "Remove")
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

export { delEquipment };
