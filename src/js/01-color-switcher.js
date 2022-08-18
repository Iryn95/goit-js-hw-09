function getRandomHexColor(){
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const refs={
    bodyObject: document.querySelector("body"),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    timerId: null,
    boxE1:document.createElement("div"),
};

refs.boxE1.className = "boxElement";

refs.btnStart.before(refs.boxE1);

refs.boxE1.prepend(refs.btnStart,refs.btnStop);

refs.btnStop.setAttribute("disabled","");

refs.btnStart.addEventListener("click", (e)=> {
    e.target.setAttribute("disabled", "");
    refs.btnStop.removeAttribute("disabled");

    refs.timerId = setInterval(() => {

    refs.bodyObject.style.backgroundColor = getRandomHexColor();

     }, 1000);
});

refs.btnStop.addEventListener("click", (e) => {
    e.target.setAttribute("disabled", "");
    refs.btnStart.removeAttribute("disabled");

    clearInterval(refs.timerId);

});

