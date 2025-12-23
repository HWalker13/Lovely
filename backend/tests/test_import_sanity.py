import pathlib

def test_no_backend_imports():
    for path in pathlib.Path("app").rglob("*.py"):
        content = path.read_text()
        assert "backend." not in content
