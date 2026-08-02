import re
import logging

class LogScrubberFilter(logging.Filter):
    def filter(self, record):
        if not isinstance(record.msg, str):
            return True
            
        msg = record.msg
        sensitive_patterns = [
            (r'(?i)"annual_income"\s*:\s*[^,}]+', '"annual_income": "[REDACTED]"'),
            (r'(?i)"age"\s*:\s*[^,}]+', '"age": "[REDACTED]"'),
            (r'(?i)"state"\s*:\s*[^,}]+', '"state": "[REDACTED]"'),
            (r'(?i)"employment_category"\s*:\s*[^,}]+', '"employment_category": "[REDACTED]"'),
            (r'(?i)"equity_ltsg"\s*:\s*[^,}]+', '"equity_ltsg": "[REDACTED]"'),
            (r'(?i)"password"\s*:\s*[^,}]+', '"password": "[REDACTED]"'),
            (r'(?i)annual_income=\S+', 'annual_income=[REDACTED]'),
            (r'(?i)age=\S+', 'age=[REDACTED]')
        ]
        for pattern, replacement in sensitive_patterns:
            msg = re.sub(pattern, replacement, msg)
        record.msg = msg
        return True

def setup_scrubbed_logging():
    logging.basicConfig(level=logging.INFO)
    scrubber = LogScrubberFilter()
    for logger_name in ["uvicorn", "uvicorn.access", "uvicorn.error"]:
        logger = logging.getLogger(logger_name)
        # Prevent adding duplicate filters
        if not any(isinstance(f, LogScrubberFilter) for f in logger.filters):
            logger.addFilter(scrubber)
