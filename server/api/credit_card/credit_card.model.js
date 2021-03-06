'use strict';

import mongoose from 'mongoose';

var CreditCardSchema = new mongoose.Schema({
	credit_card_uuid: String,
	image_url: String,
	descriptions: {                
		name: String,
		eligibility: Array,
		annualFee: String,
		additionalInfo: Array,
		islamicName: String,
		creditCard: 
		{ rewardsDescription: String,
			interestRate: String,
			minSalary: String,
			cashBack: String,
			miles: String
		},
		reward: Boolean,
		benefits: String,
		typeSpecificData: 
		{ rewardsDescription: String,
			interestRate: String,
			minSalary: String,
			cashBack: String,
			miles: String
		},
	}

});

export default mongoose.model('CreditCard', CreditCardSchema);
