import json
import os

def generate_mock_db():
    # Generate 60 days of mock history for the active user
    history_grid = [{"day": i, "completed": True if i < 12 else False} for i in range(1, 61)]
    
    db_content = {
        "userStates": {
            "active": { "name": "Alex", "streak": 12, "progress": 20, "standing": "Silver Tier", "history": history_grid },
            "firstDay": { "name": "Newbie", "streak": 0, "progress": 0, "standing": "Unranked", "history": [{"day": i, "completed": False} for i in range(1, 61)] },
            "missedDay": { "name": "Hustler", "streak": 0, "progress": 25, "standing": "Needs Recovery", "streakFreezeAvailable": True, "history": [{"day": i, "completed": True if i < 15 and i != 14 else False} for i in range(1, 61)] },
            "empty": None
        },
        "challenges": {
            "12": {
                "title": "Build an API Rate Limiter",
                "description": "Build a reusable API rate limiter that prevents clients from overwhelming a backend service. Implement a defined request limit within a time window, track usage per client, and return an appropriate response.",
                "requirements": [
                    "Implement a rate-limiting mechanism tracking requests per IP.",
                    "Return a 429 Too Many Requests HTTP response when limits are hit.",
                    "Document configuration options and edge cases in the README."
                ]
            }
        }
    }

    script_dir = os.path.dirname(os.path.abspath(__file__))
    api_dir = os.path.join(os.path.dirname(script_dir), 'api')
    os.makedirs(api_dir, exist_ok=True)
    
    with open(os.path.join(api_dir, 'db.json'), 'w', encoding='utf-8') as f:
        json.dump(db_content, f, indent=2)
    print("✨ Premium Mock DB generated!")

if __name__ == "__main__":
    generate_mock_db()