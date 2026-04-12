import pathlib
import unittest


INDEX_HTML = pathlib.Path(__file__).resolve().parents[1] / "site" / "index.html"


class HomePageThemeTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index_html = INDEX_HTML.read_text(encoding="utf-8")

    def test_root_palette_uses_light_blue_tokens(self):
        expected_tokens = {
            "--bg": "#eaf6ff",
            "--surface": "rgba(255, 255, 255, 0.72)",
            "--surface-hover": "rgba(186, 230, 253, 0.65)",
            "--border": "rgba(56, 189, 248, 0.18)",
            "--border-hover": "rgba(14, 165, 233, 0.42)",
            "--sky": "#38bdf8",
            "--cyan": "#0ea5e9",
            "--text": "#12324a",
            "--muted": "#5f7f98",
        }

        for token, value in expected_tokens.items():
            with self.subTest(token=token):
                self.assertIn(f"{token}: {value};", self.index_html)

    def test_page_uses_a_light_background_and_dark_foreground(self):
        self.assertIn(
            "background:\n                    radial-gradient(",
            self.index_html,
        )
        self.assertIn("color: var(--text);", self.index_html)
        self.assertNotIn("rgba(129, 140, 248", self.index_html)
        self.assertNotIn("--violet", self.index_html)
        self.assertNotIn("#090911", self.index_html)


if __name__ == "__main__":
    unittest.main()
