from .distribution import CRASH_DISTRIBUTION


def resolve_round(bet, index, auto_cashout=None):
    """
    Resolve a single Rabbit Rush round deterministically.

    :param bet: float
    :param index: int (selected by RGS)
    :param auto_cashout: float or None
    :return: list of replayable events
    """

    events = []

    # Round start
    events.append({
        "event": "round_start",
        "bet": bet,
        "auto_cashout": auto_cashout
    })

    crash_multiplier = CRASH_DISTRIBUTION[index]["multiplier"]

    # Auto cashout (manual cashout is handled by RGS timing)
    if auto_cashout is not None and auto_cashout <= crash_multiplier:
        win = round(bet * auto_cashout, 2)
        events.append({
            "event": "cashout",
            "multiplier": auto_cashout,
            "win": win
        })

    # Crash always ends the round
    events.append({
        "event": "crash",
        "multiplier": crash_multiplier
    })

    return events
