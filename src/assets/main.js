//El link obtenido sera colocado en una variable llamada API
const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UC-9FY3MCVjvVTLTI7R6gGvQ&part=snippet%2Cid&order=date&maxResults=9";


 /*
 Esta expresión se usa para asignar el resultado de 
document.getElementById("content") a 
la variable content, pero si no se encuentra 
ningún elemento con el id "content", se asignará el valor null a content. */
  const content=null|| document.getElementById("content");
  const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ee694c43camsh511d5c86155f028p1863b5jsnf4df2785687d",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
async function fetchData(urlAPI) {
  //En algunos casos ademas de esperar la urlAPI tambien espera options
  //el cual nos provee la api
  const response = await fetch(urlAPI, options);
  const data = await response.json();
  return data;
}

//Creo una funcion se que llama asi mismo
(async () => {
  try {
    const videos = await fetchData(API);
	/*Presta mucha atencion, lo que haremos sera crear un arreglo map
	donde cada video tendra su propia porcion de codigo, es como si quisiera
	multiplicar el codigo las veces quiera para que cada video
	tenga su titulo, su imagen, su descripcion,etc*/
    let view = `
        ${videos.items.map(video=>`
		<div class="group relative">
		<div
		  class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
		  <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
		</div>
		<div class="mt-4 flex justify-between">
		  <h3 class="text-sm text-gray-700">
			<span aria-hidden="true" class="absolute inset-0"></span>
			${video.snippet.title}
		  </h3>
		</div>
	  </div>
		
		`).slice(0,5).join('')} 
		
		`;
		//Aca es donde lo agregamos al html, con el elemento content
		content.innerHTML=view;
  } catch(error) {
	console.log(error); //Averiga como colocar los errores por pantalla
  }
})(); //De esta manera la funcion se llamara asi misma automaticamente

//Esto es parte de lo que me entrega el codigo de la API, no lo vamos a usar
//usaremos nuestros propios metodos para llamar a la API
// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
