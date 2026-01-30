# Rabbit Rush – Crash Math Documentation

## Overview

Rabbit Rush is a crash-style game where a multiplier increases from 1.00x until
a randomly determined crash point is reached. Players may cash out manually or
via auto-cashout before the crash. If the crash occurs first, the bet is lost.

Each round is fully independent, stateless, and deterministic.

---

## Determinism & Statelessness

- Each round is resolved independently
- No state is carried between rounds
- No jackpots, progressives, or accumulators
- Outcomes depend only on the round’s random input
- Replay reconstructs the round exclusively from emitted events

This complies fully with Stake Engine stateless game requirements.

---

## Crash Multiplier Generation

Crash multipliers are generated using a predefined probability distribution
stored in `lookup.json`, which is derived from weighted ranges defined in
`distribution.py`.

Resolution flow:
1. A random value is generated server-side
2. The value is mapped through the lookup table
3. A crash multiplier is selected
4. The multiplier is final and immutable for that round

The frontend never generates randomness.

---

## Distribution Files

- `distribution.py` – defines weighted crash ranges
- `lookup.py` – builds a lookup table from weights
- `output/lookup.json` – finalized probability lookup
- `round.py` – resolves a single crash outcome using the lookup

---

## RTP (Return To Player)

The theoretical RTP is derived directly from the crash distribution.

### Formula

RTP = Σ (P(m) × (m - 1))


Where:
- `P(m)` = probability of crashing at multiplier `m`
- `(m - 1)` = player profit at that multiplier

### Result

The resulting RTP for Rabbit Rush is:

**RTP ≈ 99.0%**  
(House Edge ≈ 1.0%)

This value is enforced by the distribution and cannot be influenced by gameplay.

---

## Auto Cashout

Auto cashout does not affect RTP.

- Auto cashout is a client-side convenience
- The same crash multiplier applies regardless of cashout method
- Manual and auto cashout are mathematically equivalent

---

## Replay & Verification

Each round emits a deterministic event timeline:
- Bet
- Crash
- Optional cashout

Using the stored events, the round outcome can be replayed exactly.
Replay does not rely on random generation or server state.

This allows Stake Engine reviewers to:
- Verify outcomes
- Confirm determinism
- Audit fairness

---

## Compliance Summary

✔ Stateless rounds  
✔ Deterministic outcomes  
✔ No hidden state  
✔ Transparent RTP  
✔ Replay-safe event model  

Rabbit Rush math complies with all Stake Engine approval guidelines.