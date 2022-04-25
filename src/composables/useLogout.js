import { signOut } from '@firebase/auth';
import { fireAuth } from '@/firebase/config';
import { ref } from 'vue';

const error = ref(null);
const isPending = ref(false);

const logout = async () => {
    error.value = null;
    isPending.value = true;

    try {
        await signOut(fireAuth);
        isPending.value = false;
    } catch (err) {
        error.value = err.message.replace('Firebase: ', '');
        isPending.value = false;
    }
};

const useLogout = () => {
    return { error, isPending, logout };
};

export default useLogout;
