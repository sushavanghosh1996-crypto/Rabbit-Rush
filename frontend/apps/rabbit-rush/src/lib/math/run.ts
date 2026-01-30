import type { RabbitRushEvent } from '../replay/events';

/**
 * DEV math adapter
 * Mirrors output of python round.py
 * DO NOT add RNG here
 */
export function runRabbitRush({
  amount,
  autoCashout
}: {
  amount: number;
  autoCashout?: number;
}): {
  crashMultiplier: number;
  win: number;
  events: RabbitRushEvent[];
} {
  /**
   * 🚨 IMPORTANT
   * This value MUST come from math-sdk in PROD
   * For DEV, we simulate the resolved result
   */
  const crashMultiplier = 2.37; // placeholder for round.py output

  const win =
    autoCashout !== undefined && autoCashout <= crashMultiplier
      ? amount * autoCashout
      : 0;

  const events: RabbitRushEvent[] = [
    {
      event: 'bet',
      amount,
      autoCashout
    },
    {
      event: 'crash',
      multiplier: crashMultiplier
    }
  ];

  if (win > 0 && autoCashout !== undefined) {
    events.push({
      event: 'cashout',
      multiplier: autoCashout,
      win
    });
  }

  return {
    crashMultiplier,
    win,
    events
  };
}
