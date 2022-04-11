pipeline {
  agent any
  environment {
  	herokuURL = 'none'
   }
  
  
   parameters {
        choice(name: 'DEPLOYENV', choices: ['dev', 'qa', 'staging', 'preview', 'ecc', 'prod'], description: 'Deployment Environment')
    }
  
  stages {
    stage('Prepare for Heroku') {
      steps {
		echo 'Preparing for branch: ' + env.BRANCH_NAME
        script {		
            herokuURL = "git.heroku.com/cantaloupe-frontend-${params.DEPLOYENV}.git"
      	}
      }
    }
    
    stage('Push to Heroku') {
      steps {
        withCredentials(bindings: [usernamePassword(credentialsId: 'heroku-cantaloupe', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
        sh('git push --force https://${GIT_USERNAME}:${GIT_PASSWORD}@' + herokuURL + ' HEAD:refs/heads/master')
        }
      }
    }
  }
}
