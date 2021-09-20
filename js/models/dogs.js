"use strict";

import m from 'mithril';

let dogs = {
    url: "http://localhost:3000/",
    email: "",
    password: "",
    token: "",

    currentDogs: [],

    getDogs: function() {
        return m.request({
            method: "GET",
            url: `${dogs.url}dogs/`
        }).then(function(result) {
            console.log(result);
            dogs.currentDogs = result.data;
        });
    },

    login: function() {
        m.request({
            url: `${dogs.url}login/`,
            method: "POST",
            body: {
                email: dogs.email,
                password: dogs.password
            }
        }).then(function(result) {
            dogs.email = "";
            dogs.password = "";

            console.log(result.accessToken);

            dogs.token = result.accessToken;

            return m.route.set("/home");
            //return console.log("login success!");
        });
    },
    register: function() {
        m.request({
            url: `${dogs.url}register/`,
            method: "POST",
            body: {
                email: dogs.email,
                password: dogs.password
            }
        }).then(function() {
            dogs.login();
        });
    },

    logout: function() {
        dogs.token = "";
    }

};

export { dogs };
