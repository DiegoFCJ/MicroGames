#2 Raw & Order
Realizzare un’applicazione web che permetta di recuperare 10 film tramite un’API esterna e mostrare le
locandine all’utente in ordine casuale.
L’utente deve ordinare le locandine in base al criterio generato casualmente dal sistema (a titolo di esempio:
ranking, anno di uscita, premi, incassi, …).
Una volta terminato l’ordine, l’utente dovrà confermare la selezione cliccando su un apposito pulsante. Per
ogni film assegnato alla posizione corretta dovranno essere assegnati 10 punti. Per ognuno di quelli
proposti, l’utente potrà scegliere se salvarlo nella lista dei preferiti, e in tal caso dovrà dare un voto al film e
inserire una breve recensione di massimo 160 caratteri. Dalla lista dovrà essere possibile eliminare i film. Ad
ogni utilizzo dovrà essere aggiornata una classifica con i punteggi relativi ad ogni utente in base ai film
indovinati. Tale classifica dovrà essere raggiungibile nell’applicazione stessa.

N.b.:
L’accesso al sistema dovrà avvenire attraverso un servizio di BE Springboot.
L’inserimento della review dovrà essere effettuato con un servizio di BE in .Net.
