// color sets (placeholder for our 7th entity)
class ColorStyle {
constructor(color) {
    if (color === "pink") {
      this.primary = "#F5878D";
      this.gradient = "#B9568C";
      this.circle = "#B9568C";
    } else if (color === "blue") {
      this.primary = "#22B0D2";
      this.gradient = "#1455CE";
      this.circle = "#1455CE";
    } else if (color === "purple") {
      this.primary = "#5F2EB3";
      this.gradient = "#29144D";
      this.circle = "#3D1E73";
    } else {
      // default (currently purple)
      this.primary = "#5F2EB3";
      this.gradient = "#29144D";
      this.circle = "#3D1E73";
    }
  }
}

export default ColorStyle;
