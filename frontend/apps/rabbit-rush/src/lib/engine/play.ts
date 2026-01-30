import { getEngine, DEV } from './client';
import type { RabbitRushPlayInput } from './types';
import { runRabbitRush } from '../math/run';
import { saveReplay } from '../replay/store';
import type { RabbitRushEvent } from '../replay/events';

/**
 * Play one round of Rabbit Rush
 * - DEV: skips RGS call
 * - PROD: registers bet with Stake Engine
 * - ALWAYS deterministic & replay-safe
 */
export async function playRabbitRush(input: RabbitRushPlayInput) {
  const engine = getEngine();

  // 🔒 PROD ONLY: register bet with Stake Engine
  if (!DEV && engine) {
    await engine.Play({
      amount: input.amount,
      mode: 'real'
    });
  }

  // 🎯 Deterministic Rabbit Rush math
  const outcome = runRabbitRush({
    amount: input.amount,
    autoCashout: input.auto_cashout
  });

  // 🆔 Game-owned replay ID (approval requirement)
  const event_id = crypto.randomUUID();

  // 📜 Replay-safe event timeline
  const events: RabbitRushEvent[] = outcome.events;

  // 💾 Persist replay (DEV: in-memory, PROD: DB/RGS later)
  saveReplay(event_id, events);

  return {
    event_id,
    crash_multiplier: outcome.crashMultiplier,
    win: outcome.win,
    events
  };
}
