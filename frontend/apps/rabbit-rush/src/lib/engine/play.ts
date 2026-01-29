import { getEngine } from './client';
import type { RabbitRushPlayInput } from './types';
import { runRabbitRush } from '../math/run';

export async function playRabbitRush(input: RabbitRushPlayInput) {
  const engine = getEngine();

  // 1️⃣ Register bet with Stake Engine (no need to read round fields)
  await engine.Play({
    amount: input.amount,
    mode: 'real'
  });

  // 2️⃣ Run deterministic Rabbit Rush math
  const outcome = runRabbitRush({
    amount: input.amount,
    autoCashout: input.auto_cashout
  });

  // 3️⃣ Generate our own replay-safe event_id
  const event_id = crypto.randomUUID();

  return {
    event_id,
    crash_multiplier: outcome.crashMultiplier,
    win: outcome.win,
    events: outcome.events
  };
}
