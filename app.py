from flask import Flask, render_template, send_from_directory, request, jsonify

app = Flask(__name__, static_folder="static", template_folder="templates")

ultima_localizacao = {"latitude": None, "longitude": None}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/captura")
def captura():
    return render_template("captura.html")

@app.route("/rastrear", methods=["POST"])
def rastrear():
    global ultima_localizacao
    data = request.get_json()
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    if not latitude or not longitude:
        return jsonify({"erro": "Coordenadas inválidas"}), 400

    ultima_localizacao = {"latitude": latitude, "longitude": longitude}

    return jsonify({"mensagem": "Localização recebida!", "latitude": latitude, "longitude": longitude})

@app.route("/localizacao", methods=["GET"])
def obter_localizacao():
    return jsonify(ultima_localizacao)

if __name__ == "__main__":
    app.run(debug=True)
