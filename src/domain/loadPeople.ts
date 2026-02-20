export async function loadPeople() {
  let path = "data/public/people.json"

  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    path = "data/local/people.json"
  }

  return fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error loading people data:", error);
      return {};
    });
}
