export const getTimeNow = () => {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = currentDate.getUTCDate().toString().padStart(2, "0");
  const hours = currentDate.getUTCHours().toString().padStart(2, "0");
  const minutes = currentDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = currentDate
    .getUTCMilliseconds()
    .toString()
    .padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
};

const getRandomString = () => {
  return Math.random().toString(36).substring(2, 15);
};

export async function checkOnline() {
  if (!window.navigator.onLine) return false;

  // avoid CORS errors with a request to your own origin
  const ownWebSite = "https://note-app-server.fly.dev";
  const url = new URL(ownWebSite);

  // random value to prevent cached responses
  url.searchParams.set("rand", getRandomString());

  try {
    const response = await fetch(url.toString(), { method: "HEAD" });

    return response.ok;
  } catch {
    return false;
  }
}
