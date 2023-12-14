import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from 'src/config/firebase';
import { uid } from 'quasar';

export const uploadImage = async (file: any) => {
  const storageUID = uid();
  const storageRef = ref(storage, `images/${storageUID}`);
  return await uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref)
      .then((result) => {
        return {
          result,
          storageUID,
        };
      });
  })
}

export const deleteImage = async (imgUid: string) => {
  const storageRef = ref(storage, `images/${imgUid}`)
  return deleteObject(storageRef)
    .then(() => {
      return 'Image deleted successfully';
    })
    .catch((error) => {
      throw error;
    })
}

