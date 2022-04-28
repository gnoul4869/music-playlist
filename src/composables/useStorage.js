import { deleteObject, getDownloadURL, ref as storeRef, uploadBytesResumable } from '@firebase/storage';
import { fireStorage } from '@/firebase/config';
import { ref } from 'vue';

const useStorage = () => {
    const error = ref('');
    const filePath = ref('');
    const url = ref('');

    const uploadImage = async (image, userId) => {
        return new Promise((resolve, reject) => {
            filePath.value = `covers/${userId}/${image.name}`;
            const imageRef = storeRef(fireStorage, filePath.value);

            const uploadTask = uploadBytesResumable(imageRef, image);
            uploadTask.on('state_changed', {
                error: (err) => {
                    console.log(err.message);
                    error.value = 'Error uploading image';
                    reject(err);
                },
                complete: () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        url.value = downloadURL;

                        resolve();
                    });
                },
            });
        });
    };

    const deleteImage = async (imagePath) => {
        try {
            const imageRef = storeRef(fireStorage, imagePath);
            await deleteObject(imageRef);
        } catch (err) {
            console.log(err.message);
            error.value = 'Error deleting image';
        }
    };

    return { error, url, filePath, uploadImage, deleteImage };
};

export default useStorage;
