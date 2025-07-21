# Quantum Phase Estimation Simulation

An interactive web-based simulation demonstrating the quantum phase estimation algorithm for efficient quantum sampling, showcasing the polynomial advantage over classical direct sampling methods.

## Overview

This simulation illustrates the quantum phase estimation algorithm as described in quantum computing literature, specifically focusing on measuring disorder-averaged expectation values of single-qubit Pauli operators. The algorithm demonstrates how quantum processors can prepare initial states as superpositions over all disorder configurations, enabling efficient phase estimation with polynomial advantage.

## Features

### 🎯 Core Simulation
- **Dual-mode visualization**: Compare direct sampling vs. quantum phase estimation
- **Interactive parameter control**: Adjust epsilon (ε) to see scaling relationships
- **Real-time circuit generation**: Watch quantum circuits adapt to your parameters
- **Step-by-step execution**: Learn each phase of the algorithm

### 📊 Educational Components
- **Bloch sphere visualization**: See quantum states evolve in real-time
- **Probability distributions**: Understand measurement outcomes
- **Complexity comparison**: Visualize N_sample ~ 1/ε² vs. polynomial scaling
- **Circuit depth analysis**: Explore depth ~ 1/ε relationships

### 🔬 Technical Features
- **Quantum Fourier Transform (QFT)**: Interactive QFT implementation
- **Ancilla qubit management**: Configurable number of ancillas (m = -log₂ ε)
- **Grover's diffusion operator**: Built-in implementation for phase estimation
- **Measurement simulation**: Realistic quantum measurement modeling

## Algorithm Details

### Sampling Phase
The classical approach requires:
- **Sample complexity**: N_sample ~ 1/ε²
- **Direct disorder sampling**: Each configuration sampled independently
- **Exponential overhead**: Scales poorly with precision requirements

### Phase Estimation Phase
The quantum approach offers:
- **Polynomial advantage**: Efficient phase estimation using ancillas
- **Superposition preparation**: All disorder configurations simultaneously
- **Controlled operations**: Precise phase accumulation
- **QFT readout**: Extract phase information efficiently

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No additional installations required

### Running the Simulation
1. Open the simulation in your web browser
2. Adjust the epsilon (ε) parameter using the slider
3. Click "Run Algorithm" to execute the full simulation
4. Use "Step Mode" for detailed algorithm walkthrough
5. Compare results between sampling and phase estimation methods

### Parameter Guidelines
- **ε = 0.1**: Good starting point for learning
- **ε = 0.01**: See clear polynomial advantage
- **ε = 0.001**: Observe scaling differences dramatically

## Educational Use Cases

### 🎓 Quantum Computing Courses
- Demonstrate quantum advantage in practical algorithms
- Illustrate superposition and interference principles
- Show real applications of QFT and phase estimation

### 🔬 Research Applications
- Prototype quantum algorithms for condensed matter physics
- Study disorder-averaged quantum systems
- Explore quantum sampling techniques

### 💡 Self-Learning
- Interactive exploration of quantum algorithms
- Visual understanding of quantum circuit design
- Hands-on experience with quantum complexity theory

## Technical Implementation

### Quantum Circuit Components
```
Ancillas: |0⟩⊗m ──[H]──[Controlled-U]──[QFT†]──[Measure]
Target:   |ψ⟩ ────────[U^(2^j)]─────────────────────────
```

### Key Relationships
- **Ancillas needed**: m = -log₂(ε)
- **Circuit depth**: O(1/ε)
- **Sample complexity**: O(poly(1/ε)) vs O(1/ε²)

### Supported Operations
- Hadamard gates for superposition creation
- Controlled unitary operations (C-U^(2^j))
- Quantum Fourier Transform and inverse
- Projective measurements in computational basis

## Customization Options

### Algorithm Parameters
- **Precision (ε)**: 0.001 to 0.5
- **Ancilla qubits**: 1 to 10 qubits
- **Operator type**: Pauli-X, Y, Z operators
- **Disorder strength**: Configurable disorder parameters

### Visualization Settings
- **Animation speed**: Adjustable for learning pace
- **Circuit style**: Compact or detailed view
- **Color scheme**: Multiple themes available
- **Export options**: PNG, SVG, data export

## Performance Notes

### Simulation Limitations
- Classical simulation of quantum circuits (exponential scaling)
- Limited to ~10-12 qubits for real-time performance
- Approximations used for large parameter regimes

### Optimization Tips
- Use fewer ancillas for faster simulation
- Enable "Fast Mode" for quick parameter exploration
- Consider "Theory Mode" for algorithm understanding without full simulation

## Scientific Background

This simulation is based on quantum algorithms for efficient sampling in disordered quantum systems. The phase estimation technique provides exponential speedup for certain classes of problems involving:

- Disorder-averaged expectation values
- Many-body localization studies
- Quantum thermalization research
- Anderson localization phenomena

## Contributing

We welcome contributions to improve the simulation:
- Bug reports and feature requests
- Educational content suggestions
- Algorithm optimizations
- Additional quantum operators

## References

1. Quantum Phase Estimation Algorithm - Nielsen & Chuang
2. Grover's Diffusion Operator Applications
3. Disorder-Averaged Quantum Systems
4. Polynomial Quantum Advantage in Sampling

## License

This educational simulation is provided under MIT License for academic and research use.

## Support

For questions, suggestions, or technical issues:
- Check the built-in help system (? button)
- Review the interactive tutorials
- Consult the algorithm documentation
- Submit issues via the feedback system

---

*Explore the quantum advantage in phase estimation and discover how quantum computers can revolutionize sampling in complex quantum systems!*
