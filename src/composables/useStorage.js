import { getDownloadURL, ref as storeRef, uploadBytesResumable } from '@firebase/storage';
import { fireStorage } from '@/firebase/config';
import { ref } from 'vue';
import getUser from './getUser';

const { user } = getUser();

const useStorage = () => {
    const storageError = ref('');
    const filePath = ref('');
    const url = ref('');

    const uploadImage = (image) => {
        if (!user.value) return (storageError.value = 'You must be logged in to upload an image');

        filePath.value = `covers/${user.value.uid}/${image.name}`;
        const imageRef = storeRef(fireStorage, filePath.value);

        const uploadTask = uploadBytesResumable(imageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                //     case 'paused':
                //         console.log('Upload is paused');
                //         break;
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                // }
            },
            (error) => {
                console.log(error);
                storageError.value = error;
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    url.value = downloadURL;
                });
            }
        );
    };

    return { storageError, url, uploadImage };
};

export default useStorage;
