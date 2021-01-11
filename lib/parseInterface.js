"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function pi(interfaceToParse) {
    return parseInterface(interfaceToParse);
}
exports.pi = pi;
function parseInterface(interfaceToParse) {
    const splited = interfaceToParse.split("interface");
    const jsons = [];
    const jsonsByInterfaceName = {};
    for (const row of splited) {
        const splitedRow = row.split("\n");
        const name = splitedRow[0].split("{")[0].trim();
        const obj = {}, unknown = [];
        let fieldIsObj = false;
        const objKeys = [];
        for (const field of splitedRow) {
            let [key, type] = field.split(":");
            if ((key && key.includes("}")) || (type && type.includes("}"))) {
                if (key.includes("}[]")) {
                    const path = objKeys.join(".");
                    lodash_1.set(obj, path, [lodash_1.get(obj, path)]);
                }
                fieldIsObj = false;
                objKeys.pop();
                continue;
            }
            if (!key || !type) {
                continue;
            }
            key = key.trim();
            key = key.split("?")[0];
            type = type.split(";")[0].trim();
            const splitByArray = type.split("[");
            const isArray = splitByArray.length > 1;
            if (isArray) {
                type = splitByArray[0];
            }
            let value = null;
            switch (type) {
                case "number":
                case "number | string":
                    value = 0;
                    break;
                case "string":
                case "string | number":
                    value = "";
                    break;
                case "boolean":
                    value = false;
                    break;
                case "{":
                    value = {};
                    objKeys.push(key);
                    fieldIsObj = true;
                    break;
                case "Partial<CSSStyleDeclaration>":
                case "Partial<CSSStyleDeclaration>;":
                case "CSSStyleDeclaration":
                    value = {};
                    break;
                case "string[]":
                case "number[]":
                    value = [];
                    break;
            }
            if (value === null) {
                if (jsonsByInterfaceName[type]) {
                    value = jsonsByInterfaceName[type];
                }
            }
            if (value !== null) {
                isArray && (value = [value]);
                if (fieldIsObj && type !== "{") {
                    const path = objKeys.join(".") + `.${key}`;
                    lodash_1.set(obj, path, value);
                }
                else if (objKeys.length > 0 && typeof value !== "object") {
                    const path = objKeys.join(".") + `.${key}`;
                    lodash_1.set(obj, path, value);
                }
                else if (objKeys.length > 0) {
                    const path = objKeys.join(".");
                    lodash_1.set(obj, path, value);
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
            jsonsByInterfaceName[name] = obj;
        }
    }
    return jsons;
}
exports.parseInterface = parseInterface;
//# sourceMappingURL=parseInterface.js.map