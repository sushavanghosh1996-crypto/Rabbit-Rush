import { RGSClient } from '../index.js';

const rgs = RGSClient({
  url: process.env.RGS_URL ?? 'http://localhost:4000',
  protocol: 'http'
});

/**
 * Place a Rabbit Rush bet
 * Game + auto_cashout are handled by RGS configuration
 */
export async function placeRabbitRushBet(amount: number) {
  return rgs.Play({
    amount,
    mode: 'base'
  });
}


