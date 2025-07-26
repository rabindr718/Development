// src/utils/uploadImage.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadImageAndGetUrl = async (file) => {
  const uniqueName = `${crypto.randomUUID()}`; // random ID for filename
  const imageRef = ref(storage, `ImageList/${uniqueName}`);

  await uploadBytes(imageRef, file);
  const downloadUrl = await getDownloadURL(imageRef);

  return downloadUrl;
};
