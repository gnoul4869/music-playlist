import { firestore } from '@/firebase/config';
import { addDoc, collection } from '@firebase/firestore';
import { ref } from 'vue';

const useCollection = (collectionName) => {
    const error = ref(null);
    const isPending = ref(false);

    const addDocument = async (doc) => {
        error.value = null;
        isPending.value = true;

        try {
            await addDoc(collection(firestore, collectionName), doc);
            isPending.value = false;
        } catch (err) {
            console.err(err.message);
            error.value = 'Could not send the message';
            isPending.value = false;
        }
    };

    return { error, isPending, addDocument };
};

export default useCollection;
