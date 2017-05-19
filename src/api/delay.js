export default 1000;

export function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
