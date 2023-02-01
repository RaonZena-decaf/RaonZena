FROM openjdk:11-jdk as builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar"]