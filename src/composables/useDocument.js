import { ref } from 'vue';
import { addDoc, collection, deleteDoc, doc } from '@firebase/firestore';
import { firestore } from '@/firebase/config';

const useDocument = (collectionName, documentId) => {
    const error = ref('');

    const addDocument = async (doc) => {
        try {
            error.value = '';
            const res = await addDoc(collection(firestore, collectionName), doc);

            return res;
        } catch (err) {
            error.value = err.message;
        }
    };

    const deleteDocument = async () => {
        try {
            error.value = '';
            const documentRef = doc(firestore, collectionName, documentId);
            const res = await deleteDoc(documentRef);

            return res;
        } catch (err) {
            console.log(err.message);
            error.value = 'Error deleting playlist';
        }
    };

    return { error, addDocument, deleteDocument };
};

export default useDocument;
