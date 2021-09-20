"use strict";
import m from 'mithril';

import { layout } from './views/layout';
import { login } from './views/login';
import { register } from './views/register';
import { home } from './views/home';

import { dogs } from "./models/dogs.js";

m.route(document.body, "/", {
    "/": {
      onmatch: function() {
          if (dogs.token) {
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
              if (dogs.token) {
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
          if (dogs.token) {
              dogs.logout();
          }
          return m.route.set("/");
        }
    },
    "/login": {
        render: function() {
            return m(layout, m(login));
        }
    }

});
