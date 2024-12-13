const SIZE: Size[] = [
  { id: "XS", price: 8000 },
  { id: "S", price: 10000 },
  { id: "M", price: 12000 },
  { id: "L", price: 14000 },
  { id: "XL", price: 15000 },
] as const; // 방법2)

// 방법1)
type Size = { id: "XS" | "S" | "M" | "L" | "XL"; price: number };
//type Size = { id: keyof typeof sizeOption ; price: number};

const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };

const totalPrice = SIZE.reduce(
  (currPrice, size) => currPrice + sizeOption[size.id] * size.price,
  0
);
