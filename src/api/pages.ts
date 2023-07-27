export async function getPages() {
  const response = await fetch(
    "https://prolegomenon.s3.amazonaws.com/contents.json"
  );
  const data = await response.json();
  return data.pages;
}