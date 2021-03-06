"use strict";
import m from 'mithril';

import { layout } from './views/layout';
import { login } from './views/login';
import { register } from './views/register';
import { home } from './views/home';
//import { equip } from './views/equipment';
import { categories } from './views/categories';
import { equip } from './views/categoriesId';
import { admin } from './views/adminView';
import { adminUsers } from './views/adminUserView';
import { crtEquipment } from './views/crtEquipment';
import { editEquipment } from './views/editEquipment';
import { delEquipment } from './views/delEquipment';
import { editUser } from './views/editUser';
import { delUser } from './views/delUser';

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
            if (!signin.token) {
                  return m.route.set("/login");
              }
          },
          render: function() {
              return m(layout, m(home));
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
    },

    "/admin": {
      onmatch: function() {
          if (signin.token && signin.title == "admin") {
                return admin;
            }

            return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },

    "/admin/users": {
      onmatch: function() {
          if (signin.token && signin.title == "admin") {
                return adminUsers;
            }

            return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },

    "/admin/crteq": {
      onmatch: function() {
          if (signin.token && signin.title == "admin") {
                return crtEquipment;
            }

            return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },

    "/admin/editeq/:id": {
      onmatch: function() {
          if (signin.token && signin.title == "admin") {
                return editEquipment;
            }

            return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },

    "/admin/deleq/:id": {
      onmatch: function() {
          if (signin.token && signin.title == "admin") {
                return delEquipment;
            }

            return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },

    "/admin/editusr/:id": {
      onmatch: function() {
          if (signin.token && signin.title == "admin") {
                return editUser;
            }

            return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    },

    "/admin/delusr/:id": {
      onmatch: function() {
          if (signin.token && signin.title == "admin") {
                return delUser;
            }

            return m.route.set("/login");
        },
        render: function(vnode) {
            return m(layout, vnode);
        }
    }
});
