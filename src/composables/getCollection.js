import { firestore } from '@/firebase/config';
import { collection, limit, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { onUnmounted, ref, watchEffect } from 'vue';

const getCollection = (collectionName, collectionQuery) => {
    const documents = ref(null);
    const error = ref('');

    let { qWhere, qLimit } = collectionQuery || {};

    if (!qWhere) qWhere = ['title', '!=', ''];
    if (!qLimit) qLimit = 100;

    const conllectionRef = collection(firestore, collectionName);
    const queryRef = query(conllectionRef, where(...qWhere), limit(qLimit));

    const unsub = onSnapshot(
        queryRef,
        (snapshot) => {
            const results = [];
            snapshot.docs.forEach((doc) => {
                doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
            });
            documents.value = results;
            error.value = '';
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
