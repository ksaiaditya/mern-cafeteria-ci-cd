pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Test') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        always {
            sh 'docker compose down'
        }
    }
}