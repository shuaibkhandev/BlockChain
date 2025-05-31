function calculateArea(props) {
    const { width, height } = props;
  return width * height;
}

// Usage
const dimensions = {
  width: 10,
  height: 5
};

const area = calculateArea(dimensions);
console.log("Area:", area); // Output: Area: 50
