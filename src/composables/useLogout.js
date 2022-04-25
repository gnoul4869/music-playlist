import { signOut } from '@firebase/auth';
import { fireAuth } from '@/firebase/config';
import { ref } from 'vue';

const error = ref(null);

const logout = async () => {
    error.value = null;

    try {
        await signOut(fireAuth);
    } catch (err) {
        error.value = err.message.replace('Firebase: ', '');
    }
};

const useLogout = () => {
    return { error, logout };
};

export default useLogout;
