const app = {
	data() {
		return {
			parkings: [],
			parks: [],

			parking_modal: [],
			parking_reservation: [],

			number_of_parkings: 0,
			number_of_parks: 0,

			firstPage: true,
			creditCardForm: false,
			cashCheckout: false,
			requiredMsg: false,
			paymentInfo: false
		}
	},
	
	methods: {
		checkService(parkObject, type) {
			if (Array.isArray(parkObject.smart_solutions)) {
				let parkSolution = parkObject.smart_solutions.some((solution) => solution === type);
				return parkSolution ? { background: '#00800085' } : { background: '#ff000085' };
			}
			return { background: '#ff000085' };
		},

		checkServiceText(parkObject, type) {
			if (Array.isArray(parkObject.smart_solutions)) {
				let parkSolution = parkObject.smart_solutions.some((solution) => solution === type);
				return parkSolution ? "Има" : "Нема";
			}
			return "Нема";
		},

		checkFreeSpaces(parking){
			if(Array.isArray(parking.parking_spaces)){
				let parkingSpace = parking.parking_spaces.some((parkingSpace) => parkingSpace.holder === "Празно")
				return parkingSpace ? { background: '#00800085' } : { background: '#ff000085' };
			}
		},

		checkFreeSpacesText(parking){
			if(Array.isArray(parking.parking_spaces)){
				let parkingSpace = parking.parking_spaces.some((parkingSpace) => parkingSpace.holder === "Празно")
				return parkingSpace ? 'Има слободни места' : 'Нема слободни места';
			}
		},

		checkFreeSpacesButton(parking){
			if(Array.isArray(parking.parking_spaces)){
				let parkingSpace = parking.parking_spaces.some((parkingSpace) => parkingSpace.holder === "Празно")
				return parkingSpace ? false : true;
			}
		},

		openReservationModal(parking){
			this.parking_modal = parking;
			document.getElementById("parkingReservation").style.display = "block";
		},

		closeReservationModal(){
			this.parking_modal = [];
			this.parking_reservation = [];
			this.firstPage = true;
			this.creditCardForm = false;
			this.cashCheckout = false;
			this.successMessage = false;
			this.paymentInfo = false;
			document.getElementById("parkingReservation").style.display = "none";
		},

		calculateHoursDifference() {
			if(this.parking_reservation.from && this.parking_reservation.to){
				const fromTime = new Date(`2000-01-01T${this.parking_reservation.from}:00Z`);
				const toTime = new Date(`2000-01-01T${this.parking_reservation.to}:00Z`);

				const differenceHours = Math.abs(toTime - fromTime) / 36e5; 
				const differenceMinutes = Math.abs(toTime - fromTime) / 60000; 

				this.parking_reservation.time = Math.trunc(differenceHours);
				this.parking_reservation.price = Math.trunc(differenceHours*parseInt(this.parking_modal.price));

				document.getElementById("priceBox").style.display = "flex";
			}
		},

		openNav(){
			document.getElementById("mobileNavbar").style.display = "block";
		},

		closeNav(){
			document.getElementById("mobileNavbar").style.display = "none";
		},

		nextStep(){
			if(this.parking_reservation.name && this.parking_reservation.lastname && this.parking_reservation.email && this.parking_reservation.date && this.parking_reservation.from && this.parking_reservation.to){
				this.firstPage = false; 
				this.creditCardForm = true;
			} else {
				this.requiredMsg = true;
				setTimeout(function() { this.requiredMsg = false; }, 3000);
			}
		},

		submitReservation(){
			let numberOfOrder = Math.floor(100000 + Math.random() * 900000);
			let finishAtDate =  this.parking_reservation.date + " " + this.parking_reservation.to;
			axios.post('/submitReservation', { id: this.parking_reservation.id, holder: this.parking_reservation.license_plate, finishAt: finishAtDate, orderNumber: numberOfOrder }).then(response => {
				if(response.data.message == "Success"){
					this.creditCardForm = false;
					this.cashCheckout = false;
					this.successMessage = false;
					this.paymentInfo = true;
					this.paymentMessageText = "Плаќањето е успешно, вашето резервирано паркинг место е со број: "+response.data.parkingNumber;
				} else {
					this.creditCardForm = false;
					this.cashCheckout = false;
					this.successMessage = false;
					this.paymentInfo = true;
					this.paymentMessageText = "Плаќањето е неуспешно, обидете се повторно и проверете ја вашата сметка."
				}
			})
		}
	},

	mounted(){
		axios.get('/getData').then(response => {
            this.parkings = response.data.parkings;
            this.parks = response.data.parks;

            this.number_of_parkings = this.parkings.length;
            this.number_of_parks = this.parks.length;
        })
	}

};

const mainApp = Vue.createApp(app).mount('#app');