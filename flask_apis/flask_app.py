import os
from flask_cors import CORS
from flask import Flask, request, jsonify
import openai
from moralis import evm_api

app = Flask(__name__)
CORS(app, supports_credentials=True)

openai.api_key = os.getenv("OPENAI_API_KEY")

moralis_api_key = os.getenv("MORALIS_API_KEY")

base_prime = os.getenv("BASE_PRIME")

flask_port = int(os.getenv("FLASK_PORT"))


@app.route("/fetch_gpt_res", methods=["post"])
def fetch_gpt_res():
    json_object = request.json
    chatHistory = json_object["chatHistory"]
    tokenName = json_object["tokenName"]
    tokenDescription = json_object["tokenDescription"]
    tokenImage = json_object["tokenImage"]
    background_prime = (
        base_prime.replace("{tokenName}", tokenName)
        .replace("{tokenDescription}", tokenDescription)
        .replace("{tokenImage}", tokenImage)
    )
    messages = [{"role": "system", "content": background_prime}]
    for message in chatHistory.split("\n"):
        if not message:
            continue
        speaker, content = message.split(": ", 1)
        role = "user" if speaker == "owner" else "assistant"
        messages.append({"role": role, "content": content})
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    response = completion.choices[0]["message"]["content"]
    return jsonify({"reply": response})


@app.route("/fetch_wallet_nfts", methods=["post"])
def fetch_wallet_nfts():
    json_object = request.json
    address = json_object["address"]
    params = {
        "address": address,
        "chain": "fantom",
        "format": "decimal",
        "limit": 100,
        "token_addresses": [],
        "cursor": "",
        "normalizeMetadata": True,
    }
    result = evm_api.nft.get_wallet_nfts(
        api_key=moralis_api_key,
        params=params,
    )
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=flask_port)
