import json
from pathlib import Path
from .lookup import build_lookup_table

OUTPUT_DIR = Path(__file__).parent / "output"

def export_lookup_table():
    OUTPUT_DIR.mkdir(exist_ok=True)

    table = build_lookup_table()

    output_path = OUTPUT_DIR / "lookup.json"
    with open(output_path, "w") as f:
        json.dump(table, f, indent=2)

    return output_path


if __name__ == "__main__":
    path = export_lookup_table()
    print(f"Rabbit Rush lookup table exported to {path}")
