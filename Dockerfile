FROM openjdk:15

MAINTAINER REM Java 21 1 <test.test@neuefische.de>

ADD backend/target/todo.jar todo.jar

CMD ["sh", "-c", "java -Dserver.port=$PORT -jar /todo.jar"]