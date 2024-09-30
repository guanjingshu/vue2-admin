export function tihuan(arr) {
  let arr = [
    { content: 1 },
    { content: 2 },
    { content: 3 },
    { content: 4 },
    { content: 5 },
  ];
  let index = arr.findIndex((item) => item.content === 4);
  arr.splice(index, 1, { content: "test" });

  console.log(arr);
}
