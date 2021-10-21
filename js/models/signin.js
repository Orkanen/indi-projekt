"use strict";

import m from 'mithril';

let signin = {
    url: "http://localhost:3000/",
    email: "",
    password: "",
    token: "",
    user: "",
    title: "",
    temptitle: "user",
    currentUser: [],
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

            signin.user = result.user;
            signin.token = result.accessToken;
            signin.title = result.user.title;

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
                password: signin.password,
                title: signin.temptitle
            }
        }).then(function() {
            signin.login();
        });
    },

    logout: function() {
        signin.token = "";
        signin.user = "";
    },

    getUser: function(id) {
        m.request({
            url: `${signin.url}users/${id}`,
            method: "GET"
        }).then(function(result){
            console.log(result);
            signin.currentUser = result;
        });
    },

    editUser: function(id) {
        m.request({
            url: `${signin.url}users/${id}`,
            method: "PATCH",
            body: {
                title: signin.temptitle.toLowerCase(),
                email: signin.email.toLowerCase()
            }
        }).then(function(result){
            console.log(result)
        })
    },

    deleteUser: function(id) {
        m.request({
            url: `${signin.url}users/${id}`,
            method: "DELETE"
        }).then(function(result){
            console.log(result)
        })
    }

};

export { signin };
