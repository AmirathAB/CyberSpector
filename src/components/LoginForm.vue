<template>
    <div class="login-wrapper">
        <form @submit.prevent="handleLogin" class="login-card">
            <!-- Error message -->
            <div v-if="error" class="error-message">
                <div class="error-icon-wrapper">
                    <svg class="error-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <span class="error-text">{{ error }}</span>
            </div>

            <!-- Header -->
            <div class="login-header">
                <h2>Bienvenu sur Spectorly!</h2>
                <p>
                    Vous n'avez pas de compte ?
                    <a href="#" class="link">Créez votre compte</a> ou
                    connectez-vous avec votre
                    <a href="#" class="link">code</a> entreprise.
                </p>
            </div>

            <!-- Email input -->
            <div class="form-group">
                <label for="email">
                    Email<span class="required">*</span>
                </label>
                <input id="email" type="email" v-model="email" placeholder="didi.franck@exemple.com" required
                    class="form-input" />
            </div>

            <!-- Password input -->
            <div class="form-group">
                <label for="password">
                    Mot de passe<span class="required">*</span>
                </label>
                <div class="password-wrapper">
                    <input id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
                        placeholder="h472by6364_dg77" required class="form-input" />
                    <button type="button" class="toggle-password" @click="togglePassword"
                        :title="showPassword ? 'Masquer' : 'Afficher'">
                        <svg v-if="!showPassword" class="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <svg v-else class="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                clip-rule="evenodd" />
                            <path
                                d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Legal text -->
            <div class="legal-text">
                En continuant, vous acceptez notre
                <a href="#" class="link">Politique de confidentialité</a> ainsi que notre
                utilisation des <a href="#" class="link">Cookies</a>.
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn-login" :disabled="isLoading">
                <span v-if="!isLoading">Connexion</span>
                <span v-else class="loader">
                    <span></span><span></span><span></span>
                </span>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: "LoginForm",

    data() {
        return {
            email: "",
            password: "",
            error: "",
            showPassword: false,
            isLoading: false,
        };
    },

    methods: {
        async handleLogin() {
            this.error = "Connexion impossible. Vérifiez vos identifiants et réessayez.";
            this.isLoading = false;
            this.$nextTick(() => {
                setTimeout(() => {
                    if (this.$router) {
                        this.$router.push("/certificate");
                    } else {
                        window.location.href = "/certificate";
                    }
                }, 1000);
            });
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1.5rem;
    background: #f7f9fa;
}

.login-card {
    width: 100%;
    max-width: 554px;
    background: #ffffff;
    border-radius: 32px;
    padding: 52px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.error-message {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    background: #fff3f3;
    border: 1px solid #ed4a4d;
    border-radius: 8px;
    margin-bottom: 32px;
}

.error-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;
}

.error-icon {
    width: 20px;
    height: 20px;
    color: #ed4a4d;
}

.error-text {
    flex: 1;
    color: #1e1e1e;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
}

.login-header {
    margin-bottom: 32px;
}

.login-header h2 {
    font-size: 26px;
    font-weight: 700;
    color: #1e1e1e;
    margin: 0 0 12px 0;
    letter-spacing: -0.01em;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.2;
}

.login-header p {
    font-size: 16px;
    color: #6e6e6e;
    line-height: 1.6;
    margin: 0;
    font-weight: 500;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    transition: text-decoration 0.2s;
}

.link:hover {
    text-decoration: underline;
}

.form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #1e1e1e;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.required {
    color: #dc2626;
}

.form-input {
    width: 100%;
    padding: 10px 16px;
    font-size: 14px;
    color: #1e1e1e;
    background: #ffffff;
    border: 1px solid #e0e4e7;
    border-radius: 8px;
    transition: all 0.2s ease;
    font-weight: 500;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.form-input::placeholder {
    color: #6e6e6e;
}

.form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.password-wrapper .form-input {
    padding-right: 44px;
}

.toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    border-radius: 4px;
}

.toggle-password:hover {
    color: #374151;
}

.toggle-password:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

.icon {
    width: 20px;
    height: 20px;
}

.legal-text {
    font-size: 12px;
    color: #6e6e6e;
    line-height: 1.6;
    margin: 20px 0 20px 0;
    font-weight: 500;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.btn-login {
    padding: 10px 16px;
    font-size: 14px;
    color: #ffffff;
    background: #10b961;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-width: 100px;
    font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.btn-login:hover:not(:disabled) {
    background: #15803d;
}

.btn-login:active:not(:disabled) {
    background: #0f7c4f;
}

.btn-login:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-login:focus {
    outline: 2px solid #10b961;
    outline-offset: 2px;
}

.loader {
    display: flex;
    gap: 4px;
    align-items: center;
}

.loader span {
    width: 6px;
    height: 6px;
    background: #ffffff;
    border-radius: 50%;
    animation: bounce 1s infinite ease-in-out;
}

.loader span:nth-child(1) {
    animation-delay: 0s;
}

.loader span:nth-child(2) {
    animation-delay: 0.15s;
}

.loader span:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes bounce {
    0%,
    60%,
    100% {
        transform: translateY(0);
    }

    30% {
        transform: translateY(-8px);
    }
}

@media (max-width: 768px) {
    .login-card {
        padding: 40px 32px;
        border-radius: 24px;
    }

    .login-header h2 {
        font-size: 22px;
    }

    .login-header p {
        font-size: 14px;
    }
}

@media (max-width: 640px) {
    .login-wrapper {
        padding: 1rem;
    }

    .login-card {
        padding: 32px 24px;
        border-radius: 20px;
        max-width: 100%;
    }

    .login-header {
        margin-bottom: 24px;
    }

    .login-header h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .login-header p {
        font-size: 13px;
    }

    .form-group {
        margin-bottom: 16px;
    }

    .error-message {
        margin-bottom: 24px;
        padding: 12px;
    }

    .legal-text {
        font-size: 11px;
        margin: 16px 0;
    }

    .btn-login {
        width: 100%;
        min-width: unset;
    }
}
</style>
