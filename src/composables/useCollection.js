import { firestore } from '@/firebase/config';
import { addDoc, collection } from '@firebase/firestore';
import { ref } from 'vue';

const useCollection = (collectionName) => {
    const error = ref(null);

    const addDocument = async (doc) => {
        error.value = null;

        try {
            await addDoc(collection(firestore, collectionName), doc);
        } catch (err) {
            console.log(err.message);
            error.value = 'Could not send the message';
        }
    };

    return { error, addDocument };
};

export default useCollection;
