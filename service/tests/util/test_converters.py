import unittest
from app.util.converters import parse_float

class TestParseFloat(unittest.TestCase):

    def test_valid_float(self):
        self.assertEqual(parse_float("3.14"), 3.14)
        self.assertEqual(parse_float("-2.5"), -2.5)
        self.assertEqual(parse_float("0"), 0.0)

    def test_valid_integer(self):
        self.assertEqual(parse_float("42"), 42.0)

    def test_valid_fraction(self):
        self.assertAlmostEqual(parse_float("1/2"), 0.5)
        self.assertAlmostEqual(parse_float("3/4"), 0.75)
        self.assertAlmostEqual(parse_float("-2/5"), -0.4)

    def test_invalid_fraction(self):
        with self.assertRaises(ValueError) as context:
            parse_float("a/b")
        self.assertTrue("Invalid fraction: a/b" in str(context.exception))

    def test_invalid_input(self):
        with self.assertRaises(ValueError) as context:
            parse_float("abc")
        self.assertTrue("Invalid value: abc" in str(context.exception))

