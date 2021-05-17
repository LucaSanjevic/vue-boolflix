/*Milestone 1:Creare un layout base con una searchbar (una inpute un button) in cui possiamoscrivere completamente 
o parzialmente il nome di unfilm. Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò 
che ha scritto l’utente.Vogliamo dopo la risposta dell’API visualizzare aschermo i seguenti valori per ognifilm
 trovato: 1.Titolo2.Titolo Originale3.Lingua4.Voto
 
 
 Milestone 2:Trasformiamo la stringa statica della lingua in 
 una vera e propria bandiera dellanazione corrispondente, gestendo il caso in cui nonabbiamo la bandiera dellanazione
ritornata dall’API (le flag non ci sono inFontAwesome).Allarghiamo poi la ricerca anche alle serie tv. Conla stessa azione di ricercadovremo prendere sia i film che corrispondono allaquery, sia le serie tv, standoattenti
ad avere alla fine dei valori simili (le seriee i film hanno campi nel JSON dirisposta diversi, simili ma non sempre 
identici)Qui un esempio di chiamata per le serie tv:https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs


Milestone 3:In questa milestone come prima cosa aggiungiamo lacopertina del film o della serieal nostro elenco. Ci viene 
passata dall’API solo laparte finale dell’URL, questoperché poi potremo generare da quella porzione diURL tante dimensioni
diverse.Dovremo prendere quindi l’URL base delle immaginidi TMDB:https://image.tmdb.org/t/p/per poi aggiungere ladimensione 
che vogliamo generare(troviamo tutte le dimensioni possibili a questo 
link:https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400)per poi aggiungere laparte finale dell’URL passata dall’API.
Esempio di URL:https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.pngTrasformiamo poi il voto da 1 a 10 decimale 
in unnumero intero da 1 a 5, così dapermetterci di stampare a schermo un numero di stellepiene che vanno da 1 a 5,lasciando
le restanti vuote (troviamo le icone inFontAwesome).Arrotondiamo sempre per eccesso all’unità successiva,non gestiamo icone
 mezzepiene (o mezze vuote :P)


Milestone 4:Trasformiamo quello che abbiamo fatto fino ad orain una vera e propria webapp,creando un layout completo simil-Netflix:●Un header che contiene logo e search bar●Dopo aver ricercato qualcosa nella searchbar, i risultatiappaiono sotto formadi “card” in cui lo sfondo è rappresentato dall’immaginedi copertina (consigliola poster_path con w342)●Andando con il mouse sopra una card (on hover), appaionole informazioniaggiuntive già prese nei punti precedenti più la overvi
*/


let root = new Vue({
    el: '#root',
    data: {
       textToSearch: "",
       tmdbApiKey: "24122077501f60eb4b1e3e8b3dc636ce",
       moviesList: [],
       seriesList: [],
       loading: false,
       currentMovie: null
    },
    methods: {
        makeAxiosSearch(searchType) {
          const axiosOptions = {
            params: {
              api_key: this.tmdbApiKey,
              query: this.thisSearch,
              language: "it-IT"           
            }
          };

            axios.get("https://api.themoviedb.org/3/search/" + searchType, axiosOptions)
          .then((resp) => {
            if(searchType === "movie") {
              this.movieList = resp.data.results;


            } else if(searchType === "tv")
            this.seriesList = resp.data.results.map((tvShow) => {
              tvShow.original_title = tvShow.original_name
              tvShow.title = tvShow.name
              return tvShow;
            })
        });
        },

        getFlag(movie) {
          const flagsMap = {
            en: "us"
          };
          if (flagsMap[movie.original_language]) {
            return flagsMap[movie.original_language];
          } else {
            return movie.original_language;
          }
        },

        getImgSrc(movie) {
          if(movie.poster_path) {
            return 'https://image.tmdb.org/t/p/w154${movie.poster_path}';
          } else {
            return "../assets/poster_placeholder.png"
          }
        },

        getMovieStars(movie) {
          const MovieVote = Math.round(movie.vote_average / 2)
          const toReturn = []

          for (let i=0; i<=5; i++) {
            toReturn.push(i <= movieVote)
          }
          return toReturn
        },

        doSearch() {
          this.makeAxiosSearch("movie")
          this.makeAxiosSearch("tv")
        }
        }
      });

      