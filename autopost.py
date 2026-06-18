import requests
import json

PAGE_ID = "1161732813693865"
ACCESS_TOKEN = "EAAOI6pVeXikBRlqYTQ4HlCeu1rIXNiKdoScEBmXo4hZBjKffDIVT349rZAyJZBz3i7FFgNtU7HkNZAAhRgEeaIBcZAZBfcf6nEu8PoryrHZCk8LHCSdpxO8vAGqzGANkrwAzye55TgnYRvZC5JTYFOt4F5rXj3zz4xubyuLtGokEDtSZAUoS87nnuZCb4w6WGcOESJOHRhIZC9nSRnwBuZBZCt0Lsz6oYhjgZC2sqZCNdVSO749n7i0fJM2D9yJQh8mLQxiBK6yLNAZCv0wd3lMZD"

with open("posts.txt", "r", encoding="utf-8") as f:
    posts = [p.strip() for p in f.read().split("===") if p.strip()]

with open("state.json", "r") as f:
    state = json.load(f)

index = state["index"]

if index < len(posts):
    message = posts[index]

    response = requests.post(
        f"https://graph.facebook.com/v23.0/{PAGE_ID}/feed",
        data={
            "message": message,
            "access_token": ACCESS_TOKEN
        }
    )

    print(response.text)

    state["index"] = index + 1

    with open("state.json", "w") as f:
        json.dump(state, f)
else:
    print("All posts completed")
