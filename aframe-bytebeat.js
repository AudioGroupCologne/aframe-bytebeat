class bytebeatSynth {
  constructor(audio) {
    this.audio = audio;
    this.code = this.parse("t");
    this.g = Function("t", "c", "return c=" + this.code + ";");
    this.lastCode = this.code;
    this.bytebeatWorker = false;
    this.bufIdx = 0;
  }

  parse(code) {
    let w = code.split("");
    let r = "";
    let v = "";
    let e;
    while ((e = w.shift())) {
      switch (e) {
        case "t":
          r += e;
          break;

        case "0":
          r += e;
          break;
        case "1":
          r += e;
          break;
        case "2":
          r += e;
          break;
        case "3":
          r += e;
          break;
        case "4":
          r += e;
          break;
        case "5":
          r += e;
          break;
        case "6":
          r += e;
          break;
        case "7":
          r += e;
          break;
        case "8":
          r += e;
          break;
        case "9":
          r += e;
          break;
        case "x":
          r += e;
          break;
        case "&":
          r += e;
          break;
        case "|":
          r += e;
          break;
        case "+":
          r += e;
          break;
        case "-":
          r += e;
          break;
        case "*":
          r += e;
          break;
        case "/":
          r += e;
          break;
        case "?":
          r += e;
          break;
        case ":":
          r += e;
          break;
        case "r":
          r += ">>";
          break;
        case "l":
          r += "<<";
          break;
        case ">":
          r += e;
          break;
        case "<":
          r += e;
          break;
        case "=":
          r += "==";
          break;
        case "q":
          r += "Math.sqrt";
          break;
        case "s":
          r += "Math.sin";
          break;
        case "a":
          r += "Math.asin";
          break;
        case "c":
          r += "Math.cos";
          break;
        case "a":
          r += "Math.asin";
          break;
        case "$":
          r += "Math.random";
          break;
        case "(":
          r += e;
          break;
        case ")":
          r += e;
          break;
        case "[":
          r += e;
          break;
        case "]":
          r += e;
          break;
        case "!":
          r += e;
          break;
        case ".":
          r += e;
          break;
        case ",":
          r += e;
          break;
        case "%":
          r += e;
          break;
        case "^":
          r += e;
          break;
      }
    }
    return r;
  }


  async init() {
    let actx = (this.audioCtx = document.querySelector(
      "a-resonance-audio-room"
    ).components["resonance-audio-room"].audioContext);
    await console.log("wait...");

    await this.audioCtx.audioWorklet.addModule("./aframe-bytebeat/bytebeat-worker.js");

    this.bytebeatWorker = new AudioWorkletNode(
      this.audioCtx,
      "bytebeat-worker"
    );

    this.streamDestination = this.audioCtx.createMediaStreamDestination();
    this.source = this.audioCtx.createBufferSource();

    this.myArrayBuffer = this.audioCtx.createBuffer(1, 48000 * 1, 48000);
    this.source.buffer = this.myArrayBuffer;
    this.source.connect(this.streamDestination);
    this.source.start();

    this.bytebeatWorker.connect(this.streamDestination);

    this.stream = this.streamDestination.stream;

    this.audio.setAttribute("resonance-audio-src", "src", this.stream);

    this.time = 0;

  }

  update(code) {
    this.code = this.parse(code);
    if (this.bytebeatWorker) {
      this.bytebeatWorker.port.postMessage(this.code);
    }
  }
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}


AFRAME.registerComponent("bytebeat", {
  synth: null,
  schema: {
    code: { default: "_" },
  },
  init: function () {
    let el = this.el;

   
    this.synth = new bytebeatSynth(el);

    this.synth.init();

    this.el.play();
    this.el.addEventListener("superkeyboardchange", () => {
      let code = el.childNodes[0].components["super-keyboard"].data.value;

      if (code == "666") {
        this.el.parentNode.removeChild(this.el);
      } else {
        this.el.setAttribute("bytebeat", "code", code);

        this.el.setAttribute("text", "value", code);

        this.synth.update(code);
      }
    });
  },
  update: function () {
    var data = this.data;
    var el = this.el;

    var resonanceRoom = document.querySelector("a-resonance-audio-room");

    el.setAttribute("resonance-audio-src", "room", resonanceRoom);
    el.setAttribute("resonance-audio-src", "position",el.getAttribute('position'));

    this.el.setAttribute("text", "value", data.code);
    this.el.setAttribute("bytebeat", "code", data.code);

    this.synth.update(data.code);
  },

});



AFRAME.registerComponent("byte-keyboard", {
  dependencies: ["super-keyboard"],
  init: function () {
    var model = {
      wrapCount: 35,
      inputOffsetY: 0.003,
      inputOffsetX: 0,
      img: "sk-basic.png",
      layout: [
        { key: "1", x: 0.044, y: 0.226, w: 0.079, h: 0.152 },
        { key: "2", x: 0.124, y: 0.226, w: 0.079, h: 0.152 },
        { key: "3", x: 0.203, y: 0.226, w: 0.079, h: 0.152 },
        { key: "4", x: 0.282, y: 0.226, w: 0.08, h: 0.152 },
        { key: "5", x: 0.363, y: 0.226, w: 0.079, h: 0.152 },
        { key: "6", x: 0.442, y: 0.226, w: 0.079, h: 0.152 },
        { key: "7", x: 0.521, y: 0.226, w: 0.079, h: 0.152 },
        { key: "8", x: 0.601, y: 0.226, w: 0.08, h: 0.152 },
        { key: "9", x: 0.681, y: 0.226, w: 0.079, h: 0.152 },
        { key: "0", x: 0.761, y: 0.226, w: 0.079, h: 0.152 },
        { key: "Delete", x: 0.846, y: 0.227, w: 0.108, h: 0.146 },
        { key: "r", x: 0.102, y: 0.393, w: 0.073, h: 0.155 },
        { key: "l", x: 0.176, y: 0.393, w: 0.073, h: 0.155 },
        { key: "&", x: 0.251, y: 0.393, w: 0.073, h: 0.155 },
        { key: "|", x: 0.326, y: 0.393, w: 0.072, h: 0.155 },
        { key: "+", x: 0.4, y: 0.393, w: 0.073, h: 0.155 },
        { key: "-", x: 0.475, y: 0.393, w: 0.073, h: 0.155 },
        { key: "*", x: 0.549, y: 0.393, w: 0.073, h: 0.155 },
        { key: "/", x: 0.624, y: 0.393, w: 0.073, h: 0.155 },
        { key: "%", x: 0.698, y: 0.393, w: 0.073, h: 0.155 },
        { key: ".", x: 0.773, y: 0.393, w: 0.073, h: 0.155 },
        { key: "?", x: 0.102, y: 0.573, w: 0.073, h: 0.155 },
        { key: ":", x: 0.176, y: 0.573, w: 0.073, h: 0.155 },
        { key: "<", x: 0.251, y: 0.573, w: 0.073, h: 0.155 },
        { key: ">", x: 0.326, y: 0.573, w: 0.072, h: 0.155 },
        { key: "=", x: 0.4, y: 0.573, w: 0.073, h: 0.155 },
        { key: "!", x: 0.475, y: 0.573, w: 0.073, h: 0.155 },
        { key: "(", x: 0.549, y: 0.573, w: 0.073, h: 0.155 },
        { key: ")", x: 0.624, y: 0.573, w: 0.073, h: 0.155 },
        { key: "[", x: 0.698, y: 0.573, w: 0.073, h: 0.155 },
        { key: "]", x: 0.773, y: 0.573, w: 0.073, h: 0.155 },
        { key: "Enter", x: 0.857, y: 0.539, w: 0.097, h: 0.22 },
        { key: "s", x: 0.267, y: 0.739, w: 0.08, h: 0.154 },
        { key: "c", x: 0.347, y: 0.739, w: 0.079, h: 0.154 },
        { key: "a", x: 0.426, y: 0.739, w: 0.08, h: 0.154 },
        { key: "q", x: 0.506, y: 0.739, w: 0.08, h: 0.154 },
        { key: "$", x: 0.585, y: 0.739, w: 0.079, h: 0.154 },
        { key: "t", x: 0.102, y: 0.752, w: 0.098, h: 0.22 },
      ],
    };
    this.el.components["super-keyboard"].addCustomModel("byte", model);
    this.el.setAttribute("super-keyboard", {
      imagePath: "./aframe-bytebeat/",
      model: "byte",
    });
  },
});

AFRAME.registerComponent('bytebeat-persistent', {
  schema: {
    template: { default: '' },
    keyCode: { default: 32}
  },

  init: function() {
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
  },

  onKeyUp: function(e) {
    if (this.data.keyCode === e.keyCode) {
      const el = document.createElement('a-entity');
      this.el.sceneEl.appendChild(el);
      el.setAttribute('position', ''+this.el.getAttribute('position').x+' 1.6 '+this.el.getAttribute('position').z+'');
      el.setAttribute('networked', {persistent: true, template: this.data.template});
      NAF.utils.getNetworkedEntity(el).then((networkedEl) => {
        document.body.dispatchEvent(new CustomEvent('persistentEntityCreated', {detail: {el: el}}));
      });
    }
  }
});
