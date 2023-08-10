# jwt-bcrypt-auth-express

# APIS CURL COMMANDS

    * create User API

        curl --location --request POST 'localhost:8080/user' \
        --header 'Content-Type: application/json' \
        --data-raw '{

            "name":"test user",
            "email":"test@gmail.com",
            "password":"test1234"
        }'

    * Login API
    
        curl --location --request POST 'localhost:8080/auth/login' \
        --header 'Content-Type: application/json' \
        --data-raw '{

            "email":"test@gmail.com",
            "password":"test1234"
        }'

    * Get user details using JWT token API
        
        curl --location --request GET 'localhost:8080/user' \
        --header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ0ZDZiNTc1MjQ0NWQ3N2M2NjcyYzAiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwibmFtZSI6IlJvaGl0IEphZGhhdiIsInN0YXR1cyI6ImFjdGl2ZSIsImlhdCI6MTY5MTY3MjU4MiwiZXhwIjoxNjkxNzU4OTgyfQ.I2erPScC-fTFkHvhNlL_bClUKVFFx2vIJDWfIxE4k8o'