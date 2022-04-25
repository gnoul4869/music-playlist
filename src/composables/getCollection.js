import { firestore } from '@/firebase/config';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { onUnmounted, ref, watchEffect } from 'vue';

const getCollection = (collectionName) => {
    const documents = ref(null);
    const error = ref(null);

    const conllectionRef = collection(firestore, collectionName);
    const collectionQuery = query(conllectionRef, orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(
        collectionQuery,
        (snapshot) => {
            const results = [];
            snapshot.docs.forEach((doc) => {
                doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
            });
            documents.value = results;
            error.value = null;
        },
        (err) => {
            console.log(err.message);
            error.value = 'Could not fetch data';
        }
    );

    // watchEffect((onInvalidate) => {
    //     onInvalidate(() => unsub());
    // });

    onUnmounted(() => unsub());

    return { documents, error };
};

export default getCollection;
