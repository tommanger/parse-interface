"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInterface = void 0;
function parseInterface(interfaceToParse) {
    var splited = interfaceToParse.split("interface");
    var jsons = [];
    splited.forEach(function (row) {
        var splitedRow = row.split("\n");
        var name = splitedRow[0].split("{")[0].trim();
        var obj = {}, unknown = [];
        var fieldIsObj = false, objKey = "";
        for (var _i = 0, splitedRow_1 = splitedRow; _i < splitedRow_1.length; _i++) {
            var field = splitedRow_1[_i];
            var _a = field.split(":"), key = _a[0], type = _a[1];
            if ((key && key.includes("}")) || (type && type.includes("}"))) {
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
            var value = null;
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
                var splitedType = type.split("|");
                if (splitedType.length > 1) {
                    try {
                        obj[key] = JSON.parse(splitedType[0].trim());
                    }
                    catch (e) {
                        obj[key] = splitedType[0].trim();
                    }
                }
                if (!obj[key]) {
                    unknown.push({ key: key, type: type });
                }
            }
        }
        if (Object.keys(obj).length !== 0 && obj.constructor === Object && name) {
            jsons.push({ obj: obj, name: name, unknown: unknown });
        }
    });
    return jsons;
}
exports.parseInterface = parseInterface;
