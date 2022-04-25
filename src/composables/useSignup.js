import { fireAuth } from '@/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { ref } from 'vue';

const error = ref(null);

const signup = async (email, password, displayName) => {
    error.value = null;

    try {
        const res = await createUserWithEmailAndPassword(fireAuth, email, password);

        if (!res) {
            throw new Error('Error creating user');
        }

        await updateProfile(res.user, { displayName });

        return res;
    } catch (err) {
        error.value = err.message.replace('Firebase: ', '');
    }
};

const useSignup = () => {
    return { signup, error };
};

export default useSignup;
