pipeline {
  agent any

  environment {
    // 🔧 Your environment
    EC2_HOST        = 'ec2-13-61-171-36.eu-north-1.compute.amazonaws.com'
    EC2_USER        = 'ubuntu'
    REMOTE_WEB_ROOT = '/var/www/arkeeta.in'
    NODEJS_TOOL     = 'node20' // Manage Jenkins → Global Tool Configuration → NodeJS
    DEPLOY_BRANCH   = 'main'   // Change if you deploy from a different branch
  }

  triggers { githubPush() }     // Trigger on GitHub push
  tools { nodejs "${env.NODEJS_TOOL}" }

  options {
    timestamps()
    ansiColor('xterm')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {

    stage('Preparation') {
      steps {
        echo "🔧 [Preparation] Build #${env.BUILD_NUMBER} on ${env.JENKINS_URL ?: 'Jenkins'}"
        script {
          currentBuild.displayName = "#${env.BUILD_NUMBER} — ${env.JOB_NAME}"
        }
        sh '''
          echo "— Workspace: $PWD"
          echo "— Node version:"
          node -v || echo "Node not yet on PATH (will be after tools step)"
          echo "— npm version:"
          npm -v  || echo "npm not yet on PATH (will be after tools step)"
        '''
      }
    }

    stage('Checkout') {
      steps {
        echo "📥 [Checkout] Getting source code via job SCM config…"
        checkout scm
        sh 'git rev-parse --short HEAD | tee GIT_SHA.txt'
        script {
          env.GIT_SHA = readFile('GIT_SHA.txt').trim()
          echo "📌 [Checkout] On commit: ${env.GIT_SHA}"
        }
      }
    }

    stage('Install') {
      steps {
        echo "📦 [Install] Installing dependencies…"
        sh '''
          set -eux
          if [ -f package-lock.json ]; then
            echo "Using npm ci"
            npm ci
          else
            echo "Using npm install"
            npm install
          fi
        '''
      }
    }

    stage('Lint & Test') {
      steps {
        echo "🧪 [Lint & Test] Running lint and tests…"
        sh '''
          set -eux
          npm run lint || true          # make strict later by removing '|| true'
          npm test --if-present
        '''
      }
    }

    stage('Build') {
      steps {
        echo "🏗️  [Build] Building Vite project…"
        sh '''
          set -eux
          npm run build
          test -d dist || { echo "❌ dist/ not found after build"; exit 1; }
          echo "✅ Build output size:"
          du -sh dist || true
        '''
      }
    }

    stage('Package Artifact') {
      steps {
        echo "📦 [Package] Preparing artifact for deploy…"
        sh '''
          set -eux
          rm -rf artifact
          cp -r dist artifact
          find artifact -type f | wc -l | xargs echo "Files in artifact:"
        '''
        stash name: 'web_artifact', includes: 'artifact/**'
        echo "🧰 [Package] Artifact stashed as 'web_artifact'"
      }
    }

    stage('Deploy to EC2') {
      // If your job is multibranch, BRANCH_NAME exists.
      // The condition below deploys only when building DEPLOY_BRANCH.
      when {
        anyOf {
          expression { return env.BRANCH_NAME ? (env.BRANCH_NAME == env.DEPLOY_BRANCH) : true }
        }
      }
      steps {
        echo "🚀 [Deploy] Deploying to ${env.EC2_USER}@${env.EC2_HOST}:${env.REMOTE_WEB_ROOT}"
        sshagent (credentials: ['ec2_ssh']) {
          unstash 'web_artifact'
          sh '''
            set -eux
            echo "Uploading artifact via rsync…"
            rsync -avz --delete artifact/ ${EC2_USER}@${EC2_HOST}:${REMOTE_WEB_ROOT}/

            echo "Reloading Nginx…"
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} 'sudo nginx -t && sudo systemctl reload nginx'

            echo "✅ Deploy complete — visit your site!"
          '''
        }
      }
    }
  }

  post {
    success {
      echo "🎉 Pipeline SUCCESS — Commit ${env.GIT_SHA ?: 'unknown'} deployed (if branch matched)."
    }
    failure {
      echo "💥 Pipeline FAILURE — check stage logs above."
    }
    always {
      echo "⏱️  Finished in ${currentBuild.durationString}"
    }
  }
}
