from .distribution import CRASH_DISTRIBUTION

def build_lookup_table():
    """
    Build indexed lookup table for Rabbit Rush.
    Index selection is handled by the RGS.
    """
    table = []

    for index, item in enumerate(CRASH_DISTRIBUTION):
        table.append({
            "index": index,
            "crash_multiplier": item["multiplier"],
            "weight": item["weight"]
        })

    return table
