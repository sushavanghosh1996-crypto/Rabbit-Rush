# Rabbit Rush — Math Model

Each round produces exactly one crash multiplier.

## Core Logic
- Multiplier starts at 1.00x
- Increases continuously (visual only)
- Round ends at crash multiplier

## Win Conditions
- Cashout multiplier ≤ crash multiplier → win
- No cashout before crash → loss

## Determinism
- Crash multipliers are generated from predefined distributions
- No runtime randomness
