# Rabbit Rush — Event Schema

All game rounds emit events in chronological order.
These events fully define the outcome and support Bet Replay.

## Events

### round_start
```json
{
  "event": "round_start",
  "bet": 1.0,
  "auto_cashout": 2.0
}
#### cashout (optional)
{
  "event": "cashout",
  "multiplier": 2.0,
  "win": 2.0
}
##### crash
{
  "event": "crash",
  "multiplier": 3.12
}
Replay Rules
Replay uses events only

No recalculation or RNG during replay

UI state is derived from events
