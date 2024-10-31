# Microservices Architecture for RowOrder

This repository contains the microservices architecture for the RowOrder application, designed to handle user management, scoring, ratings, favorites, likes, comments, email notifications, and service discovery.

## 🛠️ Services Overview

| Service Name                  | Description                                                             | Icon                   |
|-------------------------------|-------------------------------------------------------------------------|------------------------|
| **User Service**              | Manages user registrations, authentication, and user profiles.          | ![User Icon](https://img.icons8.com/ios/50/000000/user.png)  |
| **Score Service**             | Handles scoring functionalities for user activities.                    | ![Score Icon](https://img.icons8.com/ios/50/000000/trophy.png) |  <!-- Changed icon -->
| **Rating Service**            | Manages ratings given by users for various items.                       | ![Rating Icon](https://img.icons8.com/ios/50/000000/rating.png)|
| **Favorite & Like Service**   | Handles user favorites and likes for items.                             | ![Favorite Icon](https://img.icons8.com/ios/50/000000/like.png)|
| **Comment Service**           | Allows users to comment on items and manage their comments.             | ![Comment Icon](https://img.icons8.com/ios/50/000000/comments.png)|
| **Email Service**             | Sends email notifications and updates to users.                         | ![Email Icon](https://img.icons8.com/ios/50/000000/email.png)  |
| **Discovery Service**         | Handles service registration and discovery using Eureka.                | ![Discovery Icon](https://img.icons8.com/ios/50/000000/services.png) |
| **API Gateway**               | Acts as a single entry point for all services.                          | ![Gateway Icon](https://img.icons8.com/ios/50/000000/api.png) |  <!-- Changed icon -->

## 💻 Technology Stack

- **Java 17**: Programming language used for the development of all services.
- **Spring Boot**: Framework for building microservices.
- **Spring Cloud**: Provides tools for microservices architecture, including service discovery and gateway.
- **MySQL**: Relational database management system for data storage.
- **Lombok**: Reduces boilerplate code in Java.

## 📋 Service Details

    ### 1. User Service (`user-service`)
    
    - **Description**: Manages user registrations, authentication, and user profiles.
    - **Dependencies**:
        - Spring Cloud Netflix Eureka Client
        - Spring Boot Starter Web
        - Spring Boot Starter Data JPA
        - Lombok
        - MySQL Connector
        - JWT support
        - Spring Boot Starter Test
    
    ### 2. Score Service (`score-service`)
    
    - **Description**: Handles scoring functionalities for user activities.
    - **Dependencies**: Similar to User Service.
    
    ### 3. Rating Service (`rating-service`)
    
    - **Description**: Manages ratings given by users for various items.
    - **Dependencies**: Similar to Score Service.
    
    ### 4. Favorite & Like Service (`favoriteAndLike-service`)
    
    - **Description**: Handles user favorites and likes for items.
    - **Dependencies**: Similar to User Service.
    
    ### 5. Comment Service (`comment-service`)
    
    - **Description**: Allows users to comment on items and manage their comments.
    - **Dependencies**:
        - Spring Cloud Netflix Eureka Client
        - Jakarta Persistence API
        - Lombok
        - MySQL Connector
        - Spring Boot Starter Test
        - Spring Boot Starter Web
        - Spring Boot Starter Data JPA
        - MapStruct
    
    ### 6. Email Service (`email-service`)
    
    - **Description**: Sends email notifications and updates to users.
    - **Dependencies**:
        - Spring Cloud Netflix Eureka Client
        - Jakarta Persistence API
        - Lombok
        - MySQL Connector
        - Spring Boot Starter Test
        - Spring Boot Starter Web
        - Spring Boot Starter Data JPA
        - Spring Boot Starter Mail
    
    ### 7. Discovery Service (`discovery`)
    
    - **Description**: Handles service registration and discovery using Eureka.
    - **Dependencies**:
        - Spring Cloud Netflix Eureka Server
    
    ### 8. API Gateway (`gateway`)
    
    - **Description**: Acts as a single entry point for all services.
    - **Dependencies**:
        - Spring Cloud Starter Gateway
        - Spring Cloud Netflix Eureka Client

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/roworder.git
   ```

   2. **Navigate to the desired service directory**:
      ```bash
      cd path/to/service
      ```

   3. **Build the service**:
      ```bash
      mvn clean install
      ```

   4. **Run the service**:
      ```bash
      mvn spring-boot:run
      ```

## 📄 API Documentation
For detailed API documentation, please refer to each service's respective documentation files.

## 🤝 Contributing
We welcome contributions! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
