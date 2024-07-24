import React, { useEffect, useState } from "react";

function NumberInc({ number, speed, startAnimation }: { number: number; speed: number; startAnimation: boolean }) {
	const [num, setNum] = useState(0);

	useEffect(() => {
		if (!startAnimation) return;

		let incrementNumber = Math.floor(number / speed);
		const interval = setInterval(() => {
			setNum((prev) => {
				const next = prev + incrementNumber;
				if (next >= number) {
					clearInterval(interval);
					return number;
				}
				return next;
			});
		}, 100);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [number, speed, startAnimation]);

	const converter = (num: number) => {
		if (num >= 1_000_000_000) {
			return `${(num / 1_000_000_000).toFixed(1)}B`;
		}
		if (num >= 1_000_000) {
			return `${(num / 1_000_000).toFixed(1)}M`;
		}
		return num.toLocaleString(); // Format with commas
	};

	return <>{converter(num)}</>;
}

export default NumberInc;
