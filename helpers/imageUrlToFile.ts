export async function imageUrlToFile(imageUrl: string, fileName: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error("Error converting image URL to File:", error);
    return null;
  }
}
