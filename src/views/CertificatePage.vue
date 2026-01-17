<template>
    <div class="certificate-page">
        <!-- Carte supérieure -->
        <div class="certificate-top-card">
            <div class="top-row">
                <div class="certificate-header">
                    <h2>Mon certificat</h2>
                    <h3>Résumé de la certification</h3>
                    <p>Retrouvez les détails de votre progression et les informations essentielles.</p>
                </div>
                <div class="user-info">
                    <img src="https://picsum.photos/50" alt="Avatar" class="user-avatar" />
                    <div class="user-text">
                        <div class="user-name-row">
                            <p class="user-name">Didi Franck</p>
                            <span class="user-badge">Entreprise</span>
                        </div>
                        <p class="user-email">didi.franck@exemple.com</p>
                    </div>
                </div>
            </div>
            <div class="certificate-buttons">
                <button class="btn-view">
                    <i class="fa-regular fa-eye"></i>
                    Voir le certificat
                </button>
                <button class="btn-download">
                    <i class="fa-solid fa-download"></i>
                    Télécharger
                </button>
            </div>
        </div>

        <!-- Carte résumé avec statistiques -->
        <div class="certificate-summary-card">
            <div class="summary-grid">
                <!-- Progression -->
                <div class="summary-item summary-progress">
                    <div class="summary-inner-card with-icon">
                        <i class="summary-icon fa-solid fa-chart-line"></i>
                        <p class="label">Progression</p>
                        <div class="progress-header-line">
                            <span class="score-left">{{ progressPercent }}%</span>
                            <span class="score-right">{{ completedModules }}/{{ totalModules }} modules</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" :style="{ width: progressPercent + '%' }"></div>
                        </div>
                    </div>
                </div>

                <!-- Cyberscore -->
                <div class="summary-item">
                    <div class="summary-inner-card">
                        <div class="value-row">
                            <span class="value">100%</span>
                            <i class="fa-solid fa-shield-halved icon-inline"></i>
                        </div>
                        <span class="label">Cyberscore de certification</span>
                    </div>
                </div>

                <!-- Quiz -->
                <div class="summary-item">
                    <div class="summary-inner-card">
                        <div class="value-row">
                            <span class="value">100%</span>
                            <i class="fa-solid fa-star icon-inline"></i>
                        </div>
                        <span class="label">Score moyen des quiz</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Détails de la progression -->
        <div class="progress-details">
            <div class="progress-header" @click="toggleDetails">
                <div>
                    <h3>Détails de la progression</h3>
                    <p>Votre progression détaillée, étape après étape.</p>
                </div>
                <i :class="isOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
            </div>

            <!-- Modules (affichés si ouvert) -->
            <div v-if="isOpen" class="progress-content">
                <div v-if="loading" class="loading">
                    Chargement en cours...
                </div>
                <div v-else-if="error" class="error">
                    {{ error }}
                </div>
                <div v-else class="modules-container">
                    <div v-for="module in modules" :key="module.id" class="module-card">
                        <img :src="module.image" alt="Module Image" class="module-image" />
                        <div class="module-content">
                            <p class="module-label">Module {{ module.id }} • {{ module.duration }} min</p>
                            <h4 class="module-title">{{ module.title }}</h4>
                            <p class="module-desc">{{ module.description }}</p>

                            <div class="progress-wrapper">
                                <span class="progress-left">{{ module.progress }}%</span>
                                <span class="progress-right">
                                    <span class="completed-count">{{ module.completed }}</span><span
                                        class="total-count">/{{ module.total }}</span> modules
                                </span>
                            </div>

                            <div class="progress-bar small">
                                <div class="progress" :style="{ width: module.progress + '%' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CertificatePage",
    data() {
        return {
            modules: [],
            isOpen: true, // Ouvert par défaut
            loading: false,
            error: null
        };
    },
    computed: {
        completedModules() {
            return this.modules.reduce((acc, m) => acc + m.completed, 0);
        },
        totalModules() {
            return this.modules.reduce((acc, m) => acc + m.total, 0);
        },
        progressPercent() {
            if (!this.modules.length) return 0;
            const totalProgress = this.modules.reduce((acc, m) => acc + m.progress, 0);
            return Math.round(totalProgress / this.modules.length);
        }
    },
    methods: {
        toggleDetails() {
            this.isOpen = !this.isOpen;
        },
        async loadModules() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('https://dummyjson.com/posts');
                this.modules = response.data.posts.slice(0, 4).map((post) => ({
                    id: post.id,
                    title: post.title,
                    description: post.body.substring(0, 120) + '...',
                    duration: 16,
                    image: `https://picsum.photos/300/200?random=${post.id}`,
                    progress: Math.floor(Math.random() * 100),
                    completed: Math.floor(Math.random() * 4) + 1,
                    total: 12
                }));
            } catch (err) {
                this.error = "Impossible de charger les modules";
                console.error("Erreur API:", err);
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.loadModules();
    }
};
</script>

<style scoped>
.certificate-page {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    padding: 2rem;
    background: #f9fafb;
    min-height: 100vh;
}

/* Carte supérieure */
.certificate-top-card {
    background: #fff;
    padding: 1.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
}

.top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 1.5rem;
}

.certificate-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    color: #111827;
}

.certificate-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #111827;
}

.certificate-header p {
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0;
}

/* User info */
.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.user-text {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.user-name-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-name {
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0;
    color: #111827;
}

.user-badge {
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
}

.user-email {
    font-size: 0.8rem;
    color: #6b7280;
    margin: 0;
}

/* Buttons */
.certificate-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.certificate-buttons button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-view {
    background: #fff;
    border: 1px solid #e5e7eb;
    color: #374151;
}

.btn-view:hover {
    background: #f9fafb;
    border-color: #d1d5db;
}

.btn-download {
    background: #10b962 ;
    color: #fff;
    border: none;
}

.btn-download:hover {
    background: #10b962 ;
}

/* Summary grid */
.certificate-summary-card {
    margin-bottom: 1.5rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1rem;
}

.summary-inner-card {
    background: #fff;
    padding: 1.25rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-progress .summary-inner-card {
    position: relative;
    min-height: 100px;
}

.summary-inner-card.with-icon {
    padding-right: 3rem;
}

.summary-icon {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    font-size: 1.1rem;
    color: #9ca3af;
}

.label {
    color: #6b7280;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
    display: block;
}

.progress-header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.score-left {
    font-weight: 700;
    font-size: 1.5rem;
    color: #111827;
}

.score-right {
    font-size: 0.8rem;
    color: #6b7280;
}

.progress-bar {
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar .progress {
    height: 100%;
    background: #10b981;
    border-radius: 4px;
    transition: width 0.3s ease;
}

/* Autres cartes de résumé */
.summary-item:not(.summary-progress) .summary-inner-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100px;
}

.value-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
}

.icon-inline {
    font-size: 1.1rem;
    color: #9ca3af;
}

/* Progress details */
.progress-details {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    cursor: pointer;
    transition: background 0.2s;
}

.progress-header:hover {
    background: #f9fafb;
}

.progress-header h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #111827;
}

.progress-header p {
    margin: 0;
    font-size: 0.85rem;
    color: #6b7280;
}

.progress-header i {
    font-size: 1rem;
    color: #6b7280;
}

.progress-content {
    padding: 1.5rem 2rem 2rem;
    border-top: 1px solid #f3f4f6;
}

/* Modules */
.modules-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
}

.module-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;

    min-height: 420px;
}

.module-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.module-image {
    width: 100%;
    height: 160px;
    object-fit: cover;
}

.module-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.25rem;
}

.module-label {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 0 0 0.5rem 0;
}

.module-title {
    font-weight: 600;
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
    color: #111827;
    line-height: 1.4;
}

.module-desc {
    font-size: 0.85rem;
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: 0px;
    flex: 1;
} 

.progress-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    margin-top: -10px;
}

.progress-left {
    font-weight: 600;
    color: #10b981;
}

.progress-right {
    color: #6b7280;
}

.progress-bar.small {
    height: 10px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
}

.progress-bar.small .progress {
    height: 100%;
    background: #10b981;
}

/* Loading & Error */
.loading,
.error {
    text-align: center;
    padding: 3rem 1rem;
    font-size: 0.95rem;
}

.loading {
    color: #6b7280;
}

.error {
    color: #dc2626;
}

/* Responsive */
@media (max-width: 1024px) {
    .summary-grid {
        grid-template-columns: 1fr 1fr;
    }

    .summary-progress {
        grid-column: 1 / -1;
    }
}

@media (max-width: 768px) {
    .certificate-page {
        padding: 1rem;
    }

    .top-row {
        flex-direction: column;
        gap: 1rem;
    }

    .certificate-buttons {
        justify-content: stretch;
        flex-direction: column;
    }

    .certificate-buttons button {
        width: 100%;
        justify-content: center;
    }

    .summary-grid {
        grid-template-columns: 1fr;
    }

    .modules-container {
        grid-template-columns: 1fr;
    }
}
.progress-right {
    color: #6b7280;
    font-size: 0.8rem;
}

.completed-count {
    color: #111827;
    font-weight: 500;
}

.total-count {
    color: #6b7280;
    font-weight: 400;
}
/* Conteneur principal des cartes */
.modules-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 4 colonnes sur grand écran */
    gap: 20px;
    padding: 24px 0;
}

/* La carte elle-même */
.module-card {
    background: #ffffff;
    border: 1px solid #f0f2f5; /* Bordure très légère comme sur la capture */
    border-radius: 20px;       /* Arrondi de la carte */
    padding: 10px;             /* Espace entre le bord de la carte et l'image */
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;
}

/* L'image à l'intérieur de la carte */
.module-image {
    width: 100%;
    height: 160px;             /* Hauteur fixe pour l'uniformité */
    object-fit: cover;         /* Pour ne pas déformer l'image */
    border-radius: 14px;       /* L'ARRONDI SPÉCIFIQUE DE L'IMAGE */
    margin-bottom: 16px;       /* Espace sous l'image */
}

/* Titre et textes */
.module-label {
    font-size: 12px;
    color: #888;
    margin-bottom: 8px;
    font-weight: 500;
}

.module-title {
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
    line-height: 1.4;
}



/* 3. Le pourcentage en NOIR */
.progress-left {
    color: #1a1a1a; /* Noir intense */
}

/* 4. Le compteur de modules (ex: 1/12) en GRIS */
.progress-right {
    color: #9ca3af; /* Gris clair comme sur la capture */
    font-weight: 500;
}

/* Optionnel : mettre le chiffre actuel en noir aussi si désiré */
.completed-count {
    color: #1a1a1a;
}
</style>