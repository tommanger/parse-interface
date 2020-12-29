import chai = require('chai');
import sinonChai = require("sinon-chai");
import {parseInterface} from "../lib/parseInterface";

let should = chai.should()
chai.use(sinonChai);

describe('Parse interface', () => {

    it("Should parse", () => {

        const interfaceToParse: string = `
            export default interface ITest {
                name: string;
                date: number;
                age: number | string;
                color: "red" | "blue",
                details: {
                    address: string | number;
                },
                dates: number[];
                children: {
                    name: string;
                }[];
            }`
        const parsed: any = parseInterface(interfaceToParse);
        parsed.should.be.instanceof(Array);
        parsed[0].obj.should.be.instanceof(Object);
    });

    it("Should parse and get string in obj", () => {

        const interfaceToParse = `
        export default interface ITest {
            name: string;
            address: string | number;
            details: {
                address: string;
            }
        }`

        const parsed = parseInterface(interfaceToParse);
        parsed[0].obj.name.should.be.eq("");
        parsed[0].obj.address.should.be.eq("");
        parsed[0].obj.details.address.should.be.eq("");
    });

    it("Should parse and get number in obj", () => {

        const interfaceToParse = `
        export default interface ITest {
            date: number;
            age: number | string;
            details: {
                age: number;
            }
        }`

        const parsed = parseInterface(interfaceToParse);
        parsed[0].obj.date.should.be.eq(0);
        parsed[0].obj.age.should.be.eq(0);
        parsed[0].obj.details.age.should.be.eq(0);
    });

    it("Should parse and get array in obj", () => {

        const interfaceToParse = `
        export default interface ITest {
            names: string[];
            dates: number[];
            children: {
                name: string;
            }[];
        }`

        const parsed = parseInterface(interfaceToParse);

        parsed[0].obj.names.should.be.instanceof(Array);
        parsed[0].obj.dates.should.be.instanceof(Array);
        parsed[0].obj.children.should.be.instanceof(Array);
        parsed[0].obj.children[0].name.should.be.eq("");

    });

});
