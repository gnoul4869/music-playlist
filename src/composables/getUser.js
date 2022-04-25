import { onAuthStateChanged } from '@firebase/auth';
import { fireAuth } from '@/firebase/config';
import { ref } from 'vue';

const user = ref(fireAuth.currentUser);

onAuthStateChanged(fireAuth, (_user) => {
    user.value = _user;
});

const getUser = () => {
    return { user };
};

export default getUser;
