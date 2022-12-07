FROM maven:3.6.3-openjdk-11 AS build
COPY src /home/app/src
COPY pom.xml /home/app
COPY .m2 /root/.m2
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:11-jdk
COPY --from=build /home/app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
