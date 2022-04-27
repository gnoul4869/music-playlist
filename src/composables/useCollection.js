import { firestore } from '@/firebase/config';
import { addDoc, collection } from '@firebase/firestore';
import { ref } from 'vue';

const useCollection = (collectionName) => {
    const error = ref(null);

    const addDocument = async (doc) => {
        error.value = null;

        try {
            const res = await addDoc(collection(firestore, collectionName), doc);

            return res;
        } catch (err) {
            error.value = err.message;
        }
    };

    return { error, addDocument };
};

export default useCollection;
