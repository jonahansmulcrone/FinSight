from dotenv import load_dotenv
import os

load_dotenv()

FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

if not FINNHUB_API_KEY:
    raise ValueError("Finnhub API not found in environment variables.") 