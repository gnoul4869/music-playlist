import { fireAuth } from '@/firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ref } from 'vue';

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try {
        const res = await signInWithEmailAndPassword(fireAuth, email, password);

        isPending.value = false;
        return res;
    } catch (err) {
        error.value = err.message.replace('Firebase: ', '');
        isPending.value = false;
    }
};

const useLogin = () => {
    return { error, isPending, login };
};

export default useLogin;
