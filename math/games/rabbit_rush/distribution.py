"""
Rabbit Rush crash multiplier distribution.

Each entry defines:
- multiplier: the crash point
- weight: relative frequency (higher = more common)
"""

CRASH_DISTRIBUTION = [
    {"multiplier": 1.05, "weight": 3000},
    {"multiplier": 1.10, "weight": 2600},
    {"multiplier": 1.20, "weight": 2100},
    {"multiplier": 1.30, "weight": 1700},
    {"multiplier": 1.50, "weight": 1200},
    {"multiplier": 1.80, "weight": 800},
    {"multiplier": 2.00, "weight": 600},
    {"multiplier": 2.50, "weight": 400},
    {"multiplier": 3.00, "weight": 300},
    {"multiplier": 5.00, "weight": 200},
    {"multiplier": 10.00, "weight": 100}
]


def total_weight():
    return sum(item["weight"] for item in CRASH_DISTRIBUTION)
