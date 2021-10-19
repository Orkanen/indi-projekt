"use strict";

import m from 'mithril';

import { equipment } from "../models/equipment.js";

let categories = {
    oninit: equipment.loadCategories,

    view: function() {
        return [ m("div.contentHolder", [
                m("h1", "Category-page"),
                m("h3", "Choose Category.")
            ]),
            m("div.hBox", equipment.currentCategories.map(function (all) {
                return m("a.bBox", {href: `#!/equipment/${all}`}, [
                    m("h3.bTitle", all+"s")
                ]);
            }))
        ];
    }
}
export { categories };
