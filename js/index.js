"use strict";
import m from 'mithril';

import { layout } from './views/layout';
import { login } from './views/login';
import { register } from './views/register';
import { home } from './views/home';
//import { equip } from './views/equipment';
import { categories } from './views/categories';
import { equip } from './views/categoriesId';

import { signin } from "./models/signin.js";

m.route(document.body, "/", {
    "/": {
      onmatch: function() {
          if (signin.token) {
              return home;
          }

          return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, m(vnode));
        }
    },
    "/register": {
        render: function() {
            return m(layout, m(register));
        }
    },
    "/home": {
          onmatch: function() {
              if (signin.token) {
                  console.log("Login Success");
                  return home;
              }

              return m.route.set("/register");
          },
          render: function(vnode) {
              return m(layout, vnode);
          }
      },
    "/logout": {
      onmatch: function() {
          if (signin.token) {
              signin.logout();
          }
          return m.route.set("/");
        }
    },
    "/login": {
        render: function() {
            return m(layout, m(login));
        }
    },
    "/equipment": {
      onmatch: function() {
          if (signin.token) {
              console.log("Login Success");
              return equip;
          }

          return m.route.set("/login");
      },
      render: function(vnode) {
          return m(layout, vnode);
      }
    },

    "/equipment": {
      onmatch: function() {
          if (signin.token) {
              console.log("Login Success");
              return categories;
          }

          return m.route.set("/login");
      },
      render: function(vnode) {
          return m(layout, vnode);
      }
    },

    "/equipment/:id": {
      onmatch: function() {
          if (!signin.token) {
                return m.route.set("/login");
            }
        },
        render: function(vnode) {
            return m(layout, m(equip, vnode.attrs));
        }
    }
});
