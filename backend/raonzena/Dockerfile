FROM openjdk:11-jdk

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

WORKDIR /build/libs

# COPY ./build/libs/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java","-jar","raonzena-0.0.1-SNAPSHOT.jar"]
