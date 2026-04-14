Sprint00 - Hotfix
 
CSH-0 Issue: Feedback Anónimo
El apartado de "Dejanos tu opinión" solo funciona con usuarios autentificados y no con anónimos. Las respuestan solo van a supabase si son autentificados, si son anónimos no se guardan en la base de datos, lo cual no es correcto, por seguridad hay que setear un maximo de emails por hora para usuarios anónimos, considero que 75 emails por hora es un buen numero para evitar spam o ataques de denegacion de servicio.  

El apartado de "Betaster" con el combox seleccionado de "Soy usuario nuevo" no permite registrar el feedback si no estas autentificado también debería funcionar con usuarios anónimos. 


CSH-01 Issue: Explorar todo el repositorio en busca de deudas técnicas en cuestión de funcionalidades. 



Sprint 00 - Nuevas funcionalidades



CSH-0 Feature: Agregar un Easter Egg en donde se agregue un juego de naves en 2d inspirado en el juego de galaga en donde vaya del nivel 0 al 10. Tiene que ser un juego sencillo, fácil de entender, con instrucciones y de manera dinámica. 

CSH-01 Feature: Foro en Realtime, en donde la gente pueda chatear, dar opiniones y ser un foro abierto. Nota los usuarios anónimos solo pueden listar el foro (solo lectura) los usuarios autentificados pueden leer, escribir, actualizar y eliminar sus propios comentarios

CSH-02 Feature: Se agregan bandas de diferenciacion de usuarios: Agents para aquellos que colaboran con el hub, Members para los usuarios registrados que participan en el hub y Fellows para aquellos que son tipo sponsor y dan un apoyo ya sea economico o de recursos de cualquier indole. También se agrega el rol de catedratico para aquellos que son profesores o maestros de la facultad de ciencias de la computacion, y estudiante para aquellos que son alumnos de la facultad de ciencias de la computacion. Se agrega una banda especial para aquellos que son fundadores del hub: Creador del Hub = Ceo-Founder, Primera mesa de agents = Primary Agents, Primera mesa de fellows = Primary Fellows. 


CSH-03 Feature: Se agregan nuevas universidades a la base de datos, no solo la Universidad Don Bosco, si no que se agregan las universidades de El Salvador: UCA, ESEN, UES, UFG, UEES, y se agrega un campo para que el usuario pueda seleccionar su universidad al momento de registrarse. 


CSH-04 Feature: Se agrega un sistema de mensajeria interna en tiempo real, en donde los usuarios puedan enviarse mensajes entre si, con notificaciones en tiempo real. 

CSH-05 Feature: Se agrega un sistema de foros por areas de interes, en donde los usuarios puedan ver los foros de las areas de interes y comentar en ellos. Se agrega un sistema de notificaciones en tiempo real para los usuarios que tengan areas de interes en comun. Se agrega un foro general para todos los usuarios en donde puedan chatear, dar opiniones y ser un foro abierto. Nota los usuarios anónimos solo pueden listar el foro (solo lectura) los usuarios autentificados pueden leer, escribir, actualizar y eliminar sus propios comentarios. 



CSH-06 Feature: Se agrega un sistema de post en donde los usuarios puedan crear posts, comentar en ellos, dar like, dislike, compartir, guardar, etc. Los usuarios autentificados pueden crear posts, comentar en ellos, dar like, dislike, compartir, guardar, etc. Los usuarios anónimos solo pueden ver los posts (solo lectura). mayormente orientado a papers y articulos de interes para los estudiantes de la facultad de ciencias de la computacion. Se agrega un sistema de notificaciones en tiempo real para los usuarios que tengan areas de interes en comun. el formato por el momento es markdown y pdfs (considerar ). Se considera que los papers puedan ser guardados en una biblioteca personal de cada usuario, y que se almacenen en supabase storage con formato .md y .pdf, considerar que los pdfs puedan ser visualizados en linea sin necesidad de descargarlos al igual que los .md, pero considerar limitaciones en supabase storage ya que es su version free en cuanto a tamaño y cantidad de archivos, por lo que se debe considerar una alternativa para almacenar los archivos, como por ejemplo un servicio de almacenamiento en la nube como AWS S3, Google Cloud Storage, etc. De preferencia que sea gratuito o de bajo costo, ya que el proyecto es open source y no tiene fines de lucro. 



CSH Chore: Comenzar a considerar un plan para una arquitectura, un flujo de trabajo, un sistema de control de versiones, entornos controlados de supabase, para poder tener un flujo de trabajo mas profesional, y que cumpla con los estandares de la industria de un proyecto desplegado en produccion. 