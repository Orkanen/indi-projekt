"use strict";

import m from 'mithril';


let equipment = {
    url: "http://localhost:3000/equipments",
    currentEquipment: [],

    loadin: function() {
        return m.request({
            method: "GET",
            url: `${equipment.url}`
        }).then(function(result) {
            console.log(result);
            equipment.currentEquipment = result;
        });
    }

};

export { equipment };
