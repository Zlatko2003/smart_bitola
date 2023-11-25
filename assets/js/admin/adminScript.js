const app = {
	data() {
		return {
			parking_reservation: [],
			parkings: [],

			parkingsTable: true,
			parkingReservation: false
		}
	},
	
	methods: {
		showReservation(parking){
			this.parkingsTable = false; 
			this.parkingReservation = true;

			this.parking_reservation = parking.parking_spaces;

			console.log('parking_reservation', this.parking_reservation);
			console.log('parking', JSON.stringify(parking));
		},

		openEditFormParking(parkingId){
			location.href = '/admin/parking/'+parkingId;
		},

		deleteParking(parkingId){
			axios.post('/admin/delete-parking/'+parkingId).then(response => {
	            this.parkings = response.data.parkings;
	        })
		}
	},

	mounted(){
		axios.get('/getData').then(response => {
            this.parkings = response.data.parkings;
        })
	}

};

const mainApp = Vue.createApp(app).mount('#app');