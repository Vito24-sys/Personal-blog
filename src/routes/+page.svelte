<script>
  import { onMount } from 'svelte';
  import { db } from '#lib/firebase';
  import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

  let noticias = $state([]);
  let cargando = $state(true);

  onMount(async () => {
    try {
      const q = query(collection(db, 'noticias'), orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      noticias = querySnapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
    } catch (error) {
      console.error("Error cargando noticias:", error);
    } finally {
      cargando = false;
    }
  });

  async function eliminarNoticia(id) {
    const clave = prompt("Ingresa la clave secreta de autor para eliminar esta noticia:");
    if (!clave) return;

    try {
      const docRef = doc(db, 'noticias', id);
      
      // 1. Validar la clave en Firebase mediante update
      await updateDoc(docRef, { autorKey: clave });
      
      // 2. Si pasó la validación, eliminar el documento
      await deleteDoc(docRef);
      
      // 3. Quitarla de la pantalla al instante
      noticias = noticias.filter(n => n.id !== id);
    } catch (error) {
      alert("Clave secreta incorrecta o error al eliminar.");
    }
  }
</script>

<main class="max-w-3xl mx-auto p-6 font-sans text-slate-800">
  <header class="border-b border-slate-200 pb-6 mb-8 flex justify-between items-center">
    <div>
      <h1 class="text-4xl font-extrabold tracking-tight text-slate-900">Personal Blog</h1>
      <p class="text-slate-500 mt-1">Actualizaciones, ideas y novedades</p>
    </div>
    <a href="/publicar" class="text-sm text-slate-400 hover:text-slate-700 transition">
      Acceso Autor
    </a>
  </header>

  {#if cargando}
    <p class="text-center text-slate-500">Cargando publicaciones...</p>
  {:else if noticias.length === 0}
    <p class="text-center text-slate-500">Aún no hay noticias publicadas.</p>
  {:else}
    <div class="space-y-8">
      {#each noticias as noticia (noticia.id)}
        <article class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div class="flex justify-between items-start">
            <span class="text-xs font-medium text-indigo-600 uppercase tracking-wider">
              {new Date(noticia.fecha).toLocaleDateString()}
            </span>
            <button
              onclick={() => eliminarNoticia(noticia.id)}
              class="text-xs text-slate-400 hover:text-red-600 transition cursor-pointer"
              title="Eliminar publicación"
            >
              Eliminar
            </button>
          </div>

          <h2 class="text-2xl font-bold text-slate-900 mt-1 mb-4">{noticia.titulo}</h2>
          
          <div class="text-slate-700 leading-relaxed whitespace-pre-line mb-4">
            {noticia.desarrollo}
          </div>

          <div class="bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
            <h3 class="text-xs font-bold uppercase text-slate-500 mb-1">Conclusión</h3>
            <p class="text-slate-800 font-medium">{noticia.conclusion}</p>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</main>