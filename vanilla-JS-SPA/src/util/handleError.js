export default function handleError(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}