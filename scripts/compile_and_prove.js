import { execSync } from "child_process";

function runCommand(command) {
    console.log(`Execute: ${command}`);
    execSync(command, { stdio: 'inherit' });
}

// Compile Circuit
runCommand("circom circuits/multiply-example/multiply.circom --r1cs --wasm --sym");

console.log("Done: Compile Circuit!")

// Generate Proof
runCommand("snarkjs powersoftau new bn128 12 pot12_0000.ptau -v");
runCommand("snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name='First contribution' -v");
runCommand("snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v");
runCommand("snarkjs groth16 setup multiply.r1cs pot12_final.ptau multiply_0000.zkey");
runCommand("snarkjs zkey contribute multiply_0000.zkey multiply_0001.zkey --name='1st Contributor Name' -v");
runCommand("snarkjs zkey export verificationkey multiply_0001.zkey verification_key.json");

console.log("Done: Generate Proof!");
