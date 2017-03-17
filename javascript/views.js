window.Views = (function) {
	const_views = {};
	const classMethods = (el, className, methodName) => {
		if (!el.length) {
			el.classList[methodName](className);
			return el;
		}
		Array.from(el).forEach((curr)=>{
			curr.classList[methodName](className);
		});
		return el;
	};
	const renderEmptySet = () => {
		return `
		<li class="list-group-item">
		No Posts!
		</li>
		`;
	}; //renderEmptySet
	const appendTo = (container, data, innerHTML = false) => {
		if (innerHTML) {
			container.innerHTML += data;
		}
		else {
			container.appendChild(data);
		}
		return container;
	}; //apendTo
	return {
		renderEmptySet,
		appendTo,
		classMethods,
	};
})();