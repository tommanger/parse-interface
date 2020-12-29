"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInterface = void 0;
function parseInterface(interfaceToParse) {
    const splited = interfaceToParse.split("interface");
    let jsons = [];
    splited.forEach((row) => {
        const splitedRow = row.split("\n");
        const name = splitedRow[0].split("{")[0].trim();
        const obj = {}, unknown = [];
        let fieldIsObj = false, objKey = "";
        for (let field of splitedRow) {
            let [key, type] = field.split(":");
            if ((key && key.includes("}")) || (type && type.includes("}"))) {
                if (key.includes("}[]")) {
                    obj[objKey] = [obj[objKey]];
                }
                fieldIsObj = false;
                objKey = "";
                continue;
            }
            if (!key || !type) {
                continue;
            }
            key = key.trim();
            key = key.split("?")[0];
            type = type.trim();
            let value = null;
            switch (type) {
                case "number":
                case "number;":
                case "number | string":
                case "number | string;":
                    value = 0;
                    break;
                case "string":
                case "string;":
                case "string | number":
                case "string | number;":
                    value = "";
                    break;
                case "boolean":
                case "boolean;":
                    value = false;
                    break;
                case "{":
                    value = {};
                    objKey = key;
                    fieldIsObj = true;
                    break;
                case "Partial<CSSStyleDeclaration>":
                case "Partial<CSSStyleDeclaration>;":
                case "CSSStyleDeclaration":
                    value = {};
                    break;
                case "string[]":
                case "string[];":
                case "number[]":
                case "number[];":
                    value = [];
                    break;
            }
            if (value !== null) {
                if (fieldIsObj && type !== "{") {
                    obj[objKey][key] = value;
                }
                else {
                    obj[key] = value;
                }
            }
            else {
                const splitedType = type.split("|");
                if (splitedType.length > 1) {
                    try {
                        obj[key] = JSON.parse(splitedType[0].trim());
                    }
                    catch (e) {
                        obj[key] = splitedType[0].trim();
                    }
                }
                if (!obj[key]) {
                    unknown.push({ key, type });
                }
            }
        }
        if (Object.keys(obj).length !== 0 && obj.constructor === Object && name) {
            jsons.push({ obj, name, unknown });
        }
    });
    return jsons;
}
exports.parseInterface = parseInterface;
//# sourceMappingURL=parseInterface.js.map