"use strict";

import m from 'mithril';

import { signin } from "./signin.js";

let equipment = {
    url: "http://localhost:3000/equipments",
    currentEquipment: [],
    currentCategories: [],

    loadin: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url}`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = result;
        });
    },

    loadinwCategory: function(id) {
        return m.request({
            method: "GET",
            url: `${equipment.url}?category_like=${id}`
        }).then(function(result) {
            console.log(result);
            //equipment.currentEquipment = result;
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

    loadinAvailable: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url}?status_id_like=200`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = result;
        });
    },

    loadinBorrowed: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url}?userId_like=${signin.user.id}`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = result;
        });
    },

    rent: function(id) {
        return m.request({
            method: "PATCH",
            url: `${equipment.url}/${id}`,
            body: {
                status_id: "400",
                userId: signin.user.id
            }
        }).then(function(result) {
            console.log(result);
            equipment.loadinBorrowed
        });
    },

    return: function(id) {
        return m.request({
            method: "PATCH",
            url: `${equipment.url}/${id}`,
            body: {
                status_id: "200",
                userId: ""
            }
        }).then(function(result) {
            console.log(result);
            equipment.loadinBorrowed
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
    }
};

export { equipment };
