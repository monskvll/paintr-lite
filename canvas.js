window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const exports = document.querySelector('#exports-container');

    const clearBtn = document.querySelector('#clearBtn');
    const exportBtn = document.querySelector('#exportBtn');
    const toggleBtn = document.querySelector('#toggleBtn');

    const bgColorSel = document.querySelector('#bgColorSel');
    const colorSel = document.querySelector('#colorSel');
    const penSizeSel = document.querySelector('#penSizeSel');
    const penShadowColorSel = document.querySelector('#penShadowColorSel');
    const penShadowSizeSel = document.querySelector('#penShadowSizeSel');

    let context = canvas.getContext("2d");

    canvas.height = (window.innerHeight) * .6;
    canvas.width = (window.innerWidth) * .8;

    // DEFAULT VALUES
    let isDrawing = false;
    context.shadowBlur = 1;
    context.shadowColor = "black";
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function finishDrawing() {
        isDrawing = false;
        context.beginPath();
    }

    function draw(e) {
        if (!isDrawing) {
            return;
        }

        // offsetLeft and offsetTop deal with canvas being centered on the page
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
    }

    function clearDrawing() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function exportDrawing() {
        let img = new Image();
        img.src = canvas.toDataURL();
        let imgLink = document.createElement("a");
        imgLink.setAttribute("href", img.src);
        imgLink.innerHTML = `<img src=${img.src} />`;
        exports.appendChild(imgLink);
    }

    function toggleExports() {
        let result = exports.classList.toggle('toggle');

        if (result) {
            exports.setAttribute("style", "display: none")
            toggleBtn.textContent = '👁️';
        } else {
            exports.setAttribute("style", "display: block")
            toggleBtn.textContent = 'HIDE';
        }
    }

    function selectColor(e) {
        context.strokeStyle = e.target.value;
    }

    function selectBgColor(e) {
        context.fillStyle = e.target.value;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function selectPenSize(e) {
        context.lineWidth = e.target.value;
    }

    function selectPenShadowSize(e) {
        context.shadowBlur = e.target.value;
    }

    function selectPenShadowColor(e) {
        context.shadowColor = e.target.value;
    }

    clearBtn.addEventListener('click', clearDrawing);
    exportBtn.addEventListener('click', exportDrawing);
    toggleBtn.addEventListener('click', toggleExports);

    bgColorSel.addEventListener('change', selectBgColor);
    colorSel.addEventListener('change', selectColor);
    penSizeSel.addEventListener('change', selectPenSize);
    penShadowColorSel.addEventListener('change', selectPenShadowColor)
    penShadowSizeSel.addEventListener('change', selectPenShadowSize);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', finishDrawing);
    canvas.addEventListener('mousemove', draw);
})