namespace Shapes {
  export class Circle {
    constructor(public radius: number) {}
    getArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  }
  export class Square {
    constructor(public side: number) {}
    getPerimeter(): number {
      return 4 * this.side;
    }
  }
}

const circle = new Shapes.Circle(7);
console.log(`Circle's square: ${circle.getArea()}`);

const square = new Shapes.Square(4);
console.log(`Square's perimeter: ${square.getPerimeter()}`);
