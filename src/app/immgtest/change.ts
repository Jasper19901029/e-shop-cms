import sharp from "sharp";

export const transformImage = async (input: File) => {
  const data = await sharp(`${input}`).webp().toBuffer();
  console.log(data);
  return data;
};

async function changeImage(image: File) {
  const buffer = await sharp(`${image}`).resize(100, 100).toBuffer();
  return buffer;
}
