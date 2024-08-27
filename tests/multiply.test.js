import { assert } from 'chai';
import { wasm as wasm_tester } from 'circom_tester';

describe("Multiply circuit", function () {
    let circuit;

    before(async function () {
        this.timeout(10000);
        try {
            circuit = await wasm_tester("circuits/multiply-example/multiply.circom", { 
                recompile: true,
                compile: {
                    circom: 'circom',
                    args: [ '--version', '2.0.0' ]
                }
            });
        } catch (error) {
            console.error("Error in circuit compilation:", error);
            throw error;
        }
    });

    it("should multiply correctly", async function () {
        const input = { a: 2, b: 3 };
        const witness = await circuit.calculateWitness(input);
        await circuit.assertOut(witness, { c: 6 });
    });
});