def parse_float(value):
    try:
        # Try to convert the value to a float directly
        return float(value)
    except (ValueError, TypeError):
        # If there's a '/' in the value, try to handle it as a fraction
        if isinstance(value, str) and "/" in value:
            try:
                numerator, denominator = map(float, value.split("/"))
                return numerator / denominator
            except (ValueError, TypeError):
                raise ValueError(f"Invalid fraction: {value}")

        # If neither conversion works, raise an error
        raise ValueError(f"Invalid value: {value}")
