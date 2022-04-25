import { fireAuth } from '@/firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ref } from 'vue';

const error = ref(null);

const login = async (email, password) => {
    error.value = null;

    try {
        const res = await signInWithEmailAndPassword(fireAuth, email, password);

        error.value = null;
        return res;
    } catch (err) {
        error.value = err.message.replace('Firebase: ', '');
    }
};

const useLogin = () => {
    return { error, login };
};

export default useLogin;
