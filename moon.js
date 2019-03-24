AFRAME.registerComponent("moon", {
  schema: {
    tRevol: { type: "number", default: 500000 },
    axe: { type: "number", default: 0.4 },
    angularStart: { type: "number", default: 0 },
    tRotation: { type: "number", default: 5000 },
    timeEvol: { type: "number", default: 0 },
    isEnable: { type: "boolean", default: false }
  },
  init: function() {
    document
      .getElementById("marker_hiro")
      .addEventListener("markerFound", () => {
        this.data.isEnable = true;
      });
    document
      .getElementById("marker_hiro")
      .addEventListener("markerLost", () => {
        this.data.isEnable = false;
      });
  },

  tick: function(time, timeDelta) {
    // Do something on every scene tick or frame.
    if (this.data.isEnable) {
      this.data.timeEvol += timeDelta;
      var pos = this.el.getAttribute("position");
      pos.x =
        2 *
        this.data.axe *
        Math.cos(
          this.data.angularStart + (360 * this.data.timeEvol) / this.data.tRevol
        );
      pos.z =
        2 *
        this.data.axe *
        Math.sin(
          this.data.angularStart + (360 * this.data.timeEvol) / this.data.tRevol
        );
      this.el.setAttribute("position", pos);
      var rot = this.el.getAttribute("rotation");
      rot.y = (360 * this.data.timeEvol) / this.data.tRotation;
      this.el.setAttribute("rotation", rot);
    }
  }
});
