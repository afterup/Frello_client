export default {
	props: {
		type: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			required: false,
		},
		maxlength: {
			type: Number,
			required: false,
		},
	},
	methods: {
		updateValue(value) {
			this.$emit('input', value);
		},
	},
};
