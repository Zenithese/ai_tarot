from qiskit import QuantumCircuit, Aer, execute
from qiskit.visualization import plot_histogram
import numpy as np

def quantum_rng(num):
    # Determine the number of qubits required based on the given maximum value
    num_qubits = int(np.ceil(np.log2(num)))

    # Create a quantum circuit with the required number of qubits
    circuit = QuantumCircuit(num_qubits, num_qubits)

    # Apply Hadamard gates to initialize qubits in superposition
    circuit.h(range(num_qubits))

    # Measure all qubits
    circuit.measure(range(num_qubits), range(num_qubits))

    # Choose a quantum simulator backend
    backend = Aer.get_backend('qasm_simulator')

    # Execute the circuit on the chosen backend
    job = execute(circuit, backend, shots=1)

    # Get the measurement results
    result = job.result()
    counts = result.get_counts()

    # Extract the binary outcome from the measurement result
    measurement = list(counts.keys())[0]
    decimal_value = int(measurement, 2)

    # Map the decimal value to the range [1, num]
    random_number = (decimal_value % num) + 1

    return random_number

def shuffle():
    tarotDeck = list(range(78))
    shuffledDeck = list()

    while len(tarotDeck) > 1:
        random_num = quantum_rng(len(tarotDeck))
        card = tarotDeck[random_num - 1]
        tarotDeck.pop(random_num - 1)
        shuffledDeck.append(card)

    shuffledDeck.append(tarotDeck[0])

    return shuffledDeck


print("Shuffled deck:", shuffle())
