<script>
    import { db } from '#lib/firebase.js';
    import { addDoc, collection } from 'firebase/firestore';
    import { goto } from '$app/navigation';

    let titulo = $state('');
    let desarrollo = $state('');
    let conclusion = $state('');
    let claveSecreta = $state('');
    let enviando = $state(false);
    let errorMsg = $state('');

    async function publicarNoticia(e) {
        e.preventDefault();
        enviando = true;
        errorMsg = '';

        const nuevaPublicacion = {
            titulo,
            desarrollo,
            conclusion,
            fecha: Date.now(),
            autorKey: claveSecreta
        };

        try {
            await addDoc(collection(db, 'noticias'), nuevaPublicacion);
            goto('/');
        } catch (error) {
            errorMsg = 'Clave secreta incorrecta o error de permisos.';
        } finally {
            enviando = false;
        }
    }
</script>

<main class="max-w-2xl mx-auto p-6">
    <a href="/" class="text-sm text-indigo-600 hover:underline">&larr; Volver al blog</a>
    <h1 class="text-3xl font-bold text-slate-900 mt-4 mb-6">Nueva Publicacion</h1>

    {#if errorMsg}
        <div class="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
            {errorMsg}
        </div>
    {/if}

    <form onsubmit={publicarNoticia} class="space-y-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1" for="titulo">Titulo</label>
            <input id="titulo" type="text" bind:value={titulo} required
                class="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
        </div>

        <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1" for="desarrollo">Desarrollo</label>
            <textarea id="desarrollo" rows="6" bind:value={desarrollo} required
                class="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
        </div>

        <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1" for="conclusion">Conclusion</label>
            <textarea id="conclusion" rows="3" bind:value={conclusion} required
                class="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500"></textarea>
        </div>

        <div class="pt-2 border-t border-slate-100">
            <label class="block text-sm font-semibold text-slate-700 mb-1" for="clave">Clave</label>
            <input id="clave" type="password" bind:value={claveSecreta} required placeholder="Ingresa tu codigo secreto"
                class="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500">
        </div>

        <button type="submit" disabled={enviando}
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">
            {enviando ? 'Publicando...' : 'Publicar Noticia'}    
        </button>
    </form>
</main>