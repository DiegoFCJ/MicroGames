# Usa un'immagine base di OpenJDK per eseguire il tuo JAR
FROM openjdk:17-jdk-alpine

# Copia il tuo file JAR compilato nel container
COPY target/user-service.jar .

# Imposta la porta su cui il servizio sarà in ascolto
EXPOSE 8092

# Avvia l'applicazione Spring Boot al lancio del container
CMD ["java", "-jar", "user-service.jar"]
