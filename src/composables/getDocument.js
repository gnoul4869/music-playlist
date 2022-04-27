import { doc, onSnapshot } from '@firebase/firestore';

const getDocument = (collectionName, documentId) => {
    const document = ref(null);
    const error = ref('');

    const documentRef = doc(firestore, collectionName, documentId);
    const unsub = onSnapshot(
        documentRef,
        (snapshot) => {
            if (snapshot.data()) {
                document.value = { ...snapshot.data(), id: snapshot.id };
                error.value = '';
            } else {
                error.value = 'Playlist does not exist';
            }
        },
        (err) => {
            console.log(err.message);
            error.value = 'Could not fetch data';
        }
    );

    onUnmounted(() => unsub());

    return { document, error };
};

export default getDocument;
