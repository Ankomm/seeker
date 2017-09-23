var config = {
	apiKey: "AIzaSyCcm4wBAzsk42yRmL6fDKI6E-B4293T0zQ",
	authDomain: "seeker-57aac.firebaseapp.com",
	databaseURL: "https://seeker-57aac.firebaseio.com",
	projectId: "seeker-57aac",
	storageBucket: "",
	messagingSenderId: "900631916112"
}

var firebaseApp = firebase.initializeApp(config)

var db = firebaseApp.database()

Vue.component('emails', {

	template: '<div><p v-for="myData in myDatas">{{ myData.email }}</p></div>',
	firebase: function() {

		return {

			myDatas: db.ref('users')
		}
	}
});

Vue.component('gamesoptions', {

	template: '<select><option v-for="game in games">{{ game.name }}</option></select>',
	data: () => ({

		games: [],
		errors: [],
	}),
	created() {

		axios.get('http://localhost:8080/')
		.then(response => {

			console.log(response.data)

			try {

				this.games = JSON.parse(response.data)

			}catch(e) {

				console.log(e);
			}
			// console.log(JSON.parse(response.data))
			
			console.log('DONE')
		})
		.catch(e => {

			this.errors.push(e)
		})
	}
})

Vue.component('loginform', {


	template: '<form><input type="text" ref="connexion_pseudo" /><input type="text" ref="connexion_password" /><button v-on:click="getConnexionData()">CONNEXION</button></form><p>{{ connPseudo }}</p><p>{{ connPassword }}</p>',
	data: () => ({

		connPseudo: '',
		connPassword: ''
	}),
	methods: {

		getConnexionData() {

			this.connPseudo = this.$refs.connexion_pseudo
			this.connPassword = this.$refs.connexion_password
		}
	}
})


var index = new Vue({

	el: "#index",
	data: {

		connPseudo: '',
		connPassword: ''
	},
	methods: {

		getConnexionData() {

			this.connPseudo = this.$refs.connexion_pseudo
			this.connPassword = this.$refs.connexion_password
		}
	}
})

//gb api key : d8eef8de9cfaf3a7abededf46fe26204a9413a77