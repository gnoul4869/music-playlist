import { ref } from 'vue';
import { deleteDoc, doc } from '@firebase/firestore';
import { firestore } from '@/firebase/config';

const useDocument = (collectionName, documentId) => {
    const error = ref('');

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

    return { error, deleteDocument };
};

export default useDocument;
