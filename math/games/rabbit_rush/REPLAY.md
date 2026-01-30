# Rabbit Rush – Replay Verification Guide

This document describes how Stake Engine reviewers can verify the correctness,
determinism, and fairness of Rabbit Rush using the mandatory Replay feature.

---

## 1. Replay Overview

Rabbit Rush implements a fully event-driven replay system.

Each completed round emits a deterministic sequence of game events.
These events are sufficient to reconstruct the round outcome exactly,
without relying on server state or random generation.

Replay is mandatory and supported for all game rounds.

---

## 2. Replay Input

Replay is identified by a game-owned `event_id` (UUID).

- `event_id` is generated at the time of play
- The same `event_id` always resolves to the same event timeline
- Replay does not depend on RGS round identifiers

---

## 3. Event Timeline

Each Rabbit Rush round emits the following ordered events:

### 3.1 Bet Event
```json
{
  "event": "bet",
  "amount": <number>,
  "autoCashout": <number | null>
}
Represents the wager and optional auto-cashout setting.

#### 3.2 Crash Event
{
  "event": "crash",
  "multiplier": <number>
}
Represents the final crash multiplier for the round.
This value is deterministic and originates from the math distribution.

##### 3.3 Cashout Event (Optional)
{
  "event": "cashout",
  "multiplier": <number>,
  "win": <number>
}
Emitted only if the player cashes out before the crash.
If no cashout occurs, this event is absent and the bet is lost.

###### 4. Replay Reconstruction Logic
Replay reconstructs the round outcome exclusively from events:

Bet amount is read from the bet event

Crash multiplier is read from the crash event

If a cashout event exists:

Player wins the recorded amount

If no cashout event exists:

Player loses the bet

No random values or external state are used during replay.

####### 5. Determinism Guarantees
Replay is fully deterministic:

The same event_id always produces the same events

The same events always reconstruct the same result

Replay does not call the math engine

Replay does not generate randomness

This guarantees auditability and reproducibility.

######## 6. Statelessness
Rabbit Rush is stateless by design:

No state is carried between rounds

No progressive values

No jackpots or gamble features

Each round is fully independent

Replay confirms stateless behavior.

7. How to Verify Replay (Reviewer Steps)
Play a round of Rabbit Rush

Copy the generated event_id

Open the Replay interface

Paste the event_id

Click Replay

Verify:

Bet amount

Crash multiplier

Win or loss

Repeat replay multiple times — results must remain identical

8. Compliance Summary
✔ Replay supported for all rounds
✔ Deterministic event reconstruction
✔ No dependency on server state
✔ No frontend randomness
✔ Stateless crash resolution

Rabbit Rush fully complies with Stake Engine Replay requirements.