#!/bin/sh

######################################
# installReactReduxBabelWebpack
# Utilité: ce script sert à installer les composants react, redux, babel et web
# Usage: rendre le script exécutable avec la commande chmod +x
# Auteur: Thanh Chuong NGUYEN <tc.nguyen@live.com>
# Crée le: 12/07/2017
# Mise à jour le: 12/07/2017
######################################

#initie la variable npm contenat les informations sur l'installation
npm="Ce script installe :\n  \n-react \n-react-dom \n-redux \n-react-redux  \n-webpack  \n-babel-loader \n-babel-core \n-babel-preset-es2015 \n-babel-preset-react"

#affiche la variable npm
echo $npm

#demande de confirmation de l'installation des composants
read -p "Voulez vous installer ces composants ? (oui/non)" answer

#condition validant le début de la procédure
if [ $answer != "oui" ]
then
  exit 0
fi

#initie l'outil npm
npm init
#installation de react et react-dom avec sortie sur le fichier de log react
npm install --save react react-dom >> react.log 2>&1
#installation de redux et react-redux avec sortie sur le fichier de log redux
npm install --save redux react-redux >> redux.log 2>&1
#installation de webpack avec sortie sur le fichier de log webpack
npm install --save-dev webpack >> webpack.log 2>&1
#installation de babel-loader et babel-core avec sortie sur le fichier de log webpack
npm install --save-dev babel-loader babel-core >> webpack.log 2>&1
#installation de babel-preset-es2015 et babel-preset-react avec sortie sur le fichier de log webpack
npm install --save-dev babel-preset-es2015 babel-preset-react >> webpack.log 2>&1
#affiche le fichier package.json pour vérification de la prise en charge des modules installés
cat package.json
