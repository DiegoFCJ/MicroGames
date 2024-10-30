cd /home/diego/Documents/repositoryGitHub/row-and-order/MicroGames/spring/discovery
#mvn clean package
#docker build -t diegofois/microgames:discovery-v1 .
#docker push diegofois/microgames:discovery-v1

#cd ../gateway/
#mvn clean package
#docker build -t diegofois/microgames:gateway-v1 .
#docker push diegofois/microgames:gateway-v1

#cd ../user-service/
#mvn clean package -DskipTests
#docker build -t diegofois/microgames:user-service-v1 .
#docker push diegofois/microgames:user-service-v1
#
#cd ../score-service/
#mvn clean package -DskipTests
#docker build -t diegofois/microgames:score-service-v1 .
#docker push diegofois/microgames:score-service-v1

cd ../email-service/
mvn clean package -DskipTests
docker build -t diegofois/microgames:email-service-v1 .
docker push diegofois/microgames:email-service-v1

#cd ../favourite-service/
#mvn clean package -DskipTests
#
#cd ../comment-service/
#mvn clean package -DskipTests