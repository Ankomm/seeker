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

			this.games = response.data
			console.log('DONE')
		})
		.catch(e => {

			this.errors.push(e)
		})
	}
})


var index = new Vue({

	el: "#index"
})

//gb api key : d8eef8de9cfaf3a7abededf46fe26204a9413a77