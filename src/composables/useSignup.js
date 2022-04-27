import { fireAuth } from '@/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { ref } from 'vue';

const error = ref('');
const isPending = ref(false);

const signup = async (email, password, displayName) => {
    error.value = '';
    isPending.value = true;

    try {
        const res = await createUserWithEmailAndPassword(fireAuth, email, password);

        if (!res) {
            throw new Error('Error creating user');
        }

        await updateProfile(res.user, { displayName });

        isPending.value = false;
        return res;
    } catch (err) {
        error.value = err.message.replace('Firebase: ', '');
        isPending.value = false;
    }
};

const useSignup = () => {
    return { error, isPending, signup };
};

export default useSignup;
