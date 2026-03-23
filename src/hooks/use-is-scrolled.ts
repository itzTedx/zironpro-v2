import { useEffect, useState } from "react";

export function useIsScrolled(offset = 80) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const sentinel = document.createElement("div");
		sentinel.style.position = "absolute";
		sentinel.style.top = `${offset}px`;
		sentinel.style.width = "1px";
		sentinel.style.height = "1px";

		document.body.prepend(sentinel);

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsScrolled(!entry.isIntersecting);
			},
			{ threshold: 0 }
		);

		observer.observe(sentinel);

		return () => {
			observer.disconnect();
			sentinel.remove();
		};
	}, [offset]);

	return isScrolled;
}
