import { getDownloadURL, ref as storeRef, uploadBytesResumable } from '@firebase/storage';
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
                    error.value = err;

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

    return { error, url, filePath, uploadImage };
};

export default useStorage;
