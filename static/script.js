
document.getElementById('generateBtn').addEventListener('click', () => {
    const input = document.getElementById('artistsInput').value.trim();
    const artists = input.split('\n').filter(a => a.trim() !== '');

    fetch('/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artists: artists })
    })
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('playlist');
        container.innerHTML = '';

        if (data.length === 0) {
            container.innerHTML = '<p>Nenhum vídeo encontrado.</p>';
            return;
        }

        data.forEach(video => {
            const div = document.createElement('div');
            div.className = 'video-card';

            const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
            div.innerHTML = `
                <strong>${video.artist}</strong>: ${video.title}<br>
                <a href="${videoUrl}" class="popup-youtube">🎧 Ouvir</a>
            `;
            container.appendChild(div);
        });

        $('.popup-youtube').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 300,
            preloader: false,
            fixedContentPos: false
        });
    });
});
