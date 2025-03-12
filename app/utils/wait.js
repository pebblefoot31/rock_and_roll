//creating a helper function to test our loading indicator
export default function wait(delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}
