export default {
	props: {
		value: {
			required: true,
		},
		type: {
			type: String,
			required: false,
		},
		placeholder: {
			type: [String, Object],
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
