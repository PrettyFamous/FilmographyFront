export const Studios = () => [
  {
    name: "Disney",
    country: "USA"
  },
  {
    name: "Pixar",
    country: "Canada"
  }
].map((item,index) => ({
  id: index+1,
  ...item
}))
