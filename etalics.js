function etalics(query, f) {
	const $ = document.querySelector(query);

	const width = $.width = 100;
	const height = $.height = 100;

	$.style.width = "100%"; // make full width

	const ctx = $.getContext('2d');

	let i = 0;

	setInterval(() => {
		ctx.clearRect(0, 0, width, height);

		for(let x = 0; x < width; x++) {
			for(let y = 0; y < height; y++) {
				const nX = (x / width * 2) - 1;
				const nY = (y / height * 2) - 1;

				const [nH, nS, nL] = f(nX, nY, i);

				const h = (nH + 1) * 180;
				const s = (nS + 1) * 50;
				const l = (nL + 1) * 50;

				// console.log(nX, nY, i, h, s, l);

				ctx.fillStyle = `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
				ctx.fillRect(x, y, 1, 1);
			}
		}

		i++;
	}, 1000 / 24);
}
