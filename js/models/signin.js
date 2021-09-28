"use strict";

import m from 'mithril';

let signin = {
    url: "http://localhost:3000/",
    email: "",
    password: "",
    token: "",

    currentsignin: [],

    login: function() {
        m.request({
            url: `${signin.url}login/`,
            method: "POST",
            body: {
                email: signin.email,
                password: signin.password
            }
        }).then(function(result) {
            signin.email = "";
            signin.password = "";

            console.log(result.accessToken);

            signin.token = result.accessToken;

            return m.route.set("/home");
            //return console.log("login success!");
        });
    },
    register: function() {
        m.request({
            url: `${signin.url}register/`,
            method: "POST",
            body: {
                email: signin.email,
                password: signin.password
            }
        }).then(function() {
            signin.login();
        });
    },

    logout: function() {
        signin.token = "";
    }

};

export { signin };
