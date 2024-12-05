//información cargada Mas info de la zona
import { barrioJardin,villaElvira,parqueCasteli,Tolosa,LosHornos,estadioMaradona,barrioNorte,Ringuelet 
    ,villaArg,parqueSM, sanCarlos,ciudad,cementerio
    } from "./zonas.js";
    //Carga del combobox2 dinamica
    import { Select2 } from "./combobox.js";
    //Me fijo que idioma fue selecciono mediante localStorage
    var idioma = localStorage.getItem("IDIOMA");
    if (idioma == undefined)  idioma="ES";
    let itvwszone;[]; //entrevistas por zona
    var titulos=[]; //Nombre de los entrevistados
    let introtext;
    let infoTranslate = ['Interview to','From'];
    //Cambio de idioma
    if (idioma == "EN"){
        for (var i = 0; i < titulos.length; ++i) {
            titulos[i]="Press enter to listen to the interview from "+titulos[i].nombre;
        }
        console.log('estoy en ingles');
        //Cambio info a ingles
        //titulo del mapa
        searchID('inicio').innerHTML='<h1>Interviewees map</h1>';
        //Cambio de idioma boton
        document.getElementsByClassName('button')[0].innerHTML='Language';
        document.getElementsByClassName('button')[0].setAttribute('aria-label','Click to change the language of the page');
        //Informacion de 1 entretvistado
        searchID('title-info').innerHTML='Access to the interview';
        searchID('tituloinicial').innerHTML='Select a person on the map to get more information about it.';
        searchID('boton').setAttribute('aria-label','Press enter to return to the map.');
        searchID('boton').innerHTML='Back to the map';    
        //Buscadores combo
        searchID('comboSearch1').innerHTML='<h2>Select the area you want to search</h2>';
        searchID('comboSearch2').innerHTML='<h2>Select the name of a person</h2>';
        //mas info de la zona
        searchID('accordion-open-1').innerText='More information about from the zone';
    }
    else if (idioma == "ES"){
        for (var i = 0; i < titulos.length; ++i) {
            titulos[i]="Presiona enter para escuchar la entrevista de "+titulos[i].nombre;
        }
        searchID('inicio').innerHTML='<h1>Mapa de entrevistados</h1>';
        console.log('estoy en español');
        introtext='A continuación se listan'+titulos.length+'entrevistas en el mapa de entrevistados';
        //Cambio de info a español
        //Titulo del mapa
        searchID('inicio').innerHTML='Mapa de entrevistados';
        searchID('inicio').setAttribute('aria-label','A continuación se listan entrevistas en el mapa de entrevistados.');
        //Cambio de idioma
       // document.getElementsByClassName('button')[0].innerHTML='Idioma';
        //Informacion de 1 entretvistado
        searchID('title-info').innerHTML='Acceso a la entrevista';
        searchID('tituloinicial').innerHTML='Seleccione alguna persona dentro del mapa para obtener mas información de la misma.';
        searchID('label1').innerHTML='<h1>Entrevista a</h1>';
        searchID('label2').innerHTML='<h1>De</h1>';
        searchID('boton').setAttribute('aria-label','Presione enter para volver al mapa');
        searchID('boton').innerHTML='Volver al mapa';
        searchID('accordion-open-1').innerText='Mas información de la zona';
    }
    
    //Create my map 
    var mymap = L.map('mapid').setView([-34.91018,-57.94452], 12);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWl6enkyMDIiLCJhIjoiY2t0aHVtNWI0MHZuODJ3dWU2OGdjZjBxMiJ9.Z5oB_qULFlnOpBwo10mT-A'
    }).addTo(mymap);
    
    //Add geojson 
    L.geoJSON(zonas).addTo(mymap)
    
    //Create an icon 
    var LeafletIcon = L.Icon.extend({
        options: {
            iconSize: [38,95],
            iconAnchor: [22,94],
            popupAnchor: [3,76]
        }
    })
    
    //Functions
    function toggleText(id) {
       var el = searchID(id);
       if (idioma == "ES") 
       {
           el.firstChild.data = "Volver al mapa";
       }
       else 
       {
         el.firstChild.data = "Go back to map";
       }
    }
    
    const hideMaker = function(titulos){
        console.log('hideMaker its running!!!');
        let elements = document.querySelectorAll(".leaflet-marker-icon");
        for (var i = 0; i < elements.length; ++i) {
            elements[i].setAttribute("alt", titulos[i].nombre);
            elements[i].setAttribute("data-nombre",titulos[i].nombre);
            elements[i].setAttribute("data-zona",titulos[i].zona);
            elements[i].setAttribute("aria-label", "Haga click en "+titulos[i].nombre+" para acceder a su entrevista");
            elements[i].setAttribute("role", "image");
            elements[i].setAttribute("tabindex", i+2); //traslado 1 por titulo de pagina y boton
            } 
    }
    // ori prueba esconder los controles de zoom
    const hideZoomControl = function(){
        console.log('hideZoomControl its running!!!');
        let elementos = document.querySelectorAll(".leaflet-control a");
        elementos.forEach(item => {
            item.setAttribute("aria-hidden", "true")
            item.setAttribute("tabindex", "-1");//no lo enfoques
        })
    }
    
    /*****
     * link: contiene url de youtube
     ****/
    function searchID(id){
        return document.getElementById(id);
    }
    /***
     * Divide el texto pasado por parametro en un arreglo de cadenas
     */
    function decompose(text,separador){
        return text.split(separador);
    }
    function noNull (item){
        return (item != null)
    }
    function idiomaEspañol(){
        return (idioma == "ES")
    }
    
    /*Carga la informacion del entrevistado y la zona donde vive*/ 
    function assignedText(cadena){
        if (noNull(cadena)){
            var t;
            for (var i=0; i < cadena.length; i++) {
                t=searchID('label'+(i+1));
                t.setAttribute('tabindex','0');
                if (cadena[i]!==''){
                    if (idioma=="ES"){
                        if(i==0) t.innerText='Entrevista a';
                        else t.innerText='De';
                    }
                    else {
                        if(i==0) t.innerText=infoTranslate[0];
                        else t.innerText=infoTranslate[1];
                    }
                    t.innerText= t.innerText+' '+cadena[i].replace("-"," ");    //Agregado para reemplazar el guion por un espacio
                }
            }
            //Inserto los cambios de la informacion de la zona
            var zone = searchID('accordion-section-1');
            if (idiomaEspañol){
                switch (cadena[1]) {
                    case "Los Hornos":  zone.innerHTML = LosHornos ;break;
                    case "Villa Elvira": zone.innerHTML = villaElvira; break;
                    case "Barrio Jardin": zone.innerHTML = barrioJardin; break;
                    case "Tolosa": zone.innerHTML = Tolosa; break;
                    case "Estadio Maradona": zone.innerHTML = estadioMaradona; break;
                    case "Parque Castelli":  zone.innerHTML = parqueCasteli; break;
                    case "Barrio Norte": zone.innerHTML = barrioNorte; break;
                    case "Ringuelet": zone.innerHTML = Ringuelet; break;
                    case "Villa Argüello": zone.innerHTML = villaArg; break;
                    case "Parque San Martin": zone.innerHTML = parqueSM; break;
                    case "San Carlos": zone.innerHTML = sanCarlos; break;
                    case "Cementerio": zone.innerHTML = cementerio; break;
                    case "Recorrido por la ciudad": zone.innerHTML = ciudad; break;
                }
            }
            t=searchID('label1');
            t.focus(); //Al finalizar, realizo el focus al titulo nombre!
        }
        return;
    }
    /*Agrega a la variable titulos el nombre de la persona + zona */
    var agregoNombre = function(texto){
        var cadena = decompose(texto,".");
        if (noNull(cadena)){
            let reg = {nombre:cadena[0],zona:cadena[1]};
            titulos.push(reg);  
            return cadena[0]
        }
    } 
    /**
     * Limpia los hijos de listbox2 en el caso de que hubiera algo cargado anteriormente
     * Nota de yani: esta funcion deberia ser invocada del combobx2.js
     */
    function clearListbox2(){
        console.log("clearList2");
        var elemBefore = document.getElementById('listbox2');
        console.log(elemBefore);  
        while (elemBefore.hasChildNodes())
          elemBefore.removeChild(elemBefore.firstChild);
      }
    function clearCombo2(){
        const selectEls = document.querySelectorAll('.js-select2');
        var elemChild = document.getElementById('combo2');
        elemChild.remove();
        const crearCombo = document.createElement('div'); 
        crearCombo.setAttribute('aria-controls','listbox'); 
        crearCombo.setAttribute('aria-expanded','false');
        crearCombo.setAttribute('aria-haspopup','listbox');
        crearCombo.setAttribute('aria-labelledby','combo1-label');
        crearCombo.setAttribute('id','combo2');
        crearCombo.setAttribute('class','combo-input');
        crearCombo.setAttribute('role','combobox');
        crearCombo.setAttribute('tabindex','1');
        if (selectEls != null)
            selectEls[0].appendChild(crearCombo);
    }
    /**
     * Cargo opciones al segundo combobox 
     * @param {*} itvwszone  entrevistados de zona seleccionada por filterMarker
     */
     function cargaElementos(...itvwszone){
        clearListbox2();
        clearCombo2();
        //Agrego la opcion "Todos los nombres"
        itvwszone.unshift('Todos los nombres');
        console.log(itvwszone);
        const selectEls = document.querySelectorAll('.js-select2');
        selectEls.forEach((el) => {
            new Select2(el, itvwszone);
        });   
    }
    /**
     * agrega a alt el numero de entrevistas.. 1 de 4, 2 de 4.. etc
     * @param {*} itvwszone  entrevistados de zona seleccionada por filterMarker
     */
    function renameMarker(...itvwszone){
        var add;
        for (let i = 0; i < itvwszone.length; ++i) {
            add = "Haga click en "+itvwszone[i].alt+" para acceder a su entrevista.";
            add = add+' '+(i+1)+' de '+itvwszone.length+'.';
            itvwszone[i].setAttribute('aria-label',add); 
        }
    }
    /**
     * Elimina o esconde aquellos marcadores que no pertenecen a la zona opcionName
     * @param {*} opcionName opcion seleccionada por evento
     * @param {*} opcList  boolean indica en el listbox que estoy posicionado: false-listbox1 true-listbox2
     * @returns 
     */
    let currentZone = ""; //Zona actual, esto es para mantener los nombres de ese lugar
    export function filterMarker(opcionName,opcList){
        console.log('filterMarker with option: '+opcionName);
        let elements = document.querySelectorAll(".leaflet-marker-icon");
        itvwszone=[]; //vacio mi array
        let j=0;
        if ((!opcList)||(opcionName=="Todos los nombres")){ //listbox 1 POR ZONA o bien se eligió en combo2 todos los nombres
            if (!opcList) currentZone = opcionName; //update zone
            for (let i = 0; i < elements.length; ++i) {
                if ((currentZone == elements[i].dataset.zona)||(currentZone == 'Todas las zonas')){ //marcadores que SI PERTENECEN A LA ZONA se vuelven a mostrar
                    elements[i].setAttribute("tabindex", i+2); 
                    elements[i].style.visibility='visible';
                    itvwszone[j]=elements[i];
                    j++;
                }
                else{ //Los marcadores que NO sean de la ZONA se esconden
                    elements[i].setAttribute("tabindex", '-1');
                    elements[i].style.visibility='hidden';
                }
            }
        }
        else{ //listbox 2 POR NOMBRE
            for (let i = 0; i < elements.length; ++i) {
                if (opcionName == elements[i].dataset.nombre){ //marcador que COINCIDEN CON EL NOMBRE se muestra
                    elements[i].setAttribute("tabindex", i+2); 
                    elements[i].style.visibility='visible';
                    itvwszone[j]=elements[i];
                    j++;
                }
                else{ //Los marcadores que NO COINCIDAN CON EL NOMBRE se esconden
                    elements[i].setAttribute("tabindex", '-1');
                    elements[i].style.visibility='hidden';
                }
            }
        }
        renameMarker(...itvwszone); 
        if (!opcList) //si es listbox1 cargo elementos al 2
            cargaElementos(...itvwszone);
        return j; //si retorna 0 es que no hubo coincidencias
    }
    /*
    * De acuerdo al boolean que le pase esconde o muestra los botones del media player 
    * opcion T: esconde
    * opcion F: muestra
    */
    function hideMediaplayer(opcion){
        if (opcion == true){
            let media_btn = document.getElementsByClassName('px-video-restart')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-rewind')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-play')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-pause')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-forward')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-mute')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-volume')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-btnCaptions')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
            media_btn = document.getElementsByClassName('px-video-btnFullScreen')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','-1');
        }
        else{
            let media_btn = document.getElementsByClassName('px-video-restart')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-rewind')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-play')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-pause')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-forward')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-mute')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-volume')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-btnCaptions')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
            media_btn = document.getElementsByClassName('px-video-btnFullScreen')[0];
            if (noNull(media_btn)) media_btn.setAttribute('tabindex','1');
        }
    }
    
    /***
     * Crea un marcador con sus respectivas funciones - Mientras agrega el marcador agrega a titulos el nombre de la persona (agregoNombre)
     */
    var nro=1;
    var createMarker = function (latlng,texto,link){
        var marker = L.marker(latlng,{icon:new LeafletIcon({iconUrl: 'media/makers/avatar'+(nro++)+'.png'})
            }).bindTooltip(agregoNombre(texto)).openTooltip().addTo(mymap);
        //Añado función click a medida que se crea cada marcador
        marker.on('click',function(e){ 
            searchID('info').setAttribute('aria-hidden','false');
            var textoinicio = document.getElementById('tituloinicial');
            if (textoinicio != null) textoinicio.remove();    
            //Hago visible toda la info
            searchID('label1').style.visibility='visible';
            searchID('label2').style.visibility='visible';
            searchID('accordionGroup').style.visibility='visible';
            searchID('separator').style.visibility='visible';
            hideMediaplayer(false);
            var cadena = decompose(texto,".");  
            assignedText(cadena); //+da focus al titulo de la info entrevistado
            console.log("Estoy en función click!!");
            var d = searchID('video'); 
            d.src = link;
            //funcion click del boton volver al mapa - Aca colocp los tabindex en -1 para que no enfoque hasta el siguiente click/enter del avatar
            var markerFocus = function (){
                e.target._icon.focus();
                //Hide info - crear funcion despues
                searchID('label1').setAttribute('tabindex','-1'); //esconde 'Entrevista a'
                searchID('label2').setAttribute('tabindex','-1'); //esconde 'De'
                searchID('accordionGroup').setAttribute('tabindex','-1'); //esconder acordeon  no esta funcionando
                searchID('accordion-open-1').setAttribute('tabindex','-1');
                searchID('separator').setAttribute('tabindex','-1'); //esconde el separador
                //falta esconder controles del mediaplayer (ver)
                hideMediaplayer(true);
                searchID('boton').setAttribute('tabindex','-1'); //esconde el boton
                //para el ultimo caso
                if (e.target._icon.alt == titulos[titulos.length-1].nombre) searchID('inicio').focus(); //para el ultimo marcador se va al inicio de la pagina 
                console.log("markerFocus - volviendo al mapa..");
            };
            //Añadir boton "volver al mapa"
            let boton = document.getElementById('boton');
            boton.addEventListener('click',markerFocus.bind(e));
            boton.style.visibility='visible';
            boton.setAttribute('tabindex','0'); //reaparece boton
            boton.setAttribute('role','button');
            boton.setAttribute('aria-label','Haga click para volver al mapa.')
        })
    } 
    
    //Createm markers 31
    //Nota: los avatars estan ordenados
    createMarker([-34.943566, -57.958339],`Benitez-Gabriela.Parque Castelli`,'https://www.youtube-nocookie.com/embed/soOpuil5wUE');
    createMarker([-34.9198281,-57.9932087],'Carzolio-Clara.Estadio Maradona',"https://www.youtube-nocookie.com/embed/hvaxlzvXzD0");
    createMarker([-34.957986, -57.977000],'Dominguez-Lujan.Los Hornos',"https://www.youtube-nocookie.com/embed/xMsulCuXbzE");
    createMarker([-34.9066386,-57.9902729],'Fernandez-Alejandro.Tolosa',"https://www.youtube-nocookie.com/embed/Mx8G8MVKHlw");
    createMarker([-34.942394, -57.948540],'Galicchio-Maria.Parque Castelli',"https://www.youtube-nocookie.com/embed/6Ku2FsqhZpk");
    createMarker([-34.902690, -57.977697],'Gomez-Carlos.Tolosa',"https://www.youtube-nocookie.com/embed/lEdAOhCxYSM"); 
    createMarker([-34.886737, -57.984030],'Gutierrez-Lucas.Ringuelet',"https://www.youtube-nocookie.com/embed/1UPKiEjtW1Q");
    createMarker([-34.926702, -57.911197],'Maria-Paola.Barrio Jardín',"https://www.youtube-nocookie.com/embed/jjJGHYKDT9o");
    createMarker([-34.907296, -57.963152],'McAdden-Betina.Barrio Norte',"https://www.youtube-nocookie.com/embed/svQNoCM9pHg");
    createMarker([-34.9943373,-58.0244091],'Mendoza-Azucena.Los Hornos',"https://www.youtube-nocookie.com/embed/4MBOEkUH9Mo");
    createMarker([-34.960042, -57.875716],'Purdier-Victor.Villa Elvira',"https://www.youtube-nocookie.com/embed/DwUbCXCkaIg");
    createMarker([-34.9133353,-57.9974407],'Rivas-Silvia.Estadio Maradona',"https://www.youtube-nocookie.com/embed/1WP1W96Fns8");
    createMarker([-34.896274, -57.981307],'Suarez-Amina.Tolosa',"https://www.youtube-nocookie.com/embed/HDtDyx0Uww4");
    createMarker([-34.959605,-57.9613525],'Fariña-Marily.Cementerio',"https://www.youtube-nocookie.com/embed/WCCOXnGFBls"); 
    createMarker([-34.8762545,-57.9770232],'Roman-Leandro.Ringuelet',"https://www.youtube-nocookie.com/embed/5k4Z8lGudNo");
    createMarker([-34.9372233,-57.9218632],'Carroza-Romina.Villa Elvira',"https://www.youtube-nocookie.com/embed/r2qwWyhE-Xg"); 
    createMarker([-34.9498869,-57.9549036],'Barrionuevo-Olga.Parque Castelli',"https://www.youtube-nocookie.com/embed/qj--HhxZ1lw"); 
    createMarker([-34.915850, -57.981716],'Otero-Natalia.Estadio Mardona',"https://www.youtube-nocookie.com/embed/9yPD1QOYxz0"); 
    createMarker([-34.9357886,-57.9694307],'Eugenia y Francisco.Parque San Martin',"https://www.youtube-nocookie.com/embed/jA1pyovZ6xk"); //-
    createMarker([-34.8867716,-57.9622399],'Lasagna-Lautaro.Tolosa',"https://www.youtube-nocookie.com/embed/HpJsHXvyQEY");
    createMarker([-34.9815602,-57.9980396],'Nancy.Los Hornos',"https://www.youtube-nocookie.com/embed/9F_vdUi92Vk"); 
    createMarker([-34.9387769,-58.0006605],'Eufrasia-Rosa.San Carlos',"https://www.youtube-nocookie.com/embed/yril2F5RECk");  
    createMarker([-34.8882634,-57.9967287],'Suarez-Santiago.Ringuelet',"https://www.youtube-nocookie.com/embed/Gxw4ZX4WbDk"); 
    createMarker([-34.9121917,-57.9715592],'Sonetti-Gisela.Plaza Belgrano',"https://www.youtube-nocookie.com/embed/Alhj0XJBBdw"); 
    createMarker([-34.906651,-57.9273567],'Muller-Cristina.Villa Argüello',"https://www.youtube-nocookie.com/embed/89B6DcKs_wA"); 
    createMarker([-34.9127042,-57.9967508],'López-Even.Recorrido por la ciudad',"https://www.youtube-nocookie.com/embed/uZo_eMLfC0Y");  
    createMarker([-34.9272331,-57.9026227],'Padin-Marcela.Barrio Jardín',"https://www.youtube-nocookie.com/embed/0XG4HLbB-gA"); 
    createMarker([-34.9312245,-57.9079159],'Gutierrez-Macarena.Barrio Jardín',"https://www.youtube-nocookie.com/embed/QNujkWQnK1c"); 
    createMarker([-34.9467235,-57.9638634],'Becerra-Paula.Parque Castelli',"https://www.youtube-nocookie.com/embed/0L7sP6okiDA"); 
    createMarker([-34.8811729,-57.9839683],'Obineta-Gladys.Ringuelet',"https://www.youtube-nocookie.com/embed/jWHY-EING28");
    createMarker([-34.9890184,-57.8532666],'Cárcamo-Estefania.Villa Sicardi',"https://www.youtube-nocookie.com/embed/M8x3j7Sjrmg"); 
    
    hideZoomControl();
    hideMaker(titulos);
    //enfoca primero el titulo de la página
    searchID('inicio').focus();