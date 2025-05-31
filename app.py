
from flask import Flask, render_template, request, jsonify
from yt_dlp import YoutubeDL

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/playlist', methods=['POST'])
def playlist():
    data = request.get_json()
    artists = data.get('artists', [])
    results = []

    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'extract_flat': True,
        'format': 'bestaudio/best'
    }

    with YoutubeDL(ydl_opts) as ydl:
        for artist in artists:
            try:
                info = ydl.extract_info(f"ytsearch:Top songs {artist}", download=False)
                if info and 'entries' in info and len(info['entries']) > 0:
                    entry = info['entries'][0]
                    results.append({
                        'title': entry.get('title'),
                        'id': entry.get('id'),
                        'artist': artist
                    })
            except Exception as e:
                print(f"Erro com {artist}: {e}")
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
