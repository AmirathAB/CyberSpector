<template>
    <div class="login-wrapper">
        <form @submit.prevent="handleLogin" class="login-card">
            <div v-if="error" class="error">{{ error }}</div>

            <!-- Header -->
            <div class="login-header">
                <h2>Bienvenue sur Spectorly!</h2>
                <p>
                    Vous n’avez pas de compte ?
                    <a href="#">Créez votre compte</a> ou connectez-vous avec votre
                    <a href="#" class="highlight-link">code</a> entreprise.
                </p>
            </div>

            <!-- Email input -->
            <div class="form-group">
                <label for="email">
                    Email<span class="required">*</span>
                </label>
                <input id="email" type="email" v-model="email" placeholder="didi.franck@exemple.com" required />
            </div>

            <!-- Password input -->
            <div class="form-group password-group">
                <label for="password">
                    Mot de passe<span class="required">*</span>
                </label>
                <div class="password-wrapper">
                    <input ref="passwordInput" id="password" :type="showPassword ? 'text' : 'password'"
                        v-model="password" placeholder="h472by6364_dg77" required />
                    <button type="button" class="toggle-password" @click="togglePassword">
                        <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
                    </button>
                </div>

            </div>
            <!-- Texte légal -->
            <div class="legal-text">
                En continuant, vous acceptez notre
                <a href="#" class="legal-link">Politique de confidentialité</a> ainsi que notre utilisation des
                <a href="#" class="legal-link">Cookies</a>.
            </div>

            <!-- Bouton connexion -->
            <button type="submit" class="btn-login" :disabled="isLoading">
                <span v-if="!isLoading">Connexion</span>
                <span v-else class="loader-oscillations">
                    <span></span><span></span><span></span>
                </span>
            </button>
        </form>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

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
    setup() {
        const router = useRouter(); // 🔥 Hook pour utiliser le router
        return { router };
    },
    methods: {
        async handleLogin() {
            this.error = "";
            this.isLoading = true;

            // Validation front
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email)) {
                this.error = "Email invalide.";
                this.isLoading = false;
                return;
            }
            if (this.password.length < 6) {
                this.error = "Le mot de passe doit contenir au moins 6 caractères.";
                this.isLoading = false;
                return;
            }

            try {
                // Simuler appel API login
                await new Promise(resolve => setTimeout(resolve, 1000)); // ⚡ juste pour tester

                // Si connexion réussie, rediriger
                this.router.push({ name: 'Certificate' }); // 🔥 Redirection vers CertificatePage
            } catch (err) {
                this.error = "Connexion impossible. Vérifiez vos identifiants.";
            } finally {
                this.isLoading = false;
            }
        },

        togglePassword() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>


<style scoped>
/* Wrapper centré */
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
    background: #f7f8fa;
}

/* Carte login */
.login-card {
    width: 100%;
    max-width: 420px;
    background: #fff;
    border-radius: 16px;
    padding: 2rem 4rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

/* Header */
.login-header h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #333;
}

.login-header p {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1.5rem;
}

.login-header a {
    color: #1d72b8;
    text-decoration: none;
}

.login-header a:hover {
    text-decoration: underline;
}

.highlight-link {
    color: #1d72b8;
    font-weight: 500;
    text-decoration: none;
}

.highlight-link:hover {
    text-decoration: underline;
}

/* Form groups */
.form-group {
    margin-bottom: 1rem;
    width: 100%;
}

.form-group label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
}

.form-group input,
.password-wrapper input {
    width: 100%;
    padding: 0.65rem 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    transition: border 0.2s;
    box-sizing: border-box;
    /* padding inclus dans la largeur */
}

.password-wrapper input {
    padding-right: 2.5rem;
    /* espace pour le bouton œil */
}

.form-group input:focus {
    outline: none;
    border-color: #1d72b8;
    box-shadow: 0 0 0 2px rgba(29, 114, 184, 0.2);
}

/* Étoile rouge proche du mot */
.required {
    color: #c0392b;
    margin-left: 0.2rem;
}

/* Password wrapper pour l’œil */
.password-wrapper {
    position: relative;
    width: 100%;
}

.toggle-password {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.2rem;
}

/* Texte légal */
.legal-text {
    font-size: 0.8rem;
    color: #666;
    margin: 0.75rem 0 1rem;
    line-height: 1.4;
}

.legal-link {
    color: #1d72b8;
    font-weight: 500;
    text-decoration: none;
}

.legal-link:hover {
    text-decoration: underline;
}

/* Bouton */
.btn-login {
    display: inline-block;
    padding: 0.5rem 1.2rem;
    min-width: 120px;
    border: none;
    border-radius: 8px;
    background-color: #28a745;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    text-align: center;
    align-self: flex-start;
    /* aligné à gauche */
}

.btn-login:hover {
    background-color: #218838;
}

/* Message d’erreur */
.error {
    background: #fde2e2;
    color: #c0392b;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-align: center;
}

/* Responsive mobile */
@media (max-width: 480px) {
    .login-card {
        padding: 1.5rem;
    }

    .login-header h2 {
        font-size: 1.5rem;
    }

    .btn-login {
        font-size: 0.95rem;
    }
}

/* Loader à oscillations */
.loader-oscillations {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 4px;
    height: 24px;
    /* augmenter la hauteur pour que ça se voie */
}

.loader-oscillations span {
    display: block;
    width: 4px;
    height: 16px;
    /* hauteur initiale */
    background: white;
    /* ou #fff si ton bouton est sombre, sinon change la couleur */
    border-radius: 2px;
    animation: bounce 0.6s infinite ease-in-out;
}

.loader-oscillations span:nth-child(1) {
    animation-delay: 0s;
}

.loader-oscillations span:nth-child(2) {
    animation-delay: 0.2s;
}

.loader-oscillations span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {

    0%,
    100% {
        transform: scaleY(0.3);
    }

    50% {
        transform: scaleY(1);
    }
}

/* Bouton désactivé */
.btn-login:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>
