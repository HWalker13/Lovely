import sys
from pathlib import Path

# Add backend/ to PYTHONPATH
root = Path(__file__).resolve().parent.parent
sys.path.append(str(root))
