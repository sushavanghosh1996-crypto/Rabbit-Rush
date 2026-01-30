<script lang="ts">
  import { onDestroy } from 'svelte';

  // ---- UI State ----
  let state: 'idle' | 'playing' | 'cashed_out' | 'crashed' = 'idle';

  let betAmount = 1;
  let autoCashout: number | null = null;

  let displayMultiplier = 1.0;
  let crashMultiplier = 2.37; // DEV mock (replace with engine value)
  let win = false;

  // ---- Timer (cross-env safe) ----
  let timer: ReturnType<typeof setInterval> | null = null;

  // ---- Game Controls ----
  function startGame() {
    stopMultiplier();

    state = 'playing';
    displayMultiplier = 1.0;
    win = false;

    timer = setInterval(() => {
      displayMultiplier = +(displayMultiplier + 0.01).toFixed(2);

      // Auto cashout
      if (autoCashout !== null && displayMultiplier >= autoCashout) {
        cashout();
        return;
      }

      // Crash reached
      if (displayMultiplier >= crashMultiplier) {
        displayMultiplier = crashMultiplier;
        stopMultiplier();
        state = 'crashed';
      }
    }, 50);
  }

  function cashout() {
    if (state !== 'playing') return;

    win = true;
    stopMultiplier();
    state = 'cashed_out';
  }

  function stopMultiplier() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  onDestroy(() => {
    stopMultiplier();
  });
</script>
