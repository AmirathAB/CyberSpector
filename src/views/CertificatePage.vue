<template>
    <div class="certificate-top-card">

        <!-- Ligne du haut -->
        <div class="top-row">
            <!-- Header à gauche -->
            <div class="certificate-header">
                <h2>Mon certificat</h2>
                <h2>Résumé de la certification</h2>
                <p>Retrouvez les détails de votre progression et les informations essentielles.</p>
            </div>

            <!-- Barre utilisateur à droite -->
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

        <!-- Ligne du bas : boutons -->
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
    <!-- Résumé -->
    <div class="certificate-summary-card">
        <div class="summary-grid">

            <!-- Progression -->
            <div class="summary-item summary-progress">
                <div class="summary-inner-card">
                    <p class="label">Progression</p>
                    <div class="progress-bar">
                        <div class="progress" :style="{ width: progressPercent + '%' }"></div>
                    </div>
                    <p class="value">{{ completedModules }}/{{ totalModules }} modules</p>
                </div>
            </div>

            <!-- Cyberscore -->
            <div class="summary-item">
                <div class="summary-inner-card">
                    <p class="label">Cyberscore de certification</p>
                    <p class="value">100%</p>
                </div>
            </div>

            <!-- Quiz -->
            <div class="summary-item">
                <div class="summary-inner-card">
                    <p class="label">Score moyen des quiz</p>
                    <p class="value">100%</p>
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

        <div v-if="isOpen" class="progress-content">
            <!-- Ici tu peux mettre le contenu détaillé, par ex les modules -->
            <p>Ici apparaîtront tous les détails de votre progression...</p>
        </div>
    </div>
    <div class="modules-container">
        <div v-for="module in modules" :key="module.id" class="module-card">
            <img :src="module.image" alt="Module Image" class="module-image" />
            <div class="module-content">
                <p class="module-label">Module {{ module.id }} • {{ module.duration }} min</p>
                <h4 class="module-title">{{ module.title }}</h4>
                <p class="module-desc">{{ module.description }}</p>

                <!-- Barre + texte regroupés dans un wrapper pour les pousser en bas -->
                <div class="progress-wrapper">
                    <span class="progress-left">{{ module.progress }}%</span>
                    <span class="progress-right">{{ module.completed }}/{{ module.total }} modules</span>
                </div>

                <div class="progress-bar small">
                    <div class="progress" :style="{ width: module.progress + '%' }"></div>
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
            isOpen: false, // état de l'accordion
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
        }
    },
    async mounted() {
        try {
            const response = await axios.get('https://dummyjson.com/posts');
            this.modules = response.data.posts.slice(0, 4).map((post) => ({
                id: post.id,
                title: post.title,
                description: post.body,
                duration: 16,
                image: `https://picsum.photos/300/200?random=${post.id}`,
                progress: Math.floor(Math.random() * 100),
                completed: Math.floor(Math.random() * 4) + 1,
                total: 12
            }));
        } catch (error) {
            console.error('Erreur API:', error);
        }
    }
};
</script>


<style scoped>
.certificate-page {
    font-family: 'Inter', sans-serif;
    padding: 2rem;
    background: #f9fafb;
}

.certificate-top-card {
    background: #fff;
    padding: 1.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
}

/* Ligne du haut */
.top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}

/* Header */
.certificate-header h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.certificate-header p {
    color: #6b7280;
    font-size: 0.9rem;
}

/* User info */
.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
}

.user-text {
    display: flex;
    flex-direction: column;
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
}

.user-badge {
    background: #e0f2fe;
    /* bleu ciel */
    color: #0284c7;
    font-size: 0.7rem;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
}

.user-email {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.15rem;
}

/* Boutons */
.certificate-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.5rem;
}

.btn-view {
    background: #fff;
    /* border: 1px solid #3b82f6;*/
    color: #070707;
    padding: 0.45rem 1rem;
    border-radius: 8px;
    cursor: pointer;
}

.btn-download {
    background: #10b981;
    color: #fff;
    border: none;
    padding: 0.45rem 1rem;
    border-radius: 8px;
    cursor: pointer;
}

/* Résumé */
.certificate-summary {
    display: flex;
    gap: 1rem;
    margin: 1rem 0 2rem;
    flex-wrap: wrap;
}

.summary-card {
    background: #fff;
    flex: 1 1 30%;
    min-width: 180px;
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.summary-card .label {
    color: #6b7280;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
}

.certificate-header h2:nth-child(2) {
    margin-top: 2rem;
    /* ajuste la valeur selon ton besoin */
}

.summary-card .value {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 0.5rem;
}

.progress-bar {
    height: 6px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.progress-bar .progress {
    height: 100%;
    background: #10b981;
    border-radius: 4px;
}

/* Modules */
.modules-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.module-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.module-image {
    width: 100%;
    height: 140px;
    object-fit: cover;
}

.module-content {
    padding: 1rem;
}

.module-label {
    font-size: 0.75rem;
    color: #6b7280;
}

.module-title {
    font-weight: 600;
    margin: 0.25rem 0;
}

.module-desc {
    font-size: 0.85rem;
    color: #374151;
    margin-bottom: 0.5rem;
}

.progress-bar.small {
    height: 4px;
    background: #e5e7eb;
    border-radius: 4px;
    margin-bottom: 0.25rem;
}

.progress-bar.small .progress {
    background: #10b981;
}

.progress-text {
    font-size: 0.75rem;
    color: #374151;
}

/* Boutons */
.certificate-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.btn-view {
    background: #fff;
    border: 1px solid #3b82f6;
    color: #3b82f6;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
}

.btn-download {
    background: #10b981;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
}

.certificate-buttons button {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.85rem;
}

/* Grille avec proportions */
.summary-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    /* progression plus large */
    gap: 1rem;
}

/* Card parent (optionnel si tu veux un fond général) */
.certificate-summary-card {
    margin: 1rem 0 2rem;
}

/* Card interne pour chaque bloc */
.summary-inner-card {
    background: #fff;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
}

/* Progression alignée à gauche */
.summary-progress .summary-inner-card {
    text-align: left;
}

/* Labels et valeurs */
.label {
    color: #6b7280;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
}

.value {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 0.5rem;
}

/* Progress bar */
.progress-bar {
    height: 6px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
}

.progress-bar .progress {
    height: 100%;
    background: #10b981;
    border-radius: 4px;
}

/* Responsive mobile */
@media (max-width: 768px) {
    .summary-grid {
        grid-template-columns: 1fr;
    }

    .summary-progress .summary-inner-card,
    .summary-item .summary-inner-card {
        text-align: left;
    }
}

.summary-item:nth-child(2) .summary-inner-card {
    min-height: 95px;
    /* augmente la hauteur */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* centre verticalement le contenu */
}

.summary-item:nth-child(3) .summary-inner-card {
    min-height: 95px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.progress-details {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin: 1rem 0;
    overflow: hidden;
}

.progress-header div {
    display: flex;
    flex-direction: column;
    /* titre + description en colonne */
}

.progress-header {
    display: flex;
    justify-content: space-between;
    /* texte à gauche, icône à droite */
    align-items: center;
    padding: 1rem;
    cursor: pointer;
}

.progress-header h3 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
}

.progress-header p {
    margin: 0;
    font-size: 0.85rem;
    color: #6b7280;
}

.progress-header i {
    font-size: 0.85rem;
    color: #6b7280;
}

/* Contenu déroulable */
.progress-content {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    font-size: 0.9rem;
    color: #374151;
}

.module-desc {
    font-size: 0.85rem;
    color: #374151;
}

.modules-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

/* Force toutes les cartes à avoir la même hauteur */
.module-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    height: 100%;
    /* sera défini par le parent grid */
}

/* Contenu de la carte en colonne */
.module-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    /* prend tout l'espace disponible */
    padding: 1rem;
}

/* Texte descriptif */
.module-desc {
    margin-bottom: 0.75rem;
}

/* Barre de progression + texte en bas */
.progress-wrapper {
    margin-top: auto;
    /* pousse en bas */
}

.progress-wrapper {
    display: flex;
    justify-content: space-between;
    /* élément gauche / élément droit */
    align-items: center;
    margin-bottom: 0.25rem;
    /* espace avant la barre */
    font-size: 0.75rem;
    color: #374151;
}

.progress-left {
    /* optionnel : style spécifique pour le % */
}

.progress-right {
    /* optionnel : style spécifique pour completed/total */
}

.progress-bar.small {
    height: 4px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
}

.progress-bar.small .progress {
    height: 100%;
    background: #10b981;
}
</style>
