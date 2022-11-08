import  renderAuthComponent from "./components/auth.js";

let root = undefined;
let componentRoot = undefined;

function _render() {
	root.innerHTML = `<div class='log-page'>
						<div id='log-content'>
							
						</div>
					</div>`;
	componentRoot = document.getElementById("log-content");
	renderAuthComponent(componentRoot);
}

export default function _init(_root) {
	root = _root;
	_render();
}