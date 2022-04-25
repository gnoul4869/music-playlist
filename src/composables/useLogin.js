import { fireAuth } from '@/firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ref } from 'vue';

const error = ref(null);
const isLoading = ref(false);

const login = async (email, password) => {
    error.value = null;
    isLoading.value = true;

    try {
        const res = await signInWithEmailAndPassword(fireAuth, email, password);

        isLoading.value = false;
        return res;
    } catch (err) {
        error.value = err.message.replace('Firebase: ', '');
        isLoading.value = false;
    }
};

const useLogin = () => {
    return { error, isLoading, login };
};

export default useLogin;
