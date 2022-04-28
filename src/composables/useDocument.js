import { ref } from 'vue';
import { addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { firestore } from '@/firebase/config';

const useDocument = (collectionName, documentId) => {
    const error = ref('');

    const addDocument = async (document) => {
        try {
            error.value = '';
            const res = await addDoc(collection(firestore, collectionName), document);

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

    const updateDocument = async (updates) => {
        try {
            error.value = '';
            const documentRef = doc(firestore, collectionName, documentId);
            const res = await updateDoc(documentRef, updates);

            return res;
        } catch (err) {
            console.log(err.message);
            error.value = 'Error updating playlist';
        }
    };

    return { error, addDocument, deleteDocument, updateDocument };
};

export default useDocument;
