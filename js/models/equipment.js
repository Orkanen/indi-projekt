"use strict";

import m from 'mithril';

import { signin } from "./signin.js";

let equipment = {
    url: "http://localhost:3000/equipments",
    url2: "http://localhost:3000/users",
    currentEquipment: [],
    currentCategory: "",
    currentCategories: [],
    currentUsers: [],
    machine: "Title",
    condition: "New",
    status_id: 200,
    usr: "",
    category: "Category",
    description: "Description",
    image: "Archive",
    cat: "",

    loadin: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url}`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = [];
            equipment.currentEquipment = result;
        });
    },

    loadinwCategory: function(id) {
        equipment.cat = id;
        return m.request({
            method: "GET",
            url: `${equipment.url}?category_like=${id}`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = [];
            result.forEach(all => {
                if(all.status_id == "200") {
                    console.log(all.status_id);
                    equipment.currentEquipment.push(all);
                } else {
                    console.log(all.machine);
                }
            })
        });
    },

    loadinwId: function(id) {
        //equipment.currentCategory = id;
        return m.request({
            method: "GET",
            url: `${equipment.url}/${id}`
        }).then(function(result) {
            console.log(result.machine);
            equipment.currentEquipment = result;
        });
    },

    loadinAvailable: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url}?status_id_like=200`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = [];
            equipment.currentEquipment = result;
        });
    },

    loadinBorrowed: function() {
        console.log(signin.user.id);
        return m.request({
            method: "GET",
            url: `${equipment.url}?usr_like=${signin.user.id}`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = [];
            equipment.currentEquipment = result;
        });
    },

    loadinUserRent: function() {
        console.log("called!");
        equipment.currentEquipment=[];
        return m.request({
            method: "GET",
            url: `${equipment.url}`
        }).then(function(result) {
            equipment.currentEquipment = [];
            result.forEach(element => {
                //console.log(element.userId)
                if (element.usr !== "") {
                    return m.request({
                        method: "GET",
                        url: `${equipment.url2}/${element.usr}`
                    }).then(function(result2) {
                        element["userEmail"] = result2.email
                        //console.log(element);
                        equipment.currentEquipment.push(element);
                    })
                }
                equipment.currentEquipment.push(element);
            });
        });
    },

    rent: function(id) {
        return m.request({
            method: "PATCH",
            url: `${equipment.url}/${id}`,
            body: {
                status_id: "400",
                usr: signin.user.id
            }
        }).then(function(result) {
            console.log(result);
            equipment.loadinBorrowed
        }).then(function(){
            equipment.loadinBorrowed();
        });
    },

    return: function(id) {
        return m.request({
            method: "PATCH",
            url: `${equipment.url}/${id}`,
            body: {
                status_id: "200",
                usr: ""
            }
        }).then(function(result) {
            console.log(result);
            equipment.loadinBorrowed
        }).then(function(){
            equipment.loadCategories();
        });
    },

    loadCategories: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url}`
        }).then(function(result) {
            console.log(result);
            equipment.currentCategories = [];
            result.forEach(all => {
                if (!equipment.currentCategories.includes(all.category)) {
                    if(all.status_id == "200") {
                        console.log(all.status_id);
                        equipment.currentCategories.push(all.category);
                    } else {
                        console.log(all.machine);
                    }
                }
            })
        });
    },

    loadinUsers: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url2}`
        }).then(function(result) {
            equipment.currentUsers = [];
            equipment.currentUsers = result;
        })
    },

    addEquipment: function() {
        m.request({
            url: `${equipment.url}`,
            method: "POST",
            body: {
                machine: equipment.machine.toLowerCase(),
                condition: equipment.condition.toLowerCase(),
                status_id: 200,
                usr: "",
                category: equipment.category.toLowerCase(),
                description: equipment.description,
                image: equipment.image
            }
        }).then(function() {
            //equipment.loadinUserRent();
            equipment.machine = "Title",
            equipment.condition = "New",
            equipment.status_id = 200,
            equipment.usr = "",
            equipment.category = "Category",
            equipment.description = "Description",
            equipment.image = ""
        });
    },

    editEquipment: function(id) {
        m.request({
            url: `${equipment.url}/${id}`,
            method: "PATCH",
            body: {
                machine: equipment.machine.toLowerCase(),
                condition: equipment.condition.toLowerCase(),
                status_id: 200,
                usr: "",
                category: equipment.category.toLowerCase(),
                description: equipment.description,
                image: equipment.image
            }
        })
    },

    delEquipment: function(id) {
        m.request({
            method: "DELETE",
            url: `${equipment.url}/${id}`
        }).then(function(result) {
            console.log(result);
        });
    }
};

export { equipment };
