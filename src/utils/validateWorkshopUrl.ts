export default function validateWorkshopUrl(url: string) {
  const regex =
    /^https:\/\/steamcommunity\.com\/sharedfiles\/filedetails\/\d+\/\d+\/\d+$/i;
  return regex.test(url);
}
