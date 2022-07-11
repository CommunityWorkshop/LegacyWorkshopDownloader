export default function getItemIdFromURL(url: string) {
  const regax = /\d+/gm;
  const itemId = url.match(regax)?.[0];
  return itemId;
}
