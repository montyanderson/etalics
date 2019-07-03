function hsl2rgb (h, s, l) {
    var r, g, b, m, c, x

    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0

    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6

    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))

    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))

    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

	return [r, g, b];
}

function etalics(query, f) {
	const $ = document.querySelector(query);

	const width = $.width = 250;
	const height = $.height = 250;

	$.style.width = "100%"; // make full width

	const ctx = $.getContext('2d');

	function render() {
		const i = Date.now() / 1000 * 20;

		const imageData = ctx.createImageData(width, height);

		for(let x = 0; x < width; x++) {
			for(let y = 0; y < height; y++) {
				const nX = (x / width * 2) - 1;
				const nY = (y / height * 2) - 1;

				const [nH, nS, nL] = f(nX, nY, i);

				const h = (nH + 1) * 180;
				const s = (nS + 1) * 50;
				const l = (nL + 1) * 50;

				const [r, g, b] = hsl2rgb(h, s, l);

				imageData.data[(((x * width) + y) * 4)] = r;
				imageData.data[(((x * width) + y) * 4) + 1] = g;
				imageData.data[(((x * width) + y) * 4) + 2] = b;
				imageData.data[(((x * width) + y) * 4) + 3] = 255;
			}
		}

		ctx.putImageData(imageData, 0, 0);
		window.requestAnimationFrame(render);
	}

	window.requestAnimationFrame(render);
}
