from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/rules')
def rules():
    return render_template('rules.html')

@app.route('/cards')
def cards():
    card_numbers = [f"{i:03}" for i in range(1, 121)]
    return render_template('cards.html', cards = card_numbers)

@app.route('/robots.txt')
def robots():
    rules = "User-agent: *\nDisallow: /\n"
    return Response(rules, mimetype = "text/plain")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1968, debug=True)
