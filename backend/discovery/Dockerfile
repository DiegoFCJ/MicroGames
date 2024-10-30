# Usa un'immagine base di OpenJDK per eseguire il tuo JAR
FROM openjdk:17-jdk-alpine

# Copia il tuo file JAR compilato nel container
COPY target/discovery.jar .

# Imposta la porta su cui il servizio sarà in ascolto
EXPOSE 8091

# Avvia l'applicazione Spring Boot al lancio del container
CMD ["java", "-jar", "discovery.jar"]